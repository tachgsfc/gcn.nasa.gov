/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { ReactNode } from 'react'
import {
  Grid,
  GridContainer,
  IconBugReport,
  IconGithub,
  Identifier,
  IdentifierGov,
  IdentifierIdentity,
  IdentifierLink,
  IdentifierLinks,
  IdentifierLinkItem,
  IdentifierLogo,
  IdentifierLogos,
  IdentifierMasthead,
  IconHelp,
} from '@trussworks/react-uswds'
import { Link } from '@remix-run/react'

function ContactLink({
  children,
  headline,
  href,
  icon,
}: {
  children: ReactNode
  headline: ReactNode
  href: string
  icon: ReactNode
}) {
  return (
    <Grid
      tablet={{ col: true }}
      className="contact-link padding-y-1 tablet:padding-0"
    >
      <div className="usa-media-block">
        <div className="usa-media-block__img circle-6 bg-accent-cool-dark display-flex flex-row flex-align-center flex-justify-center">
          {icon}
        </div>
        <div className="usa-media-block_body">
          {headline}{' '}
          <div className="display-block tablet:display-inline">
            <a href={href}>{children}</a>.
          </div>
        </div>
      </div>
    </Grid>
  )
}

export function Footer() {
  return (
    <Identifier>
      <div className="usa-footer__secondary-section text-ink">
        <GridContainer>
          <Grid row gap>
            <ContactLink
              href="https://heasarc.gsfc.nasa.gov/cgi-bin/Feedback?selected=kafkagcn"
              icon={<IconHelp size={4} color={'white'} />}
              headline="Questions or comments?"
            >
              Contact GCN directly
            </ContactLink>
            <ContactLink
              href="https://github.com/tachgsfc/gcn.nasa.gov/issues"
              icon={<IconBugReport size={4} color={'white'} />}
              headline="Have you found a bug in GCN?"
            >
              Open an issue
            </ContactLink>
            <ContactLink
              href="https://github.com/tachgsfc/gcn.nasa.gov"
              icon={<IconGithub size={4} color={'white'} />}
              headline="Want to contribute code to GCN?"
            >
              Get involved on GitHub
            </ContactLink>
          </Grid>
        </GridContainer>
      </div>
      <IdentifierMasthead aria-label="Agency identifier">
        <IdentifierLogos>
          <IdentifierLogo href="https://www.nasa.gov">
            <img
              src="/_static/img/logo.svg"
              className="usa-identifier__logo-img"
              alt="NASA logo"
            />
          </IdentifierLogo>
        </IdentifierLogos>
        <IdentifierIdentity domain="gcn.nasa.gov">
          A service of the <Link to="/mossaic">MOSSAIC</Link> collaboration
        </IdentifierIdentity>
      </IdentifierMasthead>
      <IdentifierLinks navProps={{ 'aria-label': 'Important links' }}>
        <IdentifierLinkItem>
          <IdentifierLink rel="external" href="https://www.nasa.gov/about">
            About NASA
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/content/section-508-accessibility-at-nasa"
          >
            Accessibility
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/news/budget"
          >
            Budget and Performance
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/offices/odeo/no-fear-act"
          >
            No FEAR Act
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink rel="external" href="https://www.nasa.gov/FOIA">
            FOIA Requests
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink rel="external" href="https://oig.nasa.gov/">
            Office of the Inspector General
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/about/highlights/HP_Privacy.html"
          >
            Privacy Policy
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/vulnerability-disclosure-policy"
          >
            Vulnerability Disclosure Policy
          </IdentifierLink>
        </IdentifierLinkItem>
      </IdentifierLinks>
      <IdentifierGov aria-label="U.S. government information and services">
        Looking for U.S. government information and services?{' '}
        <a rel="external" href="https://www.usa.gov">
          Visit USA.gov
        </a>
      </IdentifierGov>
    </Identifier>
  )
}
