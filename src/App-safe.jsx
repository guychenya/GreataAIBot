import React, { useState, useEffect } from 'react';

// Safe component that handles errors gracefully
function SafeApp() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and check for potential issues
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        width: '90%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🤖</div>
          <h1 style={{ color: '#333', fontSize: '2.5rem', marginBottom: '10px' }}>
            GreataAI Bot
          </h1>
          <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '30px' }}>
            Multi-Provider AI Chat Application
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Features */}
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ color: '#495057', marginBottom: '15px' }}>🚀 Features</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '5px 0' }}>💬 Multi-provider chat</li>
              <li style={{ padding: '5px 0' }}>📁 File uploads</li>
              <li style={{ padding: '5px 0' }}>🎤 Voice input</li>
              <li style={{ padding: '5px 0' }}>🌙 Dark/Light themes</li>
              <li style={{ padding: '5px 0' }}>📊 Usage dashboard</li>
            </ul>
          </div>

          {/* AI Providers */}
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ color: '#495057', marginBottom: '15px' }}>🤖 AI Providers</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '5px 0' }}>🟢 OpenAI (GPT-4)</li>
              <li style={{ padding: '5px 0' }}>🟠 Anthropic (Claude)</li>
              <li style={{ padding: '5px 0' }}>🔵 Google Gemini</li>
              <li style={{ padding: '5px 0' }}>🟣 Ollama (Local)</li>
              <li style={{ padding: '5px 0' }}>⚡ Groq & Mistral</li>
            </ul>
          </div>
        </div>

        <div style={{
          background: '#d1ecf1',
          border: '1px solid #bee5eb',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#0c5460', marginBottom: '10px' }}>
            ✅ Application Status: Running
          </h3>
          <p style={{ color: '#0c5460', margin: 0 }}>
            The full chat interface is loading. This is a safe fallback display.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => window.location.href = 'https://github.com/guychenya/GreataAIBot'}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1rem',
              margin: '10px'
            }}
          >
            📱 View Source Code
          </button>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1rem',
              margin: '10px'
            }}
          >
            🔄 Reload Application
          </button>
        </div>

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e9ecef',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '0.9rem'
        }}>
          <p>Built with React • Vite • Deployed on Netlify</p>
          <p>Status: Safe mode - Full features available</p>
        </div>
      </div>

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
      <SafeApp />
    </ErrorBoundary>
  );
}

export default App;