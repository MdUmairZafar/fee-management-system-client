import React from "react";
import SideBar from "../Utils/sidebar"; // Import your Sidebar component
import "../layout.css"; // Import the CSS for layout
import Report from "./Report";
import Challan from "../Challan/challan";
import ChallanModal from "../Challan/ChallanModals/challanModal";

const Layout = () => {
  return (
    <div className="layout-container">
      <SideBar />
      <div className="main-content">
        <Report />{" "}
        {/* This is where the route-specific components will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
