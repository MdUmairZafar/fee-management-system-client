import React from "react";
import { AuthProvider } from "./AuthContext"; // Use named import for AuthProvider
import LoginPage from "./login";
import User from "./user";
import Report from "./Report";

function App() {
  return (
    // <AuthProvider>
    //   <report/>
    //   {/* <User /> */}
    // </AuthProvider>
    <Report/>
  );
}

export default App;
