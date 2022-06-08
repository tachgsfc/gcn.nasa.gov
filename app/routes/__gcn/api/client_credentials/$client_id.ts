/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { ActionFunction } from '@remix-run/node'
import { ClientCredentialVendingMachine } from '../../user/client_credentials.server'

export const action: ActionFunction = async ({ params, request }) => {
  if (request.method != 'DELETE') throw new Response(null, { status: 405 })
  if (!params.client_id) throw new Response('params.client_id must be defined')

  const machine = await ClientCredentialVendingMachine.create(request)
  await machine.deleteClientCredential(params.client_id)
  return null
}

// FIXME: workaround for https://github.com/remix-run/remix/issues/1828.
// Resource routes (without browser code) don't get server pruning done.
// Once fixed upstream, remove.
export const meta = () => ({})
