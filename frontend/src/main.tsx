import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

import "./i18n/index.ts";
import "./index.css";

import { NotificationProvider } from "./context/NotificationContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <NotificationProvider>
            <AuthProvider>
                <StrictMode>
                    <App />
                </StrictMode>
            </AuthProvider>
        </NotificationProvider>
    </BrowserRouter>
);
