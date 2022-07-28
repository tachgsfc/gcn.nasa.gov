import { Outlet } from '@remix-run/react'

export default function Notifications() {
  return (
    <>
      <h1>Email Notifications</h1>
      <Outlet />
    </>
  )
}
