/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { Link } from '@remix-run/react'
import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  Tooltip,
} from '@trussworks/react-uswds'
import SegmentedCards from '~/components/SegmentedCards'
import TimeAgo from '~/components/TimeAgo'

function sendTestEmail(id: number): void {
  console.log(id)
}

export default function Index() {
  const data = [
    {
      id: 1,
      name: 'Test Name',
      createdOn: Date.now(),
      recipient: 'dakota.d@live.com',
      noticeFormat: 'text',
      noticeTypes: ['test', 'test', 'test'],
      active: true,
    },
    {
      id: 2,
      name: 'Test Name',
      createdOn: Date.now(),
      recipient: 'dakota.d@live.com',
      noticeFormat: 'text',
      noticeTypes: ['test', 'test', 'test'],
      active: true,
    },
    {
      id: 3,
      name: 'Test Name',
      createdOn: Date.now(),
      recipient: 'dakota.d@live.com',
      noticeFormat: 'text',
      noticeTypes: ['test', 'test', 'test'],
      active: false,
    },
  ]
  return (
    <>
      <Grid row className="margin-bottom-2">
        <div className="grid-col flex-fill ">
          <h3 className="bottom-aligned">Existing Notices</h3>
        </div>
        <div className="grid-col flex-auto">
          <Link className="usa-button" to="edit">
            <Icon.Add className="bottom-aligned margin-right-05" />
            Add
          </Link>
        </div>
      </Grid>
      <SegmentedCards>
        {data.map((alert) => (
          <Grid key={alert.id} row>
            <div className="tablet:grid-col flex-fill">
              <div className="segmented-card-headline">
                <h3 className="usa-card__heading margin-right-1">
                  {alert.name}
                </h3>
                <p>
                  <small className="text-base-light">
                    Created <TimeAgo time={alert.createdOn}></TimeAgo>
                    {alert.active ? (
                      <Tooltip
                        position="top"
                        label="Active"
                        className="usa-button--unstyled"
                      >
                        <Icon.CheckCircleOutline className="text-green" />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        position="top"
                        label="Inactive"
                        className="usa-button--unstyled"
                      >
                        <Icon.DoNotDisturb className="text-base" />
                      </Tooltip>
                    )}
                  </small>
                </p>
              </div>
              <div className="display-flex">
                <small>Recipient: {alert.recipient}</small>
              </div>
              <div className="display-flex">
                <small>Notice Format: {alert.noticeFormat}</small>
              </div>
              <div className="display-flex">
                <small>Notice Types: {alert.noticeTypes.join(', ')}</small>
              </div>
            </div>
            <div className="tablet:grid-col flex-auto">
              <ButtonGroup>
                <Button
                  type="button"
                  onClick={() => sendTestEmail(alert.id)}
                  outline
                >
                  <Icon.MailOutline className="bottom-aligned margin-right-05" />
                  Test Message
                </Button>
                <Link
                  to={`edit?id=${alert.id}`}
                  className="usa-button usa-button--outline"
                >
                  <Icon.Edit className="bottom-aligned margin-right-05" />
                  Edit
                </Link>
                <Button type="button" secondary>
                  <Icon.Delete className="bottom-aligned margin-right-05" />
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          </Grid>
        ))}
      </SegmentedCards>
    </>
  )
}
