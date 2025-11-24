import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { worker } from './api/_mocks/browser';

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './theme/global.css';

import AppRoutes from './routes';
import AuthProvider from './context/authContext.tsx';
import PostProvider from './context/postContext.tsx';

if (import.meta.env.VITE_MSW_MOCKS === 'true') {
  await worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <Theme
          accentColor="violet"
          grayColor="sand"
          panelBackground="translucent"
          radius="large"
          scaling="100%"
          appearance="dark"
        >
          <AppRoutes />
        </Theme>
      </PostProvider>
    </AuthProvider>
  </StrictMode>
);
