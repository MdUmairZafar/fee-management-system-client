import React from "react";
import { Outlet } from "react-router-dom";
import Table from "../table"; // Import your Sidebar component
import "./UserLayout.css"; // Import the CSS for layout
import User from "../user";


const Layout = () => {
  return (
    <div className="layout-container">
      <Table />
      <div className="main-content">
        <User /> {/* This is where the route-specific components will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
