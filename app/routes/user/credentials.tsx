import { Outlet } from '@remix-run/react'

export default function Credentials() {
  return (
    <>
      <h1>Client Credentials</h1>
      <Outlet />
    </>
  )
}
