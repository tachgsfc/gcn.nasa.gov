/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { Outlet } from '@remix-run/react'
import { Grid } from '@trussworks/react-uswds'

export default function UserPageContainer({ header }: { header: string }) {
  return (
    <Grid row>
      <div className="tablet:grid-col-10 flex-fill usa-prose">
        <h1 className="margin-y-0">{header}</h1>
      </div>
      <Outlet />
    </Grid>
  )
}
