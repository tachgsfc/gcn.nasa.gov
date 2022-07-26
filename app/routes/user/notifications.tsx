import { Outlet } from '@remix-run/react'

export default function Notifications() {
  return (
    <>
      <h1>Notification Management</h1>
      <Outlet />
    </>
  )
}
