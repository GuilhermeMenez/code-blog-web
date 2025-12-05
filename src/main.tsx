import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { worker } from './api/_mocks/browser'

import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './styles/global.css'

import AppRoutes from './routes'
import AuthProvider from './context/authContext'
import PostProvider from './context/postContext'

if (import.meta.env.VITE_MSW_MOCKS === 'true') {
  await worker.start()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <Theme
          accentColor="violet"
          grayColor="slate"
          panelBackground="translucent"
          radius="large"
          scaling="100%"
          appearance="dark"
        >
          <AppRoutes />
        </Theme>
      </PostProvider>
    </AuthProvider>
  </StrictMode>,
)
