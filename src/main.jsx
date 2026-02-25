import React from "react";
import { createRoot } from "react-dom/client";
import $ from "jquery";

window.$ = $;
window.jQuery = $;
globalThis.$ = $;
globalThis.jQuery = $;

import ClssLoginControl from "./components/jsc_cmp_login.jsx";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Root element "#root" not found');

createRoot(rootEl).render(
  <React.StrictMode>
    <ClssLoginControl />
  </React.StrictMode>
);
