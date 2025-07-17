import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial;"><h1>Error loading app</h1><p>' + error.message + '</p></div>';
}