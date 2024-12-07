import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Corrected import for jwt-decode

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('authToken');
  const isAuthenticated = token && !isTokenExpired(token);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  };

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};
console.log('Token:', localStorage.getItem('token'));

export default PrivateRoute;
