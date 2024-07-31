import React, { useState } from "react";
import "./challan.css"; // Import the CSS file for styling

const Challan = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  return (
    <div>
      <div className="table-container">
        {/* Buttons Above the Table */}
        <div className="search-feild">
          <input type="search" name="search-feild" id="" />
        </div>
        <div className="top-buttons">
          <button className="action-button">Pending</button>
          <button className="action-button">Done</button>
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Serial no</th>
                <th>Name</th>
                <th>D/O</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Dated </th>
                <th>Admisson Fee </th>
                <th>Tution Fee </th>
                <th> General Fund</th>
                <th> Student I.D Card Fund</th>
                <th> Red Cross Fund </th>
                <th> Medical Fee </th>
                <th> Student Welfare Fund </th>
                <th>Sc. Breakage Fund </th>
                <th> Magazine Fund </th>
                <th>Libray Sec Fund </th>
                <th>Board/Univ Regd/Exam Dues </th>
                <th>Sports Fund </th>
                <th> Micellinance Fund </th>
                <th> Board Uni Processing Fee </th>
                <th>Transport Fund </th>
                <th>Burqa Fund </th>
                <th>College Examination Fund </th>
                <th>Computer Fee </th>
                <th>2nd-Shifr </th>
                <th>Fine FUns </th>
                <th>Grand Total</th>
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
            <button className="action-button">Generate Challan</button>
            <button className="action-button">Edit Challan Values</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challan;
