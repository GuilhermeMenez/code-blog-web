import { useState } from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Navigation } from './-components/Navigation'
import { Header } from './-components/Header'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  
  return (
    <div className="flex flex-row w-full min-h-dvh">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="flex flex-col items-center w-full">
        <Header isMenuOpen={isMenuOpen} />

        <div className="flex w-full max-w-203">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
