import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Utils/sidebar"; // Import your Sidebar component
import "../layout.css"; // Import the CSS for layout
import Challan from "./challan";

const Layout = () => {
  return (
    <div className="layout-container">
      <SideBar />
      <div className="main-content">
        <Challan />
      </div>
    </div>
  );
};

export default Layout;
