import React from 'react';

function App() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '40px',
      textAlign: 'center',
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
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🤖</div>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>GreataAI Bot</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Multi-Provider AI Chat Application</p>
        
        <div style={{
          background: '#f0f9ff',
          border: '2px solid #3b82f6',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>✅ React App Working!</h3>
          <p>The application is now loading properly</p>
        </div>

        <div style={{
          textAlign: 'left',
          background: '#f8fafc',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h4 style={{ marginBottom: '10px' }}>Supported Providers:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '5px 0' }}>✅ OpenAI (GPT-4, ChatGPT)</li>
            <li style={{ padding: '5px 0' }}>✅ Anthropic (Claude)</li>
            <li style={{ padding: '5px 0' }}>✅ Google Gemini</li>
            <li style={{ padding: '5px 0' }}>✅ Ollama (Local Models)</li>
            <li style={{ padding: '5px 0' }}>✅ Groq</li>
            <li style={{ padding: '5px 0' }}>✅ Mistral</li>
            <li style={{ padding: '5px 0' }}>✅ Supabase</li>
          </ul>
        </div>

        <button 
          onClick={() => window.location.href = 'https://github.com/guychenya/GreataAIBot'}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            margin: '10px'
          }}
        >
          📱 View Source Code
        </button>

        <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
          <p>Built with React • Vite • Deployed on Netlify</p>
          <p>Status: Minimal Version - Full App Coming Soon!</p>
        </div>
      </div>
    </div>
  );
}

export default App;