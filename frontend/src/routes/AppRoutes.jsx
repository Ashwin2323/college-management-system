import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Use Navigate for redirect
import { useAuth } from '../hooks/useAuth';

function AppRoutes({ element: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" />} // Use Navigate for redirection
    />
  );
}

export default AppRoutes;
