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
      <div className="desktop:grid-col-4">
        <SideNav
          items={[
            <NavLink key="." to="." end>
              Missions, Instruments, and Facilities
            </NavLink>,
            <NavLink key="fermi" to="fermi">
              Fermi Gamma-ray Space Telescope
            </NavLink>,
            <NavLink key="swift" to="swift">
              Neil Gehrels Swift Observatory
            </NavLink>,
            <NavLink key="lvk" to="lvk">
              LIGO/Virgo/KAGRA
            </NavLink>,
            <NavLink key="icecube" to="icecube">
              IceCube
            </NavLink>,
            <NavLink key="hawc" to="hawc">
              HAWC
            </NavLink>,
            <NavLink key="calet" to="calet">
              CALET
            </NavLink>,
            <NavLink key="maxi" to="maxi">
              MAXI
            </NavLink>,
            <NavLink key="integral" to="integral">
              INTEGRAL
            </NavLink>,
            <NavLink key="agile" to="agile">
              AGILE
            </NavLink>,
            <NavLink key="konus" to="konus">
              Konus-Wind
            </NavLink>,
            <NavLink key="moa" to="moa">
              MOA
            </NavLink>,
            <NavLink key="snews" to="snews">
              SNEWS
            </NavLink>,
            <NavLink key="sksn" to="sksn">
              SKSN
            </NavLink>,
          ]}
        />
      </div>
      <div className="desktop:grid-col-8 usa-prose">
        <Outlet />
      </div>
    </div>
  )
}
