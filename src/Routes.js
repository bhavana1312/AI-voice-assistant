// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Assistant from './assistant';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/assistant" element={<Assistant />} />
    </Routes>
  );
}

export default AppRoutes;
