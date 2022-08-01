/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { useState } from 'react'

export type Tab = {
  label: string
  Component: React.ReactNode
}

type TabsContainerProps = {
  tabs: Tab[]
}

/**
 * Avalible Props
 * @param tabs Array of Tab objects with properties label: string and a Component: React.ReactNode
 */
let Tabs: React.FC<TabsContainerProps> = ({ tabs = [] }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const Panel = tabs && tabs[selectedTab]

  return (
    <div className="tabs-component">
      <div role="tablist">
        {tabs.map((tab, index) => (
          <button
            className={selectedTab === index ? 'active' : ''}
            onClick={() => setSelectedTab(index)}
            key={index}
            type="button"
            role="tab"
            aria-selected={selectedTab === index}
            aria-controls={`tabpanel-${index}`}
            tabIndex={selectedTab === index ? 0 : -1}
            id={`btn-${index}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`btn-${selectedTab}`}
        id={`tabpanel-${selectedTab}`}
      >
        {Panel && Panel.Component}
      </div>
    </div>
  )
}
export default Tabs
