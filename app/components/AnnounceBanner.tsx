/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { Button, Link } from '@trussworks/react-uswds'
import { useState } from 'react'

export default function AnnounceBanner() {
  const [showFullBanner, setShowFullBanner] = useState(true)

  function toggleShowBanner() {
    setShowFullBanner(!showFullBanner)
  }

  return (
    <section
      className="usa-banner bg-accent-cool-lighter"
      aria-label="Official announcement"
    >
      <div className="usa-accordion">
        <header className="usa-banner__header">
          <div className="usa-banner__inner">
            <div className="grid-col-fill tablet:grid-col-auto">
              <h2 className="usa-banner__header-text">
                We invite you to join one of our three public Zoom webinars for
                an overview of the new GCN.
              </h2>
            </div>
            <Button
              type="button"
              className="usa-banner__button"
              aria-expanded={showFullBanner}
              onClick={toggleShowBanner}
            >
              <span className="usa-banner__button-text">
                Show {showFullBanner ? 'less' : 'more'}
              </span>
            </Button>
          </div>
        </header>
        {showFullBanner && (
          <div
            className="usa-banner__content usa-accordion__content padding-top-2"
            id="announcement-banner-blue"
          >
            <div className="grid-row">
              <div className="mobile-lg:grid-col-4">
                August 1, 2022 12:00-13:00 UTC
                <div>(best for Atlantic):</div>
                <Link rel="external" href="https://bit.ly/3Pt2TH9">
                  https://bit.ly/3Pt2TH9
                </Link>
              </div>
              <div className="mobile-lg:grid-col-4">
                August 1, 2022 20:00-21:00 UTC <br /> (best for Pacific):
                <br />
                <Link rel="external" href="https://bit.ly/3IT7Qqc">
                  https://bit.ly/3IT7Qqc
                </Link>
              </div>
              <div className="mobile-lg:grid-col-4">
                August 2, 2022 04:00-05:00 UTC <br /> (best for Asia and
                Oceania):
                <br />
                <Link rel="external" href="https://bit.ly/3v2pNwV">
                  https://bit.ly/3v2pNwV
                </Link>
              </div>
            </div>
            <p>
              If you cannot attend live, then you can get the{' '}
              <Link
                rel="external"
                href="https://nasa-gcn.github.io/gcn-presentation/"
              >
                presentation
              </Link>{' '}
              at any time.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
