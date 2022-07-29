/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

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
