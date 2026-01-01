import { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { chatAPI } from '../api/api';
import { useAuth } from './authContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  // Initialize socket connection
  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io('http://localhost:3000', {
        withCredentials: true
      });

      newSocket.on('connect', () => console.log('Socket connected:', newSocket.id));
      newSocket.on('connect_error', (err) => console.error('Socket connect error:', err?.message || err));

      newSocket.on('newMessage', (message) => {
        setMessages(prev => [...prev, message]);
      });

      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [isAuthenticated, user]);

  // Start conversation
  const startConversation = async (receiverId) => {
    try {
      const response = await chatAPI.getOrCreateConversation(receiverId);
      // backend returns { convo, message }, so prefer convo and fallback to data
      const conversation = response?.data?.convo || response?.data;
      
      if (!conversation?._id) {
        console.warn('startConversation: conversation missing _id', conversation);
      }

      setActiveConversation(conversation);
      
      if (conversation?._id) {
        const messagesResponse = await chatAPI.getMessages(conversation._id);
        setMessages(messagesResponse.data || []);
      }
      
      return conversation;
    } catch (error) {
      console.error('Error starting conversation:', error);
      setMessages([]);
      throw error;
    }
  };

  // Send message
  const sendMessage = async (text) => {
    if (!activeConversation?._id || !text?.trim()) {
      console.warn('Cannot send message: no active conversation or empty text', { activeConversation, text });
      throw new Error('No active conversation or empty text');
    }

    try {
      const response = await chatAPI.sendMessage(activeConversation._id, text);
      setMessages(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message || error);
      throw error;
    }
  };

  const value = {
    activeConversation,
    messages,
    startConversation,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};