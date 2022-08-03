/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { ReactNode } from 'react'

export default function SegmentedCards({
  children,
}: {
  children: ReactNode[]
}) {
  return (
    <>
      {children.map((child, index) => (
        <div
          key={index}
          className={`padding-2 border-base-lighter border-left-2px border-right-2px border-bottom-2px border-solid full-width-span ${
            index == 0 ? 'radius-top-md margin-top-1' : ''
          } ${index == children.length - 1 ? 'radius-bottom-md' : ''} ${
            index > 0 ? 'border-top-0' : 'border-top-2px'
          }`}
        >
          {child}
        </div>
      ))}
    </>
  )
}
