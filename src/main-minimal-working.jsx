import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App-minimal-working.jsx';
import './index.css';

function initApp() {
  try {
    console.log('🚀 Starting GreataAI Bot (Minimal Working Version)...');
    
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    console.log('✅ Root element found');
    console.log('✅ Initializing minimal working version...');

    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('✅ Minimal working app initialized successfully');
    
  } catch (error) {
    console.error('❌ Error initializing minimal working app:', error);
    
    document.body.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: Arial, sans-serif;
        padding: 20px;
      ">
        <div style="
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          max-width: 500px;
          width: 100%;
        ">
          <div style="font-size: 4rem; margin-bottom: 20px;">⚠️</div>
          <h1 style="color: #333; margin-bottom: 20px;">Critical Error</h1>
          <div style="
            background: #fee;
            border: 1px solid #fcc;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
          ">
            <h3 style="color: #c33; margin-top: 0;">React Initialization Failed</h3>
            <p style="color: #666; margin-bottom: 10px;">
              <strong>Error:</strong> ${error.message}
            </p>
            <p style="color: #666; margin-bottom: 15px;">
              Even the minimal version failed to initialize. This indicates a fundamental issue with:
            </p>
            <ul style="color: #666; margin-left: 20px; margin-bottom: 15px;">
              <li>JavaScript execution environment</li>
              <li>React library loading</li>
              <li>Browser compatibility</li>
              <li>Network connectivity to assets</li>
            </ul>
          </div>

          <div style="margin-top: 30px;">
            <button 
              onclick="window.location.reload()" 
              style="
                background: #dc3545;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                margin: 10px;
              "
            >
              🔄 Force Reload
            </button>
            <button 
              onclick="window.open('https://github.com/guychenya/GreataAIBot', '_blank')" 
              style="
                background: #28a745;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                margin: 10px;
              "
            >
              📱 View Repository
            </button>
          </div>

          <div style="
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #eee;
            font-size: 0.9rem;
            color: #666;
          ">
            <p>Status: Deployment troubleshooting in progress</p>
            <p>Expected: Full 3-panel AI chat interface</p>
          </div>
        </div>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}