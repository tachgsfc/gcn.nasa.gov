import { Link } from '@remix-run/react'
import { Button, ButtonGroup, Grid, Icon } from '@trussworks/react-uswds'
import moment from 'moment'
import SegmentedCards from '~/components/SegmentedCards'

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
        <div className="grid-col flew-fill ">
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
            <div className="grid-col flex-fill">
              <div className="segmented-card-headline">
                <h3 className="usa-card__heading margin-right-1">
                  {alert.name}
                </h3>
                <p>
                  <small className="text-base-light">
                    Created {moment.utc(alert.createdOn).fromNow()}
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
            <div className="grid-col flex-auto">
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
