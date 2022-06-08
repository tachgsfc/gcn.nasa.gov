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

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useTransition,
} from '@remix-run/react'
import type { LoaderFunction, LinksFunction } from '@remix-run/node'
import { GovBanner } from '@trussworks/react-uswds'
import highlightStyle from 'highlight.js/styles/github.css'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DevBanner } from './components/DevBanner'
import { useSpinDelay } from 'spin-delay'

TopBarProgress.config({
  barColors: {
    '0': '#e52207',
    '0.5': '#ffffff',
    '1.0': '#0050d8',
  },
})

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: '/_static/theme/css/custom.css',
  },
  {
    rel: 'stylesheet',
    href: highlightStyle,
  },
  ...[16, 40, 57, 72, 114, 144, 192].map((size) => ({
    rel: 'icon',
    href: `/_static/theme/img/favicons/favicon-${size}.png`,
    sizes: `${size}x${size}`,
  })),
]

interface LoaderData {
  hostname: string
}

export const loader: LoaderFunction = async function ({ request }) {
  const url = new URL(request.url)
  return { hostname: url.hostname }
}

export default function App() {
  const loaderData = useLoaderData<LoaderData>()
  const transition = useTransition()
  const showProgress = useSpinDelay(transition.state !== 'idle')

  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <a className="usa-skipnav" href="#main-content">
          Skip to main content
        </a>
        {showProgress && <TopBarProgress />}
        <GovBanner />
        <DevBanner hostname={loaderData.hostname} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
