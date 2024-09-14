import React from "react";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./login";
import User from "./user";
import Report from "./Report";
import Table from "./table";
import ChallanDataModal from "./challanDataModal";
import Challan from "./challan";
import Layout from "./reportLayout";

function App() {
  return (
    <AuthProvider>
      {/* <Router>
        <Routes> */}
          {/* <Route path="/" element={<LoginPage />} /> */}
          {/* <Route path="/" element={<Layout />} /> */}
          
          {/* Add other routes here */}
          <Layout/>
        {/* </Routes>
      </Router> */}
    </AuthProvider>

  );
}

export default App;
