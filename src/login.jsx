import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./login.css"; // Import the CSS file for styling
import logo from "../src/Screenshot_2024-07-24-20-10-02-365_com.miui.videoplayer.png"; // Updated the logo path
import { AuthContext } from "./AuthContext";
import { setupAxiosInterceptors } from "./axiosConfig";
import axiosInstance from "./axiosConfig";

const LoginPage = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Make the login request to your backend
      const response = await axiosInstance.post("/user/login", {
        email: username, 
        password: password
      });

      // Assuming the response contains the token and user data
      const { token, user } = response.data;

      // Set the token and user in the context
      setToken(token);
      setUser(user);

      // Optionally, save the token to localStorage for persistence
      localStorage.setItem("token", token);

      // Setup axios interceptors
      setupAxiosInterceptors(token);

      // Redirect to the main page (e.g., /users)
      navigate("/users");
    } catch (error) {
      console.error("Login failed:", error);
      // Display an error message to the user
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default LoginPage;
