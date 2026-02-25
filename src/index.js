import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import AppRouter from './AppRouter.jsx';
import i18n from './js/i18n.js';
import { fn_loadConfig } from './js/js_siteConfig.js';

async function startApp() {
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

startApp();
