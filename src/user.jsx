import React, { useState } from "react";
import "./challan.css"; // Import the CSS file for styling

const User = () => {
  return (
    <div className="challan-container">
      <div className="table-container">
        {/* Search Field and Buttons Above the Table */}
        <div className="top-bar"></div>
        <div className="top-buttons">
          <button className="action-button">Edit Challan Values</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>D/O</th>
              <th>Roll No</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
