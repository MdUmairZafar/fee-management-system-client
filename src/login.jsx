import React, { useState, useContext } from "react";
import "./login.css"; // Import the CSS file for styling
import logo from "../src/Screenshot_2024-07-24-20-10-02-365_com.miui.videoplayer.png";
import { AuthContext } from "./AuthContext";
import axios from "axios"; // Import axios

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Update this to username instead of user
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the login request to your backend
      const response = await axios.post("/api/login", { username, password }); // Replace with your API endpoint

      // Assuming the response contains the token and user data
      const { token, user } = response.data;

      // Set the token and user in the context
      setToken(token);
      setUser(user);

      // Optionally, save the token to localStorage or cookies for persistence
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="login-container">
      <div>
        <p>User: {username || "No user logged in"}</p>
      </div>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
