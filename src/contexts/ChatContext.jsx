import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveConversations, loadConversations } from '../services/storageService';
import { sendMessage } from '../services/apiService';
import { useSettings } from './SettingsContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { settings } = useSettings();
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Load conversations from storage on mount
  useEffect(() => {
    const loadedConversations = loadConversations();
    if (loadedConversations) {
      setConversations(loadedConversations);
    }
  }, []);

  // Save conversations whenever they change
  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  const createNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
      archived: false
    };

    setConversations(prev => [...prev, newConversation]);
    setActiveConversationId(newConversation.id);
  };

  const deleteConversation = (id) => {
    setConversations(prev => prev.filter(conversation => conversation.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const updateConversationTitle = (id, newTitle) => {
    setConversations(prev => prev.map(conversation => 
      conversation.id === id ? { ...conversation, title: newTitle } : conversation
    ));
  };

  const addMessage = async (message) => {
    if (!activeConversationId) return;

    // Send message to LLM provider
    try {
      setIsTyping(true);
      const response = await sendMessage(
        message.content,
        settings.defaultProviderId,
        settings.apiKeys
      );

      message.content = response.content;
    } catch (error) {
      console.error('Error sending message:', error);
      message.content = `Error: ${error.message || 'Failed to send message'}`;
    } finally {
      setIsTyping(false);
    }

    setConversations(prev => prev.map(conversation => {
      if (conversation.id === activeConversationId) {
        return {
          ...conversation,
          messages: [...conversation.messages, message],
        };
      }
      return conversation;
    }));
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-area');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 0);
  };

  const activeConversation = conversations.find(conversation => conversation.id === activeConversationId);

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      activeConversationId,
      isTyping,
      setActiveConversationId,
      createNewConversation,
      deleteConversation,
      updateConversationTitle,
      addMessage,
      setIsTyping,
      scrollToBottom
    }}>
      {children}
    </ChatContext.Provider>
  );
};
