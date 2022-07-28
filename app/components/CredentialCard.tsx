/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { useFetcher, Form } from '@remix-run/react'
import type { ModalRef } from '@trussworks/react-uswds'
import { Icon } from '@trussworks/react-uswds'
import {
  Grid,
  ModalToggleButton,
  Button,
  Modal,
  ModalHeading,
  ModalFooter,
} from '@trussworks/react-uswds'
import moment from 'moment'
import { useRef } from 'react'
import type { RedactedClientCredential } from '~/routes/user/client_credentials.server'

export default function CredentialCard({
  name,
  client_id,
  created,
  selectable,
}: RedactedClientCredential & { selectable?: boolean }) {
  const ref = useRef<ModalRef>(null)
  const fetcher = useFetcher()
  const disabled = fetcher.state !== 'idle'
  return (
    <>
      <Grid row style={disabled ? { opacity: '50%' } : undefined}>
        <div className="tablet:grid-col flex-fill">
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
        <div className="tablet:grid-col flex-auto">
          <ModalToggleButton
            opener
            disabled={disabled}
            modalRef={ref}
            type="button"
            className="usa-button--secondary"
          >
            <Icon.Delete className="bottom-aligned margin-right-05" />
            Delete
          </ModalToggleButton>
          <Form method="get" action="../alerts" className="display-inline">
            <input type="hidden" name="clientId" value={client_id} />
            {selectable ? (
              <Button disabled={disabled} type="submit">
                Select
              </Button>
            ) : null}
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
