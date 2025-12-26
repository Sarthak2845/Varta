import { createContext, useContext, useState } from 'react';
import ErrorModal from '../components/ErrorModal';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within ErrorProvider');
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showError = (errorMessage) => {
    setError(errorMessage);
    setIsModalOpen(true);
  };

  const hideError = () => {
    setError(null);
    setIsModalOpen(false);
  };

  const value = {
    showError,
    hideError,
    error
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
      <ErrorModal 
        isOpen={isModalOpen} 
        onClose={hideError} 
        error={error} 
      />
    </ErrorContext.Provider>
  );
};