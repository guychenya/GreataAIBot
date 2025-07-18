import React, { useState, useEffect, Suspense } from 'react';

// Progressive loading to avoid bundle size issues
const ChatArea = React.lazy(() => import('./components/ChatArea'));
const Sidebar = React.lazy(() => import('./components/Sidebar'));
const SettingsPanel = React.lazy(() => import('./components/SettingsPanel'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const InputArea = React.lazy(() => import('./components/InputArea'));

// Import contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatProvider } from './contexts/ChatContext';
import { SettingsProvider } from './contexts/SettingsContext';

// Simple fallback components to avoid import errors
const SimpleChatArea = () => (
  <div style={{ flex: 1, padding: '20px', background: '#f8f9fa' }}>
    <h2>Chat Area</h2>
    <p>Welcome to GreataAI Bot! The chat interface is loading...</p>
  </div>
);

const SimpleSidebar = () => (
  <div style={{ width: '300px', background: '#343a40', color: 'white', padding: '20px' }}>
    <h3>Conversations</h3>
    <p>Loading conversation history...</p>
  </div>
);

const SimpleInputArea = () => (
  <div style={{ padding: '20px', background: 'white', borderTop: '1px solid #ddd' }}>
    <input 
      type="text" 
      placeholder="Type your message..." 
      style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
    />
  </div>
);

function App() {
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  const [activeView, setActiveView] = useState('chat');
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
  const [theme, setTheme] = useState('light');
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate progressive loading
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setComponentsLoaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  // Loading screen
  if (!componentsLoaded) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '90%'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤖</div>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>Loading GreataAI Bot</h2>
          <div style={{
            background: '#f0f0f0',
            borderRadius: '10px',
            height: '10px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: '#007bff',
              height: '100%',
              borderRadius: '10px',
              width: `${loadingProgress}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          <p style={{ color: '#666', marginBottom: '10px' }}>
            Loading components... {loadingProgress}%
          </p>
          <p style={{ color: '#999', fontSize: '0.9rem' }}>
            Multi-provider AI chat interface
          </p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <SettingsProvider>
        <ChatProvider>
          <div style={{
            display: 'flex',
            height: '100vh',
            fontFamily: 'Arial, sans-serif',
            background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5'
          }}>
            {/* Left Panel - Sidebar */}
            {!leftPanelCollapsed && (
              <Suspense fallback={<SimpleSidebar />}>
                <Sidebar />
              </Suspense>
            )}

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <header style={{
                background: theme === 'dark' ? '#2d3748' : 'white',
                padding: '15px 20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      marginRight: '15px'
                    }}
                  >
                    {leftPanelCollapsed ? '☰' : '←'}
                  </button>
                  <h1 style={{ margin: 0, color: theme === 'dark' ? 'white' : '#333' }}>
                    🤖 GreataAI Bot
                  </h1>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setActiveView('chat')}
                    style={{
                      padding: '8px 16px',
                      background: activeView === 'chat' ? '#007bff' : 'transparent',
                      color: activeView === 'chat' ? 'white' : '#666',
                      border: '1px solid #007bff',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    💬 Chat
                  </button>
                  <button
                    onClick={() => setActiveView('settings')}
                    style={{
                      padding: '8px 16px',
                      background: activeView === 'settings' ? '#007bff' : 'transparent',
                      color: activeView === 'settings' ? 'white' : '#666',
                      border: '1px solid #007bff',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ⚙️ Settings
                  </button>
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    style={{
                      padding: '8px 16px',
                      background: 'transparent',
                      color: '#666',
                      border: '1px solid #666',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </button>
                </div>
              </header>

              {/* Main Content */}
              <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {activeView === 'chat' ? (
                  <>
                    <Suspense fallback={<SimpleChatArea />}>
                      <ChatArea />
                    </Suspense>
                    <Suspense fallback={<SimpleInputArea />}>
                      <InputArea />
                    </Suspense>
                  </>
                ) : activeView === 'settings' ? (
                  <Suspense fallback={<div style={{ padding: '20px' }}>Loading settings...</div>}>
                    <SettingsPanel />
                  </Suspense>
                ) : (
                  <Suspense fallback={<div style={{ padding: '20px' }}>Loading dashboard...</div>}>
                    <Dashboard />
                  </Suspense>
                )}
              </main>
            </div>

            {/* Right Panel */}
            {!rightPanelCollapsed && (
              <div style={{ width: '300px', background: theme === 'dark' ? '#2d3748' : 'white', borderLeft: '1px solid #e2e8f0' }}>
                <Suspense fallback={<div style={{ padding: '20px' }}>Loading panel...</div>}>
                  <Dashboard />
                </Suspense>
              </div>
            )}
          </div>
        </ChatProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;