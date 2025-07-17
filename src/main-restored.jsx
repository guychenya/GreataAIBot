import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Restore original app with improved error handling
function initApp() {
  try {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    console.log('✅ Starting GreataAI Bot (Original UI)...');
    console.log('✅ Root element found');
    console.log('✅ React modules loaded');

    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('✅ Original app rendered successfully');
    
  } catch (error) {
    console.error('❌ Fatal error during app initialization:', error);
    
    // Fallback UI for critical errors
    const fallbackHTML = `
      <div style="
        font-family: Arial, sans-serif;
        padding: 40px;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          max-width: 500px;
          width: 90%;
        ">
          <div style="font-size: 3rem; margin-bottom: 20px;">🤖</div>
          <h1 style="color: #333; margin-bottom: 20px;">GreataAI Bot</h1>
          <div style="
            background: #fee;
            border: 1px solid #fcc;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          ">
            <h3 style="color: #c33; margin-bottom: 10px;">
              ⚠️ Original App Loading Error
            </h3>
            <p style="color: #666; margin-bottom: 15px;">
              ${error.message || 'Unknown error occurred'}
            </p>
            <p style="color: #666; margin-bottom: 15px; font-size: 0.9rem;">
              The original full-featured application failed to load. This might be due to missing dependencies or build issues.
            </p>
            <button 
              onclick="window.location.reload()"
              style="
                background: #007bff;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
                margin: 5px;
              "
            >
              🔄 Reload Page
            </button>
            <button 
              onclick="window.location.href = 'https://github.com/guychenya/GreataAIBot'"
              style="
                background: #28a745;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
                margin: 5px;
              "
            >
              📱 View Source
            </button>
          </div>
          <div style="margin-top: 20px; font-size: 0.9rem; color: #666;">
            <p>Original UI: 3-panel layout with full chat functionality</p>
            <p>Status: Attempting to restore full application</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.innerHTML = fallbackHTML;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}