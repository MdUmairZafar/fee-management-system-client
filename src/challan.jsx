import React from "react";
import "./challan.css"; // Import the CSS file for styling
const Challan = () => {
  return (
    <div>
      <div className="table-container">
        {/* Buttons Above the Table */}
        <div className="search-feild">
          <input type="search" name="search-feild" id="" />
        </div>
        <div className="top-buttons">
          <button className="action-button">Add</button>
          <button className="action-button">Edit</button>
          <button className="action-button">Delete</button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john@example.com</td>
                <td>28</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>jane@example.com</td>
                <td>34</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Mike Johnson</td>
                <td>mike@example.com</td>
                <td>45</td>
              </tr>
            </tbody>
          </table>

          {/* Buttons on the Right Side */}
          <div className="side-buttons">
            <button className="action-button">Export</button>
            <button className="action-button">Import</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challan;
