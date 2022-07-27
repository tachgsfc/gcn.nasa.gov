import type { DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import SegmentedCards from '~/components/SegmentedCards'
import { ClientCredentialVendingMachine } from '../client_credentials.server'
import { Grid } from '@trussworks/react-uswds'
import CredentialCard from '~/components/CredentialCard'

export async function loader({ request }: DataFunctionArgs) {
  const machine = await ClientCredentialVendingMachine.create(request)
  const client_credentials = await machine.getClientCredentials()
  return { client_credentials }
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

export default function Index() {
  const { client_credentials } = useLoaderData<typeof loader>()

  return (
    <>
      <Grid row>
        <div className="grid-col flew-fill ">
          <h3 className="bottom-aligned">Existing Credentials</h3>
        </div>
        <div className="grid-col flex-auto">
          <Link className="bottom-aligned" to="edit">
            Add
          </Link>
        </div>
      </Grid>
      <SegmentedCards>
        {client_credentials.map((credential) => (
          <CredentialCard key={credential.client_id} {...credential} />
        ))}
      </SegmentedCards>
    </>
  )
}
