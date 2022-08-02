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
import { getEnvOrDie } from '~/lib/env'

// Short-lived session for storing the OIDC state and PKCE code verifier
export const oidcStorage = createArcTableSessionStorage({
  cookie: {
    name: 'session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [getEnvOrDie('SESSION_SECRET')],
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
    const issuer = await Issuer.discover(getEnvOrDie('OIDC_PROVIDER'))

    return new issuer.Client({
      client_id: getEnvOrDie('OIDC_CLIENT_ID'),
      client_secret: getEnvOrDie('OIDC_CLIENT_SECRET'),
      response_types: ['code'],
    })
  },
  { promise: true }
)
