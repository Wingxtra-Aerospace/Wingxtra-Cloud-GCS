import React from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'jquery';

const jQuery = $;
window.$ = $;
window.jQuery = $;
globalThis.$ = $;
globalThis.jQuery = $;

async function startApp() {
  const { default: ClssLoginControl } = await import('./components/jsc_cmp_login.jsx');

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element with id "root" was not found.');
  }

  createRoot(rootElement).render(
    <React.StrictMode>
      <ClssLoginControl />
    </React.StrictMode>,
  );
}

startApp();
