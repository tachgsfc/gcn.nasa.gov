import { Link } from '@remix-run/react'
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds'
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
      <Grid row>
        <div className="grid-col flew-fill ">
          <h3 className="bottom-aligned">Existing Notices</h3>
        </div>
        <div className="grid-col flex-auto">
          <Link className="bottom-aligned" to="edit">
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
                    Created {alert.createdOn}
                  </small>
                </p>
              </div>
              <div>
                <small>Recipient: {alert.recipient}</small>
              </div>
              <div>
                <small>Notice Format: {alert.noticeFormat}</small>
              </div>
              <div>
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
                  Test Message
                </Button>
                <Link
                  to={`edit?id=${alert.id}`}
                  className="usa-button usa-button--outline"
                >
                  Edit
                </Link>
                <Button type="button" secondary>
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
