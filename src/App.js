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

function App() {
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      // Setup axios interceptors
      setupAxiosInterceptors(token);
    }
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Main layout that wraps all screens with sidebar */}
        <Route path="/*" element={<MainLayout />} />
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
