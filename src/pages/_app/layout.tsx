import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div>
      <p>HeaderApp</p>
      
      <Outlet />
    </div>
  )
}
