import React from "react";
import { Navigate } from "react-router-dom";

// Utility function to check if token exists
const isAuthenticated = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token !== null;
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }
  return children; // Render the child component if authenticated
};

export default ProtectedRoute;
