
import React, { useState, useEffect, useContext } from "react";
import "./challan.css"; // Import the CSS file for styling
import axiosInstance, { setupAxiosInterceptors } from "./axiosConfig";
import { AuthContext } from "./AuthContext";


const Challan = () => {
  const { token } = useContext(AuthContext); // Retrieve token from context
  const [challanData, setChallanData] = useState([]); // State for fetched challan data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  // Setup Axios interceptors to include the token in requests
  useEffect(() => {
    if (token) {
      setupAxiosInterceptors(token); // Configure Axios with token if available
    }
  }, [token]);

  // Fetch challan data from the backend
  useEffect(() => {
    const fetchChallanData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/challan"); // Replace with your actual API endpoint
        console.log("Fetched Challan Data:", response.data); // Inspect the data structure
        setChallanData(response.data.challans || []); // Adjust based on the actual response structure
      } catch (error) {
        console.error("Error fetching challan data:", error);
        setError("Failed to fetch challan data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchChallanData();
    }
  }, [token]); // Fetch data when the token is available

  // Handle date changes
  const handleDateChange = (e, setDate) => {
    setDate(e.target.value);
  };

  // Display loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  // Render the challan table with fetched data
  return (
    <div className="challan-container">
      <div className="table-container">
        {/* Search Field and Buttons Above the Table */}
        <div className="top-bar">
          <div className="search-field">
            <input type="search" name="search-field" placeholder="Search..." />
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
              </tr>
            </thead>
            <tbody>
              {Array.isArray(challanData) && challanData.length > 0 ? (
                challanData.map((challan, index) => (
                  <tr key={challan._id}>
                    <td>{index + 1}</td>
                    <td>{challan.name}</td>
                    <td>{challan.dob || "N/A"}</td>
                    <td>{challan.rollNo || "N/A"}</td>
                    <td>{challan.class || "N/A"}</td>
                    <td>{challan.dated || "N/A"}</td>
                    <td>{challan.admissionFee || "N/A"}</td>
                    <td>{challan.tuitionFee || "N/A"}</td>
                    <td>{challan.generalFund || "N/A"}</td>
                    <td>{challan.studentIDCardFund || "N/A"}</td>
                    <td>{challan.redCrossFund || "N/A"}</td>
                    <td>{challan.medicalFee || "N/A"}</td>
                    <td>{challan.studentWelfareFund || "N/A"}</td>
                    <td>{challan.scBreakageFund || "N/A"}</td>
                    <td>{challan.magazineFund || "N/A"}</td>
                    <td>{challan.librarySecFund || "N/A"}</td>
                    <td>{challan.boardUnivRegdExamDues || "N/A"}</td>
                    <td>{challan.sportsFund || "N/A"}</td>
                    <td>{challan.miscellaneousFund || "N/A"}</td>
                    <td>{challan.boardUniProcessingFee || "N/A"}</td>
                    <td>{challan.transportFund || "N/A"}</td>
                    <td>{challan.burqaFund || "N/A"}</td>
                    <td>{challan.collegeExaminationFund || "N/A"}</td>
                    <td>{challan.computerFee || "N/A"}</td>
                    <td>{challan.secondShift || "N/A"}</td>
                    <td>{challan.fineFunds || "N/A"}</td>
                    <td>{challan.grandTotal || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="27">No challan data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Challan;
