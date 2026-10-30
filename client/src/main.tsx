import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
     <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  </StrictMode>,
 
);
