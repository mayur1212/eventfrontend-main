import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in (you can adjust this to use `localStorage` or `sessionStorage`)
  const isAuthenticated = localStorage.getItem('token'); // Assuming token is stored in localStorage

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login page if not authenticated
  }

  return children; // If authenticated, render the child components (i.e., DashboardLayout)
};

export default ProtectedRoute;
