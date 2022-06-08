/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { useState, useRef } from 'react'
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
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { CopyableCode } from '~/components/CopyableCode'
import { ClientCredentialVendingMachine } from './client_credentials.server'
import moment from 'moment'

export const loader: LoaderFunction = async function ({ request }) {
  const machine = await ClientCredentialVendingMachine.create(request)
  const client_credentials = await machine.getClientCredentials()
  const groups = machine.groups
  return { client_credentials, groups }
}

export const meta: MetaFunction = () => ({
  title: 'GCN - Client Credentials',
})

interface ClientCredentialData {
  name: string
  created: number
  client_id: string
  client_secret?: string
  scope: string
}

interface LoaderData {
  client_credentials: ClientCredentialData[]
  groups: string[]
}

interface ClientCredentialProps extends ClientCredentialData {
  onDelete?: (client_id: string) => void
}

function ClientCredential(props: ClientCredentialProps) {
  const modalRef = useRef<ModalRef>(null)

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    modalRef?.current?.toggleModal(e, false)
    if (props.onDelete !== undefined) {
      props.onDelete(props.client_id)
    }
  }

  const momentCreated = moment.utc(props.created)

  return (
    <tr>
      <td>{props.name}</td>
      <td title={momentCreated.format()}>{momentCreated.fromNow()}</td>
      <td>{props.scope}</td>
      <td>
        <CopyableCode text={props.client_id} />
      </td>
      <td>
        {props.client_secret ? (
          <CopyableCode text={props.client_secret} />
        ) : (
          <span className="text-base">(not shown)</span>
        )}
      </td>
      <td>
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
          <ModalHeading id="modal-delete-heading">
            Delete Client Credential
          </ModalHeading>
          <div className="usa-prose">
            <p id="modal-delete-description">
              Are you sure that you want to delete the client credential named “
              {props.name}” with client ID <code>{props.client_id}</code>?
            </p>
            <p>This action cannot be undone.</p>
          </div>
          <ModalFooter>
            <Button data-close-modal type="button" onClick={handleDelete}>
              Delete
            </Button>
            <ModalToggleButton modalRef={modalRef} closer outline>
              Cancel
            </ModalToggleButton>
          </ModalFooter>
        </Modal>
      </td>
    </tr>
  )
}

export default function Index() {
  const modalRef = useRef<ModalRef>(null)
  const { client_credentials, groups } = useLoaderData() as LoaderData
  const [items, setItems] = useState(client_credentials)
  const defaultName = ''
  const [name, setName] = useState(defaultName)
  const defaultScope = 'gcn.nasa.gov/kafka-public-consumer'
  const [scope, setScope] = useState(defaultScope)
  client_credentials.sort((a, b) => a.created - b.created)

  function handleDelete(client_id: string) {
    fetch(`/api/client_credentials/${client_id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => {
      if (result.ok) {
        setItems(items.filter((item) => item.client_id != client_id))
      } else {
        console.log(result)
      }
    })
  }

  const handleCreate: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    modalRef?.current?.toggleModal(e, false)

    fetch('/api/client_credentials', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, scope }),
    })
      .then((result) => result.json())
      .then((item) => setItems([...items, item]))
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
              <ClientCredential
                {...item}
                key={item.client_id}
                onDelete={handleDelete}
              />
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
        <ModalHeading id="modal-new-heading">
          Create New Client Credential
        </ModalHeading>
        <div className="usa-prose">
          <p id="modal-new-description">
            Choose a name for your new client credential.
          </p>
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
          defaultValue={defaultName}
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="scope">Scope</Label>
        <Dropdown
          id="scope"
          name="scope"
          defaultValue={defaultScope}
          onChange={(e) => setScope(e.target.value)}
          onBlur={(e) => setScope(e.target.value)}
        >
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </Dropdown>
        <ModalFooter>
          <Button data-close-modal type="button" onClick={handleCreate}>
            Create
          </Button>
          <ModalToggleButton modalRef={modalRef} closer outline>
            Cancel
          </ModalToggleButton>
        </ModalFooter>
      </Modal>

      {items.some((item) => item.client_secret) ? (
        <Alert type="success" heading="Your new client credential was created.">
          Make sure that you copy the client secret. It will only be shown once.
        </Alert>
      ) : null}
    </>
  )
}
