import React from "react";
import { Outlet } from "react-router-dom";
import Table from "./table"; // Import your Sidebar component
import "./UserLayout.css"; // Import the CSS for layout
import Report from "./Report";


const Layout = () => {
  return (
    <div className="layout-container">
      <Table />
      <div className="main-content">
        <Report /> {/* This is where the route-specific components will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
