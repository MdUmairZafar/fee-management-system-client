import React from "react";
import { AuthProvider } from "./AuthContext"; // Use named import for AuthProvider
import LoginPage from "./login";
import User from "./user";

function App() {
  return (
    <AuthProvider>
      <LoginPage />
      {/* <User /> */}
    </AuthProvider>
  );
}

export default App;
