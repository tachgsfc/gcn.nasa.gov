/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { storage } from './auth.server'

export async function getUser({ headers }: Request) {
  const session = await storage.getSession(headers.get('Cookie'))
  const sub = session.get('sub') as string | null
  const email = session.get('email') as string
  const groups = session.get('groups') as string[]
  const idp = session.get('idp') as string | null

  if (!sub) return null

  return { sub, email, groups, idp }
}
