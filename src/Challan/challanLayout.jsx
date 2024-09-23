import React from "react";
import { Outlet } from "react-router-dom";
import Table from "../Utils/table"; // Import your Sidebar component
import "../layout.css"; // Import the CSS for layout
import Challan from "./challan";


const Layout = () => {
  return (
    <div className="layout-container">
      <Table />
      <div className="main-content">
        <Challan /> {/* This is where the route-specific components will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
