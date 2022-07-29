/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { Button, Dropdown, Label, TextInput } from '@trussworks/react-uswds'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { getEnvOrDieInProduction } from '~/lib/env'
import { ClientCredentialVendingMachine } from '~/routes/user/client_credentials.server'

export async function loader({ request }: DataFunctionArgs) {
  const machine = await ClientCredentialVendingMachine.create(request)
  const client_credentials = await machine.getClientCredentials()
  const groups = machine.groups
  const recaptchaSiteKey = getEnvOrDieInProduction('RECAPTCHA_SITE_KEY')
  return { client_credentials, recaptchaSiteKey, groups }
}

export function getFormDataString(formData: FormData, key: string) {
  const value = formData.get(key)
  if (typeof value === 'string') {
    return value
  } else if (value === null) {
    return undefined
  } else {
    throw new Response(`expected ${key} to be a string`, { status: 400 })
  }
}

export async function verifyRecaptcha(response?: string) {
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

export async function handleCredentialActions(
  request: Request,
  redirectSource: string
) {
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
      let redirectTarget = ''
      if (redirectSource == 'quickstart') {
        redirectTarget = `/quickstart/alerts?clientId=${encodeURIComponent(
          client_id
        )}`
      } else if (redirectSource == 'user') {
        redirectTarget = '/user/credentials'
      }

      return redirect(redirectTarget)

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
