/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { ClientCredentialVendingMachine } from '../../user/client_credentials.server'

export const loader: LoaderFunction = async ({ request }) => {
  const machine = await ClientCredentialVendingMachine.create(request)
  return await machine.getClientCredentials()
}

export const action: ActionFunction = async ({ request }) => {
  if (request.method != 'POST') throw new Response(null, { status: 405 })

  const [machine, body] = await Promise.all([
    ClientCredentialVendingMachine.create(request),
    request.json(),
  ])
  return await machine.createClientCredential(body.name, body.scope)
}

// FIXME: workaround for https://github.com/remix-run/remix/issues/1828.
// Resource routes (without browser code) don't get server pruning done.
// Once fixed upstream, remove.
export const meta = () => ({})
