
import React, { useState, useEffect, useContext } from "react";
import "./challan.css"; // Import the CSS file for styling
import axiosInstance, { setupAxiosInterceptors } from "./axiosConfig";
import { AuthContext } from "./AuthContext";


const Challan = () => {
  const { token } = useContext(AuthContext); // Retrieve token from context
  const [fetchChallanData, setFetchedUserData] = useState([]); // State for fetched challan data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [page, setPage] = useState(1); // State to track current page
  const [hasMore, setHasMore] = useState(true);
  const [nameQuery, setNameQuery] = useState(""); // State to track search query for name
  const [rollNoQuery, setRollNoQuery] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");
  

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
        const response = await axiosInstance.get(
          `/challan?page=${page}&studentName=${nameQuery}`
        ); // Update endpoint with search and pagination
        console.log("Fetched Challan Data:", response.data.data);// Inspect the data structure
        
        setFetchedUserData((prevData) =>
          page === 1 ? response.data.data : [...prevData, ...response.data.data]
        );

        // Check if there's more data to load
        setHasMore(response.data.data.length > 0);
      } catch (error) {
        console.error("Error fetching challan data:", error);
        setError("Failed to fetch challan data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    // useEffect(() => {
    //   if (hasMore && !loading) {
    //     fetchChallanData();
    //   }
    // }, [page]);
  

    // if (token) {
      fetchChallanData();
    // }
  }, [page, nameQuery, rollNoQuery]); // Fetch data when the token is available

  // Handle input change for the search field
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Trigger search on Enter key
  const handleSearch = () => {
    setNameQuery(searchTerm); // Update the state to search by name or roll number
    setRollNoQuery(searchTerm);
    setPage(1); // Reset page to 1 when performing a new search
  };

  // Capture Enter key press to trigger search
  const handleKeyDown = (e) => {
    
      handleSearch();
    
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1); // Load the next page
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <input type="search" name="search-field" placeholder="Search..." value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown} />
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
              {Array.isArray(fetchChallanData) && fetchChallanData.length > 0 ? (
                fetchChallanData.map((challan, index) => (
                  <tr key={challan._id}>
                    <td>{index + 1}</td>
                    <td>{challan.name}</td>
                    <td>{challan.dob }</td>
                    <td>{challan.rollNo }</td>
                    <td>{challan.class }</td>
                    <td>{challan.dated }</td>
                    <td>{challan.admissionFee }</td>
                    <td>{challan.tuitionFee }</td>
                    <td>{challan.generalFund }</td>
                    <td>{challan.studentIDCardFund }</td>
                    <td>{challan.redCrossFund }</td>
                    <td>{challan.medicalFee }</td>
                    <td>{challan.studentWelfareFund }</td>
                    <td>{challan.scBreakageFund }</td>
                    <td>{challan.magazineFund }</td>
                    <td>{challan.librarySecFund }</td>
                    <td>{challan.boardUnivRegdExamDues }</td>
                    <td>{challan.sportsFund }</td>
                    <td>{challan.miscellaneousFund }</td>
                    <td>{challan.boardUniProcessingFee }</td>
                    <td>{challan.transportFund }</td>
                    <td>{challan.burqaFund }</td>
                    <td>{challan.collegeExaminationFund }</td>
                    <td>{challan.computerFee }</td>
                    <td>{challan.secondShift }</td>
                    <td>{challan.fineFunds }</td>
                    <td>{challan.grandTotal }</td>
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
