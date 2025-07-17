// API Service for handling communication with LLM providers
import { createClient } from '@supabase/supabase-js';

// Cache for storing API clients
const apiClients = {};

// Initialize API connections based on provider
const initializeClient = (provider, apiKey) => {
  const providerLower = provider.toLowerCase();
  
  switch (providerLower) {
    case 'supabase':
      // Extract project URL and anon key from the API key (format: url|anonKey)
      const [projectUrl, anonKey] = apiKey.split('|');
      if (!projectUrl || !anonKey) {
        throw new Error('Invalid Supabase API key format. Expected: projectUrl|anonKey');
      }
      return createClient(projectUrl, anonKey);
      
    case 'openai':
    case 'anthropic':
    case 'gemini':
    case 'ollama':
      // Real Ollama implementation for local instance
      return {
        provider: providerLower,
        apiKey,
        baseUrl: apiKey || 'http://localhost:11434', // Use apiKey as base URL or default
        chat: {
          completions: async (params) => {
            const baseUrl = apiKey || 'http://localhost:11434';
            const url = `${baseUrl}/api/generate`;
            
            try {
              const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  model: params.model || 'llama3',
                  prompt: params.messages[params.messages.length - 1].content,
                  stream: false,
                  options: {
                    temperature: params.temperature || 0.7,
                    top_p: params.top_p || 0.9,
                    num_predict: params.max_tokens || 1000,
                  }
                })
              });

              if (!response.ok) {
                throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
              }

              const data = await response.json();
              
              return {
                choices: [{
                  message: {
                    content: data.response || 'No response from Ollama'
                  }
                }]
              };
            } catch (error) {
              console.error('Ollama API error:', error);
              throw new Error(`Failed to connect to Ollama: ${error.message}`);
            }
          }
        }
      };
      
    case 'groq':
    case 'mistral':
      // For demonstration, we'll just return a mock client
      // In a real implementation, you would initialize the specific client library
      return {
        provider: providerLower,
        apiKey,
        chat: {
          completions: async (params) => {
            // Simulate API call with different response times based on provider
            const delay = {
              'openai': 1000,
              'anthropic': 1500,
              'gemini': 800,
              'groq': 500,
              'mistral': 700
            }[providerLower] || 1000;
            
            await new Promise(resolve => setTimeout(resolve, delay));
            
            return {
              choices: [{
                message: {
                  content: `This is a simulated response from ${provider} API. In a real implementation, this would connect to the actual ${provider} API and return a genuine response.\n\nYour prompt was: "${params.messages[params.messages.length - 1].content}"`
                }
              }]
            };
          }
        }
      };
      
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};

// Get or create a client for a specific provider
export const getApiClient = (providerId, apiKeys) => {
  if (!providerId || !apiKeys || !apiKeys[providerId]) {
    throw new Error('Provider ID or API key not found');
  }
  
  if (!apiClients[providerId]) {
    const { provider, value: apiKey } = apiKeys[providerId];
    apiClients[providerId] = initializeClient(provider || apiKeys[providerId].name, apiKey);
  }
  
  return apiClients[providerId];
};

// Test connection to a provider
export const testApiConnection = async (provider, apiKey) => {
  try {
    const client = initializeClient(provider, apiKey);
    
    // For Ollama, test the actual connection
    if (provider.toLowerCase() === 'ollama') {
      const baseUrl = apiKey || 'http://localhost:11434';
      const response = await fetch(`${baseUrl}/api/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Ollama server not reachable at ${baseUrl}`);
      }
      
      const data = await response.json();
      const modelCount = data.models ? data.models.length : 0;
      
      return { 
        success: true, 
        message: `Connected to Ollama at ${baseUrl}. Found ${modelCount} models.`,
        models: data.models || []
      };
    }
    
    // For other providers, simulate connection (to be implemented with real APIs later)
    const isSuccessful = Math.random() > 0.2;
    
    if (!isSuccessful) {
      throw new Error('Connection failed');
    }
    
    return { success: true, message: 'Connection successful' };
  } catch (error) {
    return { success: false, message: error.message || 'Connection failed' };
  }
};

// Send a message to the LLM provider
export const sendMessage = async (message, providerId, apiKeys, model = 'default') => {
  try {
    const client = getApiClient(providerId, apiKeys);
    
    // Format the message according to the provider's requirements
    const formattedMessage = {
      role: 'user',
      content: message
    };
    
    // Different providers have different APIs, this is simplified for demonstration
    let response;
    
    if (client.provider === 'supabase') {
      // Handle Supabase differently
      response = await client.functions.invoke('ai-chat', {
        body: { message: formattedMessage.content, model }
      });
      return {
        content: response.data?.content || 'No response from Supabase function',
        provider: 'supabase'
      };
    } else {
      // Generic handling for other providers
      response = await client.chat.completions({
        model: model === 'default' ? getDefaultModel(client.provider) : model,
        messages: [formattedMessage],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      return {
        content: response.choices[0].message.content,
        provider: client.provider
      };
    }
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      content: `Error: ${error.message || 'Failed to communicate with the provider'}`,
      error: true,
      provider: providerId
    };
  }
};

// Helper function to get default model name based on provider
const getDefaultModel = (provider) => {
  const defaultModels = {
    'openai': 'gpt-4',
    'anthropic': 'claude-3-opus',
    'gemini': 'gemini-pro',
    'ollama': 'llama3.2',
    'groq': 'llama3-70b-8192',
    'mistral': 'mistral-large'
  };
  
  return defaultModels[provider] || 'default';
};