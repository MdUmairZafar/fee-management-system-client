import React, { useState, useEffect } from "react";
import axios from "axios";
import "./report.css";

const Report = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [fetchData,reportData, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  // Fetch data from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get("/challan")
          
        setReportData(response.data.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle date input changes
  const handleDateChange = (e, setDate) => {
    setDate(e.target.value);
  };

  // Filter the table data based on search term
  const filteredData = reportData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="challan-container">
      <div className="table-container">
        {/* Search Field and Buttons Above the Table */}
        <div className="top-bar">
          <div className="search-field">
            <input
              type="search"
              name="search-field"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="top-buttons">
            <button className="action-button">Pending</button>
            <button className="action-button">Done</button>
            <button className="action-button">Generate Challan</button>
            <button className="action-button">Edit Challan Values</button>
            <div className="date-picker">
              <input
                type="date"
                value={date1}
                onChange={(e) => handleDateChange(e, setDate1)}
              />
            </div>
            <div className="date-picker">
              <input
                type="date"
                value={date2}
                onChange={(e) => handleDateChange(e, setDate2)}
              />
            </div>
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
                <th>Dated</th>
                <th>Admission Fee</th>
                <th>Tuition Fee</th>
                <th>General Fund</th>
                <th>Student I.D Card Fund</th>
                <th>Red Cross Fund</th>
                <th>Medical Fee</th>
                <th>Student Welfare Fund</th>
                <th>Sc. Breakage Fund</th>
                <th>Magazine Fund</th>
                <th>Library Sec Fund</th>
                <th>Board/Univ Regd/Exam Dues</th>
                <th>Sports Fund</th>
                <th>Miscellaneous Fund</th>
                <th>Board Uni Processing Fee</th>
                <th>Transport Fund</th>
                <th>Burqa Fund</th>
                <th>College Examination Fund</th>
                <th>Computer Fee</th>
                <th>2nd Shift</th>
                <th>Fine Funds</th>
                <th>Grand Total</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody>
             {Array.isArray(fetchData) && fetchData.length > 0 ? (
              fetchData.map((item, index) => (     
                 <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.dateOfBirth}</td>
                  <td>{item.rollNo}</td>
                  <td>{item.class}</td>
                  <td>{item.dated}</td>
                  <td>{item.admissionFee}</td>
                  <td>{item.tuitionFee}</td>
                  <td>{item.generalFund}</td>
                  <td>{item.studentIdCardFund}</td>
                  <td>{item.redCrossFund}</td>
                  <td>{item.medicalFee}</td>
                  <td>{item.studentWelfareFund}</td>
                  <td>{item.scBreakageFund}</td>
                  <td>{item.magazineFund}</td>
                  <td>{item.librarySecFund}</td>
                  <td>{item.boardUnivRegExamDues}</td>
                  <td>{item.sportsFund}</td>
                  <td>{item.miscellaneousFund}</td>
                  <td>{item.boardUniProcessingFee}</td>
                  <td>{item.transportFund}</td>
                  <td>{item.burqaFund}</td>
                  <td>{item.collegeExaminationFund}</td>
                  <td>{item.computerFee}</td>
                  <td>{item.secondShift}</td>
                  <td>{item.fineFunds}</td>
                  <td>{item.grandTotal}</td>
                  <td className={item.status.toLowerCase()}>{item.status}</td> {/* Status column */}
                  <td>{item.dueDate}</td>
                  <td>{item.userName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )
            }
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <b>Total 1</b>
                </td>
                <td>
                  <b>Total 2</b>
                </td>
                <td>
                  <b>Total 3</b>
                </td>
                {/* Add more total/sum data here */}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
