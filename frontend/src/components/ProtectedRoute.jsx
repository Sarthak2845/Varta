import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') || sessionStorage.getItem('user');
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;