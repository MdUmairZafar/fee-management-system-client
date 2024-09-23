import React from "react";
import { AuthProvider } from "./Utils/AuthContext";
import LoginPage from "./Utils/login";
import User from "./User/user";
import Report from "./Report/Report";
import Table from "./Utils/table";
import ChallanDataModal from "./Challan/ChallanModals/challanDataModal";
import Challan from "./Challan/challan";
// import Layout from "./User/UserLayout";
import Layout from "./Report/reportLayout";

function App() {
  return (
    <AuthProvider>
      {/* <Router>
        <Routes> */}
      {/* <Route path="/" element={<LoginPage />} /> */}
      {/* <Route path="/" element={<Layout />} /> */}

      {/* Add other routes here */}
      <Layout />
      {/* </Routes>
      </Router> */}
    </AuthProvider>
  );
}

export default App;
