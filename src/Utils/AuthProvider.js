import React, { useState } from "react";
import AuthContext from "./AuthContext";
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // You can add logic to set the token here, e.g., from localStorage or an API call

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
