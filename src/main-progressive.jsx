import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App-progressive.jsx';
import './index.css';

function initApp() {
  try {
    console.log('🚀 Initializing GreataAI Bot (Progressive Loading)...');
    
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    console.log('✅ Root element found');
    console.log('✅ Starting React app with progressive loading...');

    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('✅ App initialized successfully');
    
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    
    // Create a working fallback
    const fallbackApp = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: Arial, sans-serif;
      ">
        <div style="
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          max-width: 600px;
          width: 90%;
        ">
          <div style="font-size: 4rem; margin-bottom: 20px;">🤖</div>
          <h1 style="color: #333; margin-bottom: 20px;">GreataAI Bot</h1>
          <h2 style="color: #666; margin-bottom: 30px;">Multi-Provider AI Chat</h2>
          
          <div style="
            background: #fee;
            border: 1px solid #fcc;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
          ">
            <h3 style="color: #c33; margin-top: 0;">⚠️ Loading Error</h3>
            <p style="color: #666; margin-bottom: 10px;">
              <strong>Error:</strong> ${error.message}
            </p>
            <p style="color: #666; margin-bottom: 15px;">
              The React application failed to initialize. This could be due to:
            </p>
            <ul style="color: #666; margin-left: 20px;">
              <li>JavaScript bundle loading issues</li>
              <li>Missing dependencies</li>
              <li>Network connectivity problems</li>
              <li>Build configuration issues</li>
            </ul>
          </div>

          <div style="
            background: #e8f5e8;
            border: 1px solid #c3e6cb;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
          ">
            <h3 style="color: #155724; margin-top: 0;">🔧 Planned Features</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
              <div>
                <h4 style="color: #155724; margin: 0 0 10px 0;">AI Providers</h4>
                <ul style="color: #155724; margin: 0; padding-left: 20px; font-size: 0.9rem;">
                  <li>OpenAI (GPT-4)</li>
                  <li>Anthropic (Claude)</li>
                  <li>Google Gemini</li>
                  <li>Ollama (Local)</li>
                  <li>Groq & Mistral</li>
                </ul>
              </div>
              <div>
                <h4 style="color: #155724; margin: 0 0 10px 0;">Features</h4>
                <ul style="color: #155724; margin: 0; padding-left: 20px; font-size: 0.9rem;">
                  <li>3-panel interface</li>
                  <li>File uploads</li>
                  <li>Voice input</li>
                  <li>Dark/Light themes</li>
                  <li>Chat history</li>
                </ul>
              </div>
            </div>
          </div>

          <div style="margin-top: 30px;">
            <button 
              onclick="window.location.reload()" 
              style="
                background: #007bff;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                margin: 10px;
              "
            >
              🔄 Retry Loading
            </button>
            <button 
              onclick="window.location.href='https://github.com/guychenya/GreataAIBot'" 
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
              📱 View Source
            </button>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 0.9rem; margin: 0;">
              Built with React • Vite • Deployed on Netlify
            </p>
            <p style="color: #999; font-size: 0.9rem; margin: 5px 0 0 0;">
              Status: Troubleshooting deployment issues
            </p>
          </div>
        </div>
      </div>
    `;
    
    document.body.innerHTML = fallbackApp;
  }
}

// Initialize with multiple fallbacks
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}