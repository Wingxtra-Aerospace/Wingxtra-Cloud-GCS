import $ from "jquery";
window.$ = $;
window.jQuery = $;
globalThis.$ = $;
globalThis.jQuery = $;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

async function startApp() {
  const [{ default: AppRouter }, { default: i18n }, { fn_loadConfig }] = await Promise.all([
    import('./AppRouter.jsx'),
    import('./js/i18n.js'),
    import('./js/js_siteConfig.js'),
  ]);

  await fn_loadConfig();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element with id "root" was not found.');
  }

  createRoot(rootElement).render(
    React.createElement(
      I18nextProvider,
      { i18n },
      React.createElement(AppRouter),
    ),
  );
}

startApp().catch((error) => {
  console.error('Fatal startup error:', error);
});
