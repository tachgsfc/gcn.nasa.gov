/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 *
 *
 *                                +-------------+
 *                                | TACH! TACH! |
 *                                +-------------+
 *                         \\    /
 *                 \\      (o>  /
 *                 (o>     //\
 *             ____(()_____V_/_____
 *                 ||      ||
 *                         ||
 *
 *
 */

import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { GridContainer } from '@trussworks/react-uswds'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getUser } from './__gcn/__auth/user.server'

TopBarProgress.config({
  barColors: {
    '0': '#e52207',
    '0.5': '#ffffff',
    '1.0': '#0050d8',
  },
})

interface LoaderData {
  email?: string
  hostname: string
}

export const loader: LoaderFunction = async function ({ request }) {
  const url = new URL(request.url)
  const result = { hostname: url.hostname }
  const user = await getUser(request)
  if (user) {
    return {
      email: user.email,
      ...result,
    }
  } else {
    return result
  }
}

export default function Index() {
  const location = useLocation()
  const loaderData = useLoaderData<LoaderData>()

  return (
    <>
      <Header pathname={location.pathname} {...loaderData} />
      <section className="usa-section main-content">
        <GridContainer>
          <Outlet />
        </GridContainer>
      </section>
      <Footer />
    </>
  )
}
