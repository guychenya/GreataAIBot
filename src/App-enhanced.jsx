import React, { useState, useEffect } from 'react';

// Enhanced app with basic chat functionality
function EnhancedApp() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m GreataAI Bot. I can connect to multiple AI providers including OpenAI, Anthropic, Gemini, and your local Ollama instance. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `Thank you for your message: "${inputValue}". This is a demo response. To get real AI responses, please configure your API keys in the settings panel.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  if (error) {
    return (
      <div style={{
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        background: '#fee',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '500px'
        }}>
          <h1 style={{ color: '#dc3545' }}>Error Loading App</h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {error.message || 'An unknown error occurred'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤖</div>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>Loading GreataAI Bot...</h2>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 2s linear infinite',
            margin: '20px auto'
          }}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#f8f9fa'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '15px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🤖</span>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>GreataAI Bot</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveView('chat')}
              style={{
                background: activeView === 'chat' ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              💬 Chat
            </button>
            <button
              onClick={() => setActiveView('settings')}
              style={{
                background: activeView === 'settings' ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeView === 'chat' ? (
          <>
            {/* Chat Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              maxWidth: '800px',
              margin: '0 auto',
              width: '100%'
            }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: '15px',
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      background: message.type === 'user' ? '#007bff' : '#f8f9fa',
                      color: message.type === 'user' ? 'white' : '#333',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      maxWidth: '70%',
                      border: message.type === 'assistant' ? '1px solid #e9ecef' : 'none'
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div style={{
              padding: '20px',
              borderTop: '1px solid #e9ecef',
              background: 'white'
            }}>
              <form onSubmit={handleSendMessage} style={{
                display: 'flex',
                gap: '10px',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          // Settings Panel
          <div style={{
            flex: 1,
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Settings</h2>

            {/* API Keys Section */}
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '20px'
            }}>
              <h3 style={{ marginBottom: '15px', color: '#495057' }}>API Keys</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Configure your API keys to connect to different AI providers.
              </p>

              {/* Provider List */}
              <div style={{ display: 'grid', gap: '15px' }}>
                {[
                  { id: 'openai', name: 'OpenAI', description: 'For GPT-4 and ChatGPT models' },
                  { id: 'anthropic', name: 'Anthropic', description: 'For Claude models' },
                  { id: 'gemini', name: 'Google Gemini', description: 'Google\'s AI models' },
                  { id: 'ollama', name: 'Ollama', description: 'Local open-source models (http://localhost:11434)' },
                  { id: 'groq', name: 'Groq', description: 'Fast inference API' },
                  { id: 'mistral', name: 'Mistral', description: 'Mistral AI models' }
                ].map(provider => (
                  <div key={provider.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#333' }}>{provider.name}</h4>
                      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                        {provider.description}
                      </p>
                    </div>
                    <button style={{
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}>
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Section */}
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ marginBottom: '15px', color: '#495057' }}>Status</h3>
              <div style={{
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                borderRadius: '5px',
                padding: '15px',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#155724' }}>✅ Application: Running</span>
              </div>
              <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '5px',
                padding: '15px'
              }}>
                <span style={{ color: '#856404' }}>⚠️ AI Providers: Configure API keys to enable</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Error boundary wrapper
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          background: '#fee',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '500px'
          }}>
            <h1 style={{ color: '#dc3545' }}>Something went wrong</h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <EnhancedApp />
    </ErrorBoundary>
  );
}

export default App;