/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { NavLink, Outlet } from '@remix-run/react'
import { SideNav } from '@trussworks/react-uswds'

export default function User() {
  return (
    <>
      <div className="grid-row grid-gap">
        <div className="desktop:grid-col-3">
          <SideNav
            items={[
              <NavLink key="." to="." end>
                Account Info
              </NavLink>,
              <NavLink key="credentials" to="credentials">
                Client Credentials
              </NavLink>,
              <NavLink key="notifications" to="notifications">
                Email Notifications
              </NavLink>,
              <NavLink key="logout" to="/logout">
                Sign Out
              </NavLink>,
            ]}
          />
        </div>
        <div className="desktop:grid-col-9 usa-prose">
          <Outlet />
        </div>
      </div>
    </>
  )
}
