import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";

async function startApp() {
  // Ensure jQuery globals are initialized before loading legacy modules
  // that expect `jQuery` to exist at module-evaluation time.
  await import("./setupJqueryGlobals.js");

  const [{ default: AppRouter }, { default: i18n }] = await Promise.all([
    import("./AppRouter.jsx"),
    import("./js/i18n.js"),
  ]);

  const rootEl = document.getElementById("root");
  if (!rootEl) throw new Error('Root element "#root" not found');

  createRoot(rootEl).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <AppRouter />
      </I18nextProvider>
    </React.StrictMode>
  );
}

startApp().catch((error) => {
  console.error("Fatal startup error:", error);
});
