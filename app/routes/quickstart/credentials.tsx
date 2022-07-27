/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { ModalRef } from '@trussworks/react-uswds'
import {
  Button,
  Dropdown,
  Grid,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalToggleButton,
  TextInput,
} from '@trussworks/react-uswds'
import { Form, Link, useFetcher, useLoaderData } from '@remix-run/react'
import type { RedactedClientCredential } from '../user/client_credentials.server'
import { ClientCredentialVendingMachine } from '../user/client_credentials.server'
import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import moment from 'moment'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { getEnvOrDieInProduction } from '~/lib/env'
import SegmentedCards from '~/components/SegmentedCards'

export async function loader({ request }: DataFunctionArgs) {
  const machine = await ClientCredentialVendingMachine.create(request)
  const client_credentials = await machine.getClientCredentials()
  const groups = machine.groups
  const recaptchaSiteKey = getEnvOrDieInProduction('RECAPTCHA_SITE_KEY')
  return { client_credentials, recaptchaSiteKey, groups }
}

async function verifyRecaptcha(response?: string) {
  const secret = getEnvOrDieInProduction('RECAPTCHA_SITE_SECRET')
  if (!secret) return

  const params = new URLSearchParams()
  if (response) {
    params.set('response', response)
  }
  params.set('secret', secret)
  const verifyResponse = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    { method: 'POST', body: params }
  )
  const { success } = await verifyResponse.json()
  if (!success) throw new Response('ReCAPTCHA was invalid', { status: 400 })
}

function getFormDataString(formData: FormData, key: string) {
  const value = formData.get(key)
  if (typeof value === 'string') {
    return value
  } else if (value === null) {
    return undefined
  } else {
    throw new Response(`expected ${key} to be a string`, { status: 400 })
  }
}

export async function action({ request }: DataFunctionArgs) {
  const [data, machine] = await Promise.all([
    request.formData(),
    ClientCredentialVendingMachine.create(request),
  ])

  switch (getFormDataString(data, 'intent')) {
    case 'create':
      const name = getFormDataString(data, 'name')
      const scope = getFormDataString(data, 'scope')
      const recaptchaResponse = getFormDataString(data, 'g-recaptcha-response')
      await verifyRecaptcha(recaptchaResponse)
      const { client_id } = await machine.createClientCredential(name, scope)
      return redirect(
        `/quickstart/alerts?clientId=${encodeURIComponent(client_id)}`
      )

    case 'delete':
      const clientId = getFormDataString(data, 'clientId')
      if (!clientId) {
        throw new Response('clientId not present', { status: 400 })
      }
      await machine.deleteClientCredential(clientId)
      return null

    default:
      throw new Response('unknown intent', { status: 400 })
  }
}

export function NewCredentialForm() {
  const { groups, recaptchaSiteKey } = useLoaderData<typeof loader>()
  const [recaptchaValid, setRecaptchaValid] = useState(!recaptchaSiteKey)
  const [nameValid, setNameValid] = useState(false)

  return (
    <Form method="post">
      <input type="hidden" name="intent" value="create" />
      <div className="usa-prose">
        <p>Choose a name for your new client credential.</p>
        <p className="text-base">
          The name should help you remember what you use the client credential
          for, or where you use it. Examples: “My Laptop”, “Lab Desktop”, “GRB
          Pipeline”.
        </p>
      </div>
      <Label htmlFor="name">Name</Label>
      <TextInput
        data-focus
        name="name"
        id="name"
        type="text"
        placeholder="Name"
        onChange={(e) => setNameValid(!!e.target.value)}
      />
      <Label htmlFor="scope">Scope</Label>
      <Dropdown
        id="scope"
        name="scope"
        defaultValue="gcn.nasa.gov/kafka-public-consumer"
      >
        {groups.map((group) => (
          <option value={group} key={group}>
            {group}
          </option>
        ))}
      </Dropdown>
      <p>
        {recaptchaSiteKey ? (
          <ReCAPTCHA
            sitekey={recaptchaSiteKey}
            onChange={(value) => {
              setRecaptchaValid(!!value)
            }}
          />
        ) : (
          <div className="usa-prose">
            <p className="text-base">
              You are working in a development environment, the ReCaptcha is
              currently hidden
            </p>
          </div>
        )}
      </p>
      <Link to=".." type="button" className="usa-button usa-button--outline">
        Back
      </Link>
      <Button disabled={!(nameValid && recaptchaValid)} type="submit">
        Create New Credentials
      </Button>
    </Form>
  )
}

function Credential({ name, client_id, created }: RedactedClientCredential) {
  const ref = useRef<ModalRef>(null)
  const fetcher = useFetcher()
  const disabled = fetcher.state !== 'idle'
  return (
    <>
      <Grid row style={disabled ? { opacity: '50%' } : undefined}>
        <div className="grid-col flex-fill">
          <div>
            <strong>{name}</strong>{' '}
            <small className="text-base">
              (created {moment.utc(created).fromNow()})
            </small>
          </div>
          <div>
            <small>
              client ID: <code>{client_id}</code>
            </small>
          </div>
        </div>
        <div className="grid-col flex-auto">
          <ModalToggleButton
            opener
            disabled={disabled}
            modalRef={ref}
            type="button"
            className="usa-button--secondary"
          >
            Delete
          </ModalToggleButton>
          <Form method="get" action="../alerts" className="display-inline">
            <input type="hidden" name="clientId" value={client_id} />
            <Button disabled={disabled} type="submit">
              Select
            </Button>
          </Form>
        </div>
      </Grid>
      <Modal
        id="modal-delete"
        ref={ref}
        aria-labelledby="modal-delete-heading"
        aria-describedby="modal-delete-description"
        renderToPortal={false} // FIXME: https://github.com/trussworks/react-uswds/pull/1890#issuecomment-1023730448
      >
        <fetcher.Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="clientId" value={client_id} />
          <ModalHeading id="modal-delete-heading">
            Delete Client Credential
          </ModalHeading>
          <div className="usa-prose">
            <p id="modal-delete-description">
              Are you sure that you want to delete the client credential named “
              {name}” with client ID <code>{client_id}</code>?
            </p>
            <p>This action cannot be undone.</p>
          </div>
          <ModalFooter>
            <ModalToggleButton modalRef={ref} closer outline>
              Cancel
            </ModalToggleButton>
            <Button data-close-modal type="submit">
              Delete
            </Button>
          </ModalFooter>
        </fetcher.Form>
      </Modal>
    </>
  )
}

export default function Credentials() {
  const { client_credentials } = useLoaderData<typeof loader>()

  const explanation = (
    <>
      Client credentials allow your scripts to interact with GCN on your behalf.
    </>
  )

  return (
    <>
      {client_credentials.length > 0 ? (
        <>
          <p>
            {explanation} Select one of your existing client credentials, or
            create a new one.
          </p>
          <SegmentedCards>
            {client_credentials.map((credential) => (
              <Credential key={credential.client_id} {...credential} />
            ))}
          </SegmentedCards>
          <div className="padding-2" key="new">
            <strong>New client credentials....</strong>
            <NewCredentialForm />
          </div>
        </>
      ) : (
        <>
          <p>{explanation}</p>
          <NewCredentialForm />
        </>
      )}
    </>
  )
}
