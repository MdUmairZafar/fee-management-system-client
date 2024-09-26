import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './sidebar';
import Challan from '../Challan/challan';
import Report from '../Report/Report';
import User from '../User/user';

function MainLayout() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar remains constant */}
      <SideBar />
      
      {/* This is the main content area */}
      <div style={{ flexGrow: 1 }}>
        <Routes>
          {/* Define routes that will be displayed alongside the sidebar */}
          <Route path="challan" element={<Challan />} />
          <Route path="report" element={<Report />} />
          <Route path="user" element={<User />} />

          {/* Redirect to challan by default */}
          <Route path="/" element={<Navigate to="/challan" />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainLayout;
