import React from "react";
import { AuthProvider } from "./AuthContext"; // Use named import for AuthProvider
import LoginPage from "./login";
import User from "./user";
import Report from "./Report";
import Table from "./table";

function App() {
  return (
    // <AuthProvider>
    //   <report/>
    //   {/* <User /> */}
    // </AuthProvider>
    <div>
      <Table/>
      <Report/>
    </div>
  );
}

export default App;
