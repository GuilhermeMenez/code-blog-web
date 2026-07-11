import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { worker } from '@/mocks/browser'
import './index.css'

import App from './App'

async function enableMocks() {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === 'true') {
    return await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}

enableMocks().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
