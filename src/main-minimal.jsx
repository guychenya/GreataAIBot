import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App-minimal.jsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error('Root element not found');
}