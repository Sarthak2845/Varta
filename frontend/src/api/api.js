import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
}

export const userAPI = {
  me: () => api.get('/me'),
  getAllUsers: () => api.get('/users'),
}

export const chatAPI = {
  getOrCreateConversation: (receiverId) => api.post('/chat/conversation', { receiverId }),
  getUserConversations: () => api.get('/chat/conversations'),
  sendMessage: (conversationId, text) => api.post('/chat/message', { conversationId, text }),
  getMessages: (conversationId) => api.get(`/chat/messages/${conversationId}`),
}