/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { getOpenIDClient, storage } from './auth.server'

export const loader: LoaderFunction = async ({ request: { headers, url } }) => {
  const [client, cookie] = await Promise.all([
    getOpenIDClient(),
    (async () => {
      const session = await storage.getSession(headers.get('Cookie'))
      return await storage.destroySession(session)
    })(),
  ])

  // Determine the Cognito logout URI endpoint
  const auth_endpoint = client.issuer.metadata.authorization_endpoint
  if (!auth_endpoint)
    throw new Error(
      'client.issuer.metadata.authorization_endpoint must be present'
    )
  const logoutUrl = new URL(auth_endpoint)
  logoutUrl.pathname = '/logout'

  logoutUrl.searchParams.set('client_id', client.metadata.client_id)
  logoutUrl.searchParams.set('logout_uri', new URL(url).origin)

  return redirect(logoutUrl.toString(), {
    headers: {
      'Set-Cookie': cookie,
    },
  })
}
