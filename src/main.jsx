import React from 'react';
import { createRoot } from 'react-dom/client';
import ClssLoginControl from './components/jsc_cmp_login';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ClssLoginControl />
  </React.StrictMode>,
);
