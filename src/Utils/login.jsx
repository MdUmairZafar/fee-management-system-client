import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../college-logo.png"; // Updated the logo path
import { setupAxiosInterceptors } from "./axiosConfig";
import axiosInstance from "./axiosConfig";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    // Set body styles specifically for the login page
    document.body.style.margin = "0"; // Example: remove body margin if any
    document.body.style.padding = "0"; // Example: remove body padding if any

    // Cleanup styles when the component is unmounted
    return () => {
      document.body.style.margin = ""; // Reset to default
      document.body.style.padding = ""; // Reset to default
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  useEffect(() => {
    console.log("Token: ", token);
    console.log("User: ", user);
    // Redirect to the main page if the user is already logged in
    if (token && user) {
      navigate("/challan", { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Make the login request to your backend
      const response = await axiosInstance.post("/user/login", {
        email: username,
        password: password,
      });

      // Assuming the response contains the token and user data
      const { token, user } = response.data;

      // Optionally, save the token to localStorage for persistence
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      // Setup axios interceptors
      setupAxiosInterceptors(token);

      // Redirect to the main page (e.g., /users)
      navigate("/challan", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      // Display an error message to the user
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  // Inline style objects
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
      backgroundColor: "#f7f7f7",
    },
    loginContainer: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      width: "300px",
      textAlign: "center",
    },
    logo: {
      width: "100px",
      marginBottom: "1.5rem",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#9b59b6",
      border: "none",
      color: "white",
      fontSize: "1rem",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#8e44ad",
    },
    errorMessage: {
      color: "red",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        <div className="logo">
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Login
          </button>
          {error && <p style={styles.errorMessage}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
