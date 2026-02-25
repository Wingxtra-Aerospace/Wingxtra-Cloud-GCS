import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import Planning from './pages/Planning.jsx';
import AccessCode from './pages/AccessCode.jsx';
import NoPage from './pages/NoPage.jsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="planning" element={<Planning />} />
          <Route path="home" element={<Home />} />
          <Route path="mapeditor" element={<Planning />} />
          <Route path="debug" element={<AccessCode />} />
          <Route path="access-code" element={<AccessCode />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
