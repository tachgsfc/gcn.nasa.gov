import type { DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '../__auth/user.server'

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request)
  if (!user) throw new Response(null, { status: 403 })
  return { email: user.email, idp: user.idp }
}

export default function User() {
  const { email, idp } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>Welcome, {email}!</h1>
      <p>You signed in with {idp || 'username and password'}.</p>
    </>
  )
}
