import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App-exact-replica.jsx';

function initializeApp() {
  try {
    console.log('🚀 Initializing Original GreataAI Bot...');
    
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    
    console.log('✅ Root element found, rendering original app...');
    
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    console.log('✅ Original GreataAI Bot loaded successfully!');
    
  } catch (error) {
    console.error('❌ Error rendering original app:', error);
    
    // Enhanced error display
    document.body.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1a202c;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #e2e8f0;
        padding: 20px;
      ">
        <div style="
          background: #2d3748;
          padding: 40px;
          border-radius: 12px;
          border: 1px solid #4a5568;
          max-width: 600px;
          width: 100%;
          text-align: center;
        ">
          <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
          <h1 style="color: #f56565; margin-bottom: 20px; font-size: 1.5rem;">
            Original App Loading Error
          </h1>
          <div style="
            background: #2a2f3a;
            border: 1px solid #4a5568;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
          ">
            <p style="margin: 0 0 10px 0; color: #cbd5e0;">
              <strong>Error:</strong> ${error.message}
            </p>
            <p style="margin: 0; color: #a0aec0; font-size: 0.9rem;">
              The original GreataAI Bot application failed to load. This could be due to missing dependencies or component loading issues.
            </p>
          </div>
          
          <div style="margin-top: 30px;">
            <button 
              onclick="window.location.reload()" 
              style="
                background: #4299e1;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                margin: 0 8px;
              "
            >
              🔄 Reload Original App
            </button>
            <button 
              onclick="window.open('https://github.com/guychenya/GreataAIBot', '_blank')" 
              style="
                background: #48bb78;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                margin: 0 8px;
              "
            >
              📱 View Repository
            </button>
          </div>
          
          <div style="
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #4a5568;
            font-size: 0.9rem;
            color: #a0aec0;
          ">
            <p style="margin: 0;">Expected: Original 3-panel AI Assistant interface</p>
            <p style="margin: 5px 0 0 0;">Status: Attempting to load full original application</p>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}