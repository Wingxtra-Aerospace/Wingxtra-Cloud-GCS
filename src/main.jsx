import $ from "jquery";
window.$ = $;
window.jQuery = $;

import React from "react";
import { createRoot } from "react-dom/client";
import ClssLoginControl from "./components/jsc_cmp_login";

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <React.StrictMode>
    <ClssLoginControl />
  </React.StrictMode>
);
