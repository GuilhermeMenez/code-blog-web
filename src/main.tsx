import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@radix-ui/themes/styles.css";
import "./theme/global.css";

import App from "./App.tsx";
import AuthProvider from "./context/authContext.tsx";
import PostProvider  from "./context/postContext.tsx"; 
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <Theme 
          accentColor="violet" 
          grayColor="sand" 
          radius="large" 
          scaling="100%" 
          appearance="dark"
        >
          <App />
        </Theme>
      </PostProvider>
    </AuthProvider>
  </StrictMode>
);
