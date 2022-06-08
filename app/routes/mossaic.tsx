import { Link, NavLink, Outlet } from '@remix-run/react'
import { useState } from 'react'
import {
  GridContainer,
  Header as USWDSHeader,
  NavMenuButton,
  PrimaryNav,
  Title,
} from '@trussworks/react-uswds'

export default function Index() {
  const [expanded, setExpanded] = useState(false)
  const onClick = () => setExpanded((prvExpanded) => !prvExpanded)

  return (
    <>
      <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`}></div>
      <USWDSHeader basic className="usa-header">
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              <Link to="/">
                <img
                  id="site-logo"
                  src="/_static/img/mossaic-logo.jpg"
                  alt="MOSSAIC logo"
                />
                MOSSAIC
              </Link>
            </Title>
            <NavMenuButton onClick={onClick} label="Menu" />
          </div>
          <PrimaryNav
            mobileExpanded={expanded}
            items={[
              <NavLink className="usa-nav__link" to="section1" key="section1">
                Section 1
              </NavLink>,
              <NavLink className="usa-nav__link" to="section2" key="section2">
                Section 2
              </NavLink>,
              <NavLink className="usa-nav__link" to="section3" key="section3">
                Section 3
              </NavLink>,
            ]}
            onToggleMobileNav={onClick}
          />
        </div>
      </USWDSHeader>
      <section className="usa-section main-content">
        <GridContainer>
          <Outlet />
        </GridContainer>
      </section>
    </>
  )
}
