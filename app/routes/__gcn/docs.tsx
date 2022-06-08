/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { SideNav } from '@trussworks/react-uswds'
import { NavLink, Outlet } from '@remix-run/react'

export default function Docs() {
  return (
    <div className="grid-row grid-gap">
      <div className="desktop:grid-col-3">
        <SideNav
          items={[
            <NavLink key="." to="." end>
              About GCN
            </NavLink>,
            <NavLink key="client" to="client">
              Client Configuration
            </NavLink>,
            <NavLink key="styleguide" to="styleguide">
              Circulars Style Guide
            </NavLink>,
            <NavLink key="contributing" to="contributing">
              Contributing
            </NavLink>,
            <NavLink key="roadmap" to="roadmap">
              Road Map
            </NavLink>,
          ]}
        />
      </div>
      <div className="desktop:grid-col-9 usa-prose">
        <Outlet />
      </div>
    </div>
  )
}
