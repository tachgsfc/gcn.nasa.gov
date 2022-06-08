/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import type { TokenSet } from 'openid-client'
import { generators } from 'openid-client'
import { getOpenIDClient, oidcStorage, storage } from './auth.server'
import type { getUser } from './user.server'

function userFromTokenSet(
  tokenSet: TokenSet
): NonNullable<Awaited<ReturnType<typeof getUser>>> {
  const claims = tokenSet.claims()
  const sub = claims.sub
  const email = claims.email as string

  const idp =
    claims.identities instanceof Array && claims.identities.length > 0
      ? (claims.identities[0].providerName as string)
      : null

  const groups = ((claims['cognito:groups'] ?? []) as string[]).filter(
    (group) => group.startsWith('gcn.nasa.gov')
  )

  return { sub, email, groups, idp }
}

export const loader: LoaderFunction = async ({ request: { headers, url } }) => {
  const parsedUrl = new URL(url)
  if (!parsedUrl.searchParams.get('code')) {
    const [client, { cookie, ...props }] = await Promise.all([
      getOpenIDClient(),
      (async () => {
        const oidcSessionPromise = oidcStorage.getSession()

        const nonce = generators.nonce()
        const state = generators.state()
        const code_verifier = generators.codeVerifier()
        const code_challenge = generators.codeChallenge(code_verifier)

        const oidcSession = await oidcSessionPromise
        oidcSession.set('code_verifier', code_verifier)
        oidcSession.set('nonce', nonce)
        oidcSession.set('state', state)

        const cookie = await oidcStorage.commitSession(oidcSession)

        return { cookie, nonce, state, code_challenge }
      })(),
    ])

    const authorizationUrl = client.authorizationUrl({
      scope: 'openid',
      code_challenge_method: 'S256',
      redirect_uri: url,
      ...props,
    })

    return redirect(authorizationUrl, { headers: { 'Set-Cookie': cookie } })
  } else {
    const sessionPromise = storage.getSession()
    const [client, { oidcSessionDestroyPromise, ...checks }] =
      await Promise.all([
        getOpenIDClient(),
        (async () => {
          const cookie = headers.get('Cookie')
          const oidcSession = await oidcStorage.getSession(cookie)
          const code_verifier = oidcSession.get('code_verifier')
          const nonce = oidcSession.get('nonce')
          const state = oidcSession.get('state')
          if (!code_verifier || !nonce || !state)
            throw new Response(
              'Your session timed out. Please try logging in again.',
              { status: 400 }
            )
          const oidcSessionDestroyPromise =
            oidcStorage.destroySession(oidcSession)
          return { oidcSessionDestroyPromise, code_verifier, nonce, state }
        })(),
      ])

    const params = client.callbackParams(parsedUrl.search)
    parsedUrl.search = ''
    const tokenSet = await client.callback(parsedUrl.toString(), params, checks)

    const user = userFromTokenSet(tokenSet)
    const session = await sessionPromise
    Object.entries(user).forEach(([key, value]) => {
      session.set(key, value)
    })

    const [cookie] = await Promise.all([
      storage.commitSession(session),
      oidcSessionDestroyPromise,
    ])

    return redirect('/user', { headers: { 'Set-Cookie': cookie } })
  }
}
