import React from "react";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./login";
import User from "./user";
import Report from "./Report";
import Table from "./table";
import ChallanDataModal from "./challanDataModal";
import Challan from "./challan";
import UserModal from "./userModal";

function App() {
  return (
    // <AuthProvider>
    //   <report/>
    //   {/* <User /> */}
    // </AuthProvider>
    <div>
      <Table />
      <UserModal buttonName={"Create User"} />
    </div>
  );
}

export default App;
