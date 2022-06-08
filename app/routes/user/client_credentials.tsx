/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { useRef } from 'react'
import type { ModalRef } from '@trussworks/react-uswds'
import {
  Alert,
  Button,
  Dropdown,
  IconDelete,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalToggleButton,
  Table,
  TextInput,
} from '@trussworks/react-uswds'
import type { DataFunctionArgs, MetaFunction } from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from '@remix-run/react'
import { CopyableCode } from '~/components/CopyableCode'
import { ClientCredentialVendingMachine } from './client_credentials.server'
import moment from 'moment'

export const meta: MetaFunction = () => ({
  title: 'GCN - Client Credentials',
})

export async function loader({ request }: DataFunctionArgs) {
  const machine = await ClientCredentialVendingMachine.create(request)
  const client_credentials = await machine.getClientCredentials()
  const groups = machine.groups
  return { client_credentials, groups }
}

export async function action({ request }: DataFunctionArgs) {
  const [formData, machine] = await Promise.all([
    request.formData(),
    ClientCredentialVendingMachine.create(request),
  ])
  if (formData.get('intent') === 'delete') {
    await machine.deleteClientCredential(formData.get('client_id') as string)
    return null
  } else if (formData.get('intent') === 'create') {
    return await machine.createClientCredential(
      formData.get('name') as string | undefined,
      formData.get('scope') as string | undefined
    )
  }
}

interface ClientCredentialProps {
  name: string
  scope: string
  created?: number
  client_id?: string
  client_secret?: string
}

function ClientCredential(props: ClientCredentialProps) {
  const modalRef = useRef<ModalRef>(null)
  const momentCreated = props.created && moment.utc(props.created)

  return (
    <tr>
      <td>{props.name}</td>
      {momentCreated ? (
        <td title={momentCreated.format()}>{momentCreated.fromNow()}</td>
      ) : (
        <td>loading</td>
      )}
      <td>{props.scope}</td>
      <td>
        {props.client_id ? (
          <CopyableCode text={props.client_id} />
        ) : (
          <>loading</>
        )}
      </td>
      <td>
        {props.client_secret ? (
          <CopyableCode text={props.client_secret} />
        ) : (
          <span className="text-base">(not shown)</span>
        )}
      </td>
      <td>
        {props.client_id && (
          <>
            <ModalToggleButton
              type="button"
              unstyled
              title="Delete this client credential"
              modalRef={modalRef}
              opener
            >
              <big>
                <IconDelete />
              </big>
            </ModalToggleButton>

            <Modal
              id="modal-delete"
              ref={modalRef}
              aria-labelledby="modal-delete-heading"
              aria-describedby="modal-delete-description"
              renderToPortal={false} // FIXME: https://github.com/trussworks/react-uswds/pull/1890#issuecomment-1023730448
            >
              <Form method="post">
                <input type="hidden" name="intent" value="delete" />
                <input type="hidden" name="client_id" value={props.client_id} />
                <ModalHeading id="modal-delete-heading">
                  Delete Client Credential
                </ModalHeading>
                <div className="usa-prose">
                  <p id="modal-delete-description">
                    Are you sure that you want to delete the client credential
                    named “{props.name}” with client ID{' '}
                    <code>{props.client_id}</code>?
                  </p>
                  <p>This action cannot be undone.</p>
                </div>
                <ModalFooter>
                  <Button data-close-modal type="submit">
                    Delete
                  </Button>
                  <ModalToggleButton modalRef={modalRef} closer outline>
                    Cancel
                  </ModalToggleButton>
                </ModalFooter>
              </Form>
            </Modal>
          </>
        )}
      </td>
    </tr>
  )
}

export default function Index() {
  const modalRef = useRef<ModalRef>(null)
  const { client_credentials, groups } =
    useLoaderData<Awaited<ReturnType<typeof loader>>>()
  client_credentials.sort((a, b) => a.created - b.created)
  const new_client_credential =
    useActionData<Awaited<ReturnType<typeof action>>>()
  const transition = useTransition()

  // Get form submission for pending UI
  const formData = transition.submission?.formData
  const pending_client_credential = transition.type === 'actionSubmission' &&
    formData?.get('intent') === 'create' && {
      name: formData.get('name') as string,
      scope: formData.get('scope') as string,
    }
  const pending_deleted_client_id =
    formData?.get('intent') === 'delete' &&
    (formData.get('client_id') as string)

  let items: ClientCredentialProps[] = client_credentials.filter(
    (item) =>
      item.client_id !== new_client_credential?.client_id &&
      item.client_id !== pending_deleted_client_id
  )
  if (
    new_client_credential &&
    new_client_credential.client_id !== pending_deleted_client_id
  ) {
    items.push(new_client_credential)
  }

  if (pending_client_credential) {
    items.push(pending_client_credential)
  }

  return (
    <>
      <h1>Client Credentials</h1>
      <div className="usa-prose">
        <p>
          A Client Credential is a randomly generated Client ID and Client
          Secret that you can use in script to connect to the GCN Kafka broker.
        </p>
      </div>
      <p>
        <ModalToggleButton modalRef={modalRef} opener>
          Create new client credential
        </ModalToggleButton>
      </p>
      {items.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Created</th>
              <th>Scope</th>
              <th>Client ID</th>
              <th>Client Secret</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ClientCredential {...item} key={item.client_id} />
            ))}
          </tbody>
        </Table>
      ) : null}

      <Modal
        id="modal-new"
        ref={modalRef}
        aria-labelledby="modal-new-heading"
        aria-describedby="modal-new-description"
        renderToPortal={false} // FIXME: https://github.com/trussworks/react-uswds/pull/1890#issuecomment-1023730448
      >
        <Form method="post">
          <input type="hidden" name="intent" value="create" />
          <ModalHeading id="modal-new-heading">
            Create New Client Credential
          </ModalHeading>
          <div className="usa-prose">
            <p id="modal-new-description">
              Choose a name for your new client credential.
            </p>
            <p className="text-base">
              The name should help you remember what you use the client
              credential for, or where you use it. Examples: “My Laptop”, “Lab
              Desktop”, “GRB Pipeline”.
            </p>
          </div>
          <Label htmlFor="name">Name</Label>
          <TextInput
            data-focus
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            defaultValue=""
          />
          <Label htmlFor="scope">Scope</Label>
          <Dropdown
            id="scope"
            name="scope"
            defaultValue="gcn.nasa.gov/kafka-public-consumer"
          >
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </Dropdown>
          <ModalFooter>
            <Button data-close-modal type="submit">
              Create
            </Button>
            <ModalToggleButton modalRef={modalRef} closer outline>
              Cancel
            </ModalToggleButton>
          </ModalFooter>
        </Form>
      </Modal>

      {items.some((item) => item.client_secret) ? (
        <Alert type="success" heading="Your new client credential was created.">
          Make sure that you copy the client secret. It will only be shown once.
        </Alert>
      ) : null}
    </>
  )
}
