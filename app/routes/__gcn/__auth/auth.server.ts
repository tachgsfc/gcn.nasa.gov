/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { createArcTableSessionStorage } from '@remix-run/architect'
import memoizee from 'memoizee'
import { Issuer } from 'openid-client'

export function getEnvOrDie(key: string) {
  const result = process.env[key]
  if (!result) throw new Error(`environment variable ${key} must be set`)
  return result
}

// Short-lived session for storing the OIDC state and PKCE code verifier
export const oidcStorage = createArcTableSessionStorage({
  cookie: {
    name: 'session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [getEnvOrDie('SESSION_SECRET')],
    sameSite: 'lax',
    path: '/',
    maxAge: 300,
    httpOnly: true,
  },
  table: 'sessions',
  idx: '_idx',
  ttl: '_ttl',
})

// Long-lived user session. The cookie name is the same as the oidcStorage
// session, so the cookie replaces it (with a longer expiration time).
export const storage = createArcTableSessionStorage({
  cookie: {
    name: 'session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [getEnvOrDie('SESSION_SECRET')],
    sameSite: 'lax',
    path: '/',
    maxAge: 3600,
    httpOnly: true,
  },
  table: 'sessions',
  idx: '_idx',
  ttl: '_ttl',
})

export const getOpenIDClient = memoizee(
  async function () {
    const user_pool_id = getEnvOrDie('COGNITO_USER_POOL_ID')

    const providerUrl = `https://cognito-idp.${
      user_pool_id.split('_')[0]
    }.amazonaws.com/${user_pool_id}/`

    const issuer = await Issuer.discover(providerUrl)

    return new issuer.Client({
      client_id: getEnvOrDie('OIDC_CLIENT_ID'),
      client_secret: getEnvOrDie('OIDC_CLIENT_SECRET'),
      response_types: ['code'],
    })
  },
  { promise: true }
)
