// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/authContext'; // Correct import path

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('AuthContext:', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
