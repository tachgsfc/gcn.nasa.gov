/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { storage } from './auth.server'
import type { getUser } from './user.server'

export const loader: LoaderFunction = async () => {
  const session = await storage.getSession()

  const user: NonNullable<Awaited<ReturnType<typeof getUser>>> = {
    sub: 'albert.einstein@example.edu',
    email: 'albert.einstein@example.edu',
    idp: null,
    groups: ['gcn.nasa.gov/kafka-public-consumer'],
  }
  Object.entries(user).forEach(([key, value]) => {
    session.set(key, value)
  })

  const cookie = await storage.commitSession(session)
  return redirect('/user', { headers: { 'Set-Cookie': cookie } })
}
