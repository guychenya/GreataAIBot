import React, { useState, useEffect } from 'react';

// Exact replica of the original AI Assistant UI
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeView, setActiveView] = useState('chat');
  const [activeTab, setActiveTab] = useState('Chat');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      user: 'AI Assistant',
      content: `Welcome to AI Assistant

I'm your AI assistant, designed to help you with a variety of tasks. Here are some things I can do for you:

• Answer questions and provide information
• Help with writing and creative tasks  
• Assist with code and programming
• Analyze data and provide insights

How can I help you today?`,
      timestamp: '02:16 PM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      user: 'You',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    const currentInput = inputValue;
    setInputValue('');

    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        type: 'assistant',
        user: 'AI Assistant',
        content: `Regarding Your Question

You asked: "${currentInput}"

Analysis

This is a simulated AI response. In a real implementation, this would connect to an actual AI model API that would generate a thoughtful and helpful response based on your input.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  if (!isLoaded) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1a202c',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#e2e8f0'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🤖</div>
          <h2 style={{ color: '#e2e8f0', marginBottom: '20px' }}>Loading AI Assistant...</h2>
          <div style={{
            border: '3px solid #2d3748',
            borderTop: '3px solid #4299e1',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#1a202c',
      color: '#e2e8f0'
    }}>
      {/* Left Sidebar */}
      {!sidebarCollapsed && (
        <div style={{
          width: '280px',
          background: '#2d3748',
          borderRight: '1px solid #4a5568',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Sidebar Header */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #4a5568'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#4299e1'
              }}>
                AI Assistant
              </h2>
              <button
                onClick={() => setSidebarCollapsed(true)}
                style={{
                  marginLeft: 'auto',
                  background: 'none',
                  border: '1px solid #4a5568',
                  borderRadius: '6px',
                  padding: '8px',
                  color: '#a0aec0',
                  cursor: 'pointer'
                }}
              >
                &lt;
              </button>
            </div>
            
            <button style={{
              width: '100%',
              background: '#4299e1',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span>+</span> New Chat
            </button>
          </div>

          {/* Search */}
          <div style={{ padding: '16px' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                position: 'absolute',
                left: '12px',
                color: '#a0aec0',
                fontSize: '0.9rem'
              }}>🔍</span>
              <input
                type="text"
                placeholder="Search conversations..."
                style={{
                  width: '100%',
                  background: '#1a202c',
                  border: '1px solid #4a5568',
                  borderRadius: '6px',
                  padding: '10px 10px 10px 36px',
                  color: '#e2e8f0',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* AI Model Selector */}
          <div style={{ padding: '0 16px 16px' }}>
            <div style={{ marginBottom: '8px', fontSize: '0.8rem', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              AI MODEL
            </div>
            <div style={{
              background: '#1a202c',
              border: '1px solid #4a5568',
              borderRadius: '6px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: '#fbbf24',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}>⚠</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>GPT-4</div>
                <div style={{ fontSize: '0.8rem', color: '#a0aec0' }}>OpenAI</div>
              </div>
              <span style={{ color: '#a0aec0' }}>▼</span>
            </div>
          </div>

          {/* Conversation List */}
          <div style={{ flex: 1, padding: '0 16px' }}>
            <div style={{
              background: '#4299e1',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '8px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span>💬</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Welcome Chat</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#bee3f8' }}>Today</div>
            </div>

            <div style={{
              background: '#2d3748',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '8px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span>💬</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>New Chat</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#a0aec0' }}>Today</div>
            </div>

            <div style={{
              background: '#2d3748',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '8px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span>💬</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Key KPIs for your dashboa...</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#a0aec0' }}>Today</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{
          background: '#2d3748',
          borderBottom: '1px solid #4a5568',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                style={{
                  background: 'none',
                  border: '1px solid #4a5568',
                  borderRadius: '6px',
                  padding: '8px',
                  color: '#a0aec0',
                  cursor: 'pointer'
                }}
              >
                AI Assistant
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', background: '#1a202c', borderRadius: '8px', padding: '4px' }}>
              <button
                onClick={() => setActiveTab('Chat')}
                style={{
                  background: activeTab === 'Chat' ? '#4299e1' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  color: activeTab === 'Chat' ? 'white' : '#a0aec0',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('History')}
                style={{
                  background: activeTab === 'History' ? '#4299e1' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  color: activeTab === 'History' ? 'white' : '#a0aec0',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                📋 History
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#a0aec0',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                📊 Dashboard
              </button>
              <button
                onClick={() => setSettingsOpen(true)}
                style={{
                  background: settingsOpen ? '#4299e1' : 'none',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: settingsOpen ? 'white' : '#4299e1',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                ⚙️ Settings
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#a0aec0',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}>
                ☀️
              </button>
            </div>
          </div>
        </header>

        {/* Settings Panel Overlay */}
        {settingsOpen && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              width: '90%',
              maxWidth: '1200px',
              height: '90%',
              background: '#1a202c',
              borderRadius: '12px',
              display: 'flex',
              overflow: 'hidden'
            }}>
              {/* Settings Sidebar */}
              <div style={{
                width: '240px',
                background: '#2d3748',
                borderRight: '1px solid #4a5568',
                padding: '24px 0'
              }}>
                <div style={{
                  padding: '0 24px 24px',
                  borderBottom: '1px solid #4a5568',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Settings</h2>
                  <button
                    onClick={() => setSettingsOpen(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#a0aec0',
                      cursor: 'pointer',
                      fontSize: '1.5rem'
                    }}
                  >
                    ×
                  </button>
                </div>

                <div style={{ padding: '24px 0' }}>
                  {[
                    { id: 'general', icon: '⚙️', label: 'General' },
                    { id: 'appearance', icon: '🎨', label: 'Appearance' },
                    { id: 'privacy', icon: '🔒', label: 'Privacy' },
                    { id: 'notifications', icon: '🔔', label: 'Notifications' },
                    { id: 'advanced', icon: '🔧', label: 'Advanced' },
                    { id: 'apikeys', icon: '🔑', label: 'API Keys' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSettingsTab(tab.id)}
                      style={{
                        width: '100%',
                        background: activeSettingsTab === tab.id ? '#4299e1' : 'transparent',
                        border: 'none',
                        padding: '12px 24px',
                        color: activeSettingsTab === tab.id ? 'white' : '#a0aec0',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Content */}
              <div style={{ flex: 1, padding: '32px' }}>
                {activeSettingsTab === 'apikeys' && (
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: '600' }}>API Keys Management</h3>
                    <p style={{ margin: '0 0 32px 0', color: '#a0aec0' }}>Manage your API keys for different AI providers. Set a default provider for your chats.</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Provider API Keys</h4>
                      <button style={{
                        background: '#4299e1',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        + Add New API Key
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { id: 'openai', name: 'OpenAI', desc: 'For ChatGPT and GPT-4 models', color: '#10b981', keys: '1 key' },
                        { id: 'anthropic', name: 'Anthropic', desc: 'For Claude models', color: '#f59e0b', keys: null },
                        { id: 'gemini', name: 'Gemini', desc: 'Google\'s AI models', color: '#3b82f6', keys: '1 key', default: true },
                        { id: 'ollama', name: 'Ollama', desc: 'Local open-source models', color: '#8b5cf6', keys: null },
                        { id: 'groq', name: 'Groq', desc: 'Fast inference API', color: '#ef4444', keys: '1 key' },
                        { id: 'mistral', name: 'Mistral', desc: 'Mistral AI models', color: '#06b6d4', keys: null },
                        { id: 'supabase', name: 'Supabase', desc: 'Format: projectUrl|anonKey', color: '#10b981', keys: null }
                      ].map(provider => (
                        <div key={provider.id} style={{
                          background: '#2d3748',
                          border: '1px solid #4a5568',
                          borderRadius: '12px',
                          padding: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
                              background: provider.color,
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '1.2rem',
                              fontWeight: 'bold'
                            }}>
                              {provider.name.charAt(0)}
                            </div>
                            <div>
                              <h5 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: '600' }}>{provider.name}</h5>
                              <p style={{ margin: 0, color: '#a0aec0', fontSize: '0.9rem' }}>{provider.desc}</p>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {provider.keys && (
                              <span style={{ 
                                fontSize: '0.9rem', 
                                color: '#a0aec0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}>
                                {provider.keys}
                                {provider.default && (
                                  <span style={{
                                    background: '#4299e1',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}>
                                    ⭐ Default
                                  </span>
                                )}
                              </span>
                            )}
                            <button style={{
                              background: provider.keys ? 'transparent' : '#4299e1',
                              border: provider.keys ? '1px solid #4a5568' : 'none',
                              borderRadius: '6px',
                              padding: '8px 16px',
                              color: provider.keys ? '#4299e1' : 'white',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}>
                              {provider.keys ? '+ Add Key' : '+ Add Key'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeSettingsTab === 'general' && (
                  <div>
                    <h3 style={{ margin: '0 0 32px 0', fontSize: '1.5rem', fontWeight: '600' }}>General</h3>
                    {/* General settings content would go here */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          background: '#1a202c'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: message.type === 'assistant' ? '#10b981' : '#4299e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {message.type === 'assistant' ? 'AI' : 'Y'}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{message.user}</span>
                    <span style={{ color: '#a0aec0', fontSize: '0.8rem' }}>{message.timestamp}</span>
                  </div>
                  
                  <div style={{
                    background: '#2d3748',
                    borderRadius: '12px',
                    padding: '16px',
                    color: '#e2e8f0',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {message.content}
                  </div>
                  
                  {message.type === 'assistant' && (
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginTop: '12px'
                    }}>
                      <button style={{
                        background: 'none',
                        border: '1px solid #4a5568',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        color: '#a0aec0',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}>👍</button>
                      <button style={{
                        background: 'none',
                        border: '1px solid #4a5568',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        color: '#a0aec0',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}>👎</button>
                      <button style={{
                        background: 'none',
                        border: '1px solid #4a5568',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        color: '#a0aec0',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}>📋</button>
                      <button style={{
                        background: 'none',
                        border: '1px solid #4a5568',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        color: '#a0aec0',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}>🔄</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={{
          background: '#2d3748',
          borderTop: '1px solid #4a5568',
          padding: '20px'
        }}>
          <form onSubmit={handleSendMessage}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#1a202c',
              borderRadius: '12px',
              padding: '4px',
              border: '1px solid #4a5568'
            }}>
              <button type="button" style={{
                background: 'none',
                border: 'none',
                padding: '12px',
                color: '#a0aec0',
                cursor: 'pointer'
              }}>
                📎
              </button>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  padding: '12px 8px',
                  color: '#e2e8f0',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              
              <button type="button" style={{
                background: 'none',
                border: 'none',
                padding: '12px',
                color: '#a0aec0',
                cursor: 'pointer'
              }}>
                🎤
              </button>
            </div>
          </form>
          
          <div style={{
            textAlign: 'center',
            marginTop: '12px',
            fontSize: '0.8rem',
            color: '#a0aec0'
          }}>
            AI can make mistakes. Consider checking important information.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;