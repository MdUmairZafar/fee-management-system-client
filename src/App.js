import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Utils/login";
import MainLayout from "./Utils/MainLayout";
import { setupAxiosInterceptors } from "./Utils/axiosConfig";
import ProtectedRoute from "./Utils/protectedRoute"; // Import the protected route

function App() {
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      // Setup axios interceptors
      setupAxiosInterceptors(token);
    }
  }, []); // Add empty dependency array to only run once on mount

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected route that wraps the MainLayout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />

        {/* Redirect to login if trying to access an invalid route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
