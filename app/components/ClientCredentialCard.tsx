/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import {
  Button,
  Card,
  Grid,
  Icon,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalToggleButton,
} from '@trussworks/react-uswds'
import type { ModalRef } from '@trussworks/react-uswds'
import moment from 'moment'
import { useRef } from 'react'
import type { CSSProperties } from 'react'

export interface ClientCredentialData {
  name: string
  created: number
  client_id: string
  client_secret?: string
  scope: string
  className?: string
  listStyles?: CSSProperties | undefined
}

interface ClientCredentialProps extends ClientCredentialData {
  onDelete?: (client_id: string) => void
}

export default function ClientCredential(props: ClientCredentialProps) {
  const modalRef = useRef<ModalRef>(null)

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    modalRef?.current?.toggleModal(e, false)
    if (props.onDelete !== undefined) {
      props.onDelete(props.client_id)
    }
  }
  const momentCreated = moment.utc(props.created)

  return (
    <Card
      key={props.client_id}
      headerFirst
      style={{ ...props.listStyles, listStyle: 'none' }}
      containerProps={{ className: props.className }}
    >
      <Grid row>
        <Grid col={1} className="grid-col-auto client-cred-card-centered">
          <div className="client-cred-card-centered">
            <Icon.Security color="#00a91c" size={5} />
          </div>
        </Grid>
        <Grid col={10}>
          <div className="segmented-card-headline">
            <h3 className="usa-card__heading margin-right-1">{props.name}</h3>
            <p>
              <small className="text-base-light">
                Created {momentCreated.fromNow()}
              </small>
            </p>
          </div>
          <p style={{ wordBreak: 'break-all' }} className="margin-0">
            Client Id: <code>{props.client_id}</code>
          </p>
        </Grid>
        <Grid
          className="grid-col-auto"
          col={1}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ModalToggleButton
            type="button"
            className="text-secondary"
            unstyled
            title="Delete this client credential"
            modalRef={modalRef}
            opener
          >
            <big>
              <Icon.Delete />
            </big>
          </ModalToggleButton>
        </Grid>
      </Grid>
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
    </Card>
  )
}
