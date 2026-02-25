import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import AppRouter from "./AppRouter.jsx";
import i18n from "./js/i18n.js";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Root element "#root" not found');

createRoot(rootEl).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AppRouter />
    </I18nextProvider>
  </React.StrictMode>
);
