import React, { useState, useEffect, useContext } from "react";
import "./challan.css"; // Import the CSS file for styling
import axiosInstance from "./axiosConfig";
import { AuthContext } from "./AuthContext";
import ChallanModal from "./challanModal";
import ChallanDataModal from "./challanDataModal";

const Challan = () => {
  const { token } = useContext(AuthContext); // Retrieve token from context
  const [fetchChallanData, setFetchedUserData] = useState([]); // State for fetched challan data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date1, setDate1] = useState(""); // Start date
  const [date2, setDate2] = useState(""); // End date
  const [page, setPage] = useState(1); // State to track current page
  const [totalPages, setTotalPages] = useState(1); // State to track total number of pages
  const [nameQuery, setNameQuery] = useState(""); // State to track search query
  const [searchTerm, setSearchTerm] = useState(""); // State for input value
  const [searchType, setSearchType] = useState("name"); // State to track the selected search type
  const [selectedRows, setSelectedRows] = useState({}); // State to track selected rows
  const [paidRows, setPaidRows] = useState({}); // State to track paid status of rows

  // Fetch challan data from the backend
  useEffect(() => {
    const fetchChallanData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Construct query parameters for search and date range
        const queryParam =
          searchType === "name"
            ? `studentName=${nameQuery}`
            : `challanNo=${nameQuery}`;
        const dateRangeParam =
          date1 && date2 ? `&startDate=${date1}&endDate=${date2}` : "";
        const response = await axiosInstance.get(
          `/challan?page=${page}&${queryParam}${dateRangeParam}&limit=5`
        ); // Update endpoint with search and pagination
        setFetchedUserData(response.data.data);
        setTotalPages(response.data.totalPages); // Set total pages from response
      } catch (error) {
        console.error("Error fetching challan data:", error);
        setError("Failed to fetch challan data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallanData();
  }, [page, nameQuery, searchType, date1, date2]); // Fetch data when page, search query, search type, or date changes

  // Handle input change for the search field
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Trigger search on Enter key
  const handleSearch = () => {
    setNameQuery(searchTerm); // Update the state to search by the current term
    setPage(1); // Reset page to 1 when performing a new search
  };

  // Capture Enter key press to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle date changes
  const handleDateChange = (e, setDate) => {
    const selectedDate = e.target.value;
    // Ensure the selected date is in the correct format
    setDate(selectedDate);
  };

  // Change page
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Trigger search by date range
  const handleDateSearch = () => {
    if (date1 && date2) {
      setPage(1); // Reset page to 1 when performing a new date search
    }
  };

  // Toggle row selection on double click
  const handleRowDoubleClick = (id) => {
    setSelectedRows((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id],
    }));
  };

  // Mark selected challans as paid
  const markChallansAsPaid = () => {
    const updatedPaidRows = { ...paidRows };
    Object.keys(selectedRows).forEach((id) => {
      if (selectedRows[id]) {
        updatedPaidRows[id] = true;
      }
    });
    setPaidRows(updatedPaidRows);
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
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="search-type-dropdown"
            >
              <option value="name">Name</option>
              <option value="challanNo">Challan No</option>
            </select>
            <input
              type="search"
              name="search-field"
              placeholder={`Search by ${
                searchType === "name" ? "Name" : "Challan No"
              }...`}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="top-buttons">
            <button className="action-button">Pending</button>
            <ChallanDataModal buttonName={"Edit Default Values"} />
            <ChallanModal buttonName={"Generate Challan"} />{" "}
            <ChallanModal buttonName={"Edit Challan"} /> {/* Date Pickers */}
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
            {/* Search by Date Button */}
            <button className="action-button" onClick={markChallansAsPaid}>
              Mark Challan as Done
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Challan No</th>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(fetchChallanData) &&
              fetchChallanData.length > 0 ? (
                fetchChallanData.map((challan) => (
                  <tr
                    key={challan._id}
                    className={selectedRows[challan._id] ? "selected-row" : ""}
                    onDoubleClick={() => handleRowDoubleClick(challan._id)}
                  >
                    {/* Challan Data */}
                    <td>{challan.challanNo}</td>
                    <td>{challan.studentId.name}</td>
                    <td>{challan.studentId.fatherName}</td>
                    <td>{challan.studentId.rollNo}</td>
                    <td>{challan.studentId.class}</td>
                    <td>{new Date(challan.updatedAt).toLocaleDateString()}</td>
                    <td>{challan.admissionFee}</td>
                    <td>{challan.tuitionFee}</td>
                    <td>{challan.generalFund}</td>
                    <td>{challan.studentIdCardFund}</td>
                    <td>{challan.redCrossFund}</td>
                    <td>{challan.medicalFee}</td>
                    <td>{challan.studentWelfareFund}</td>
                    <td>{challan.scBreakageFund}</td>
                    <td>{challan.magazineFund}</td>
                    <td>{challan.librarySecFund}</td>
                    <td>{challan.boardUnivRegExamDues}</td>
                    <td>{challan.sportsFund}</td>
                    <td>{challan.miscellaneousFund}</td>
                    <td>{challan.boardUniProcessingFee}</td>
                    <td>{challan.transportFund}</td>
                    <td>{challan.burqaFund}</td>
                    <td>{challan.collegeExaminationFund}</td>
                    <td>{challan.computerFee}</td>
                    <td>{challan.secondShift}</td>
                    <td>{challan.fineFunds}</td>
                    <td>{challan.grandTotal}</td>
                    {/* Action Cell */}
                    <td className="action-cell">
                      {paidRows[challan._id] ? "Paid" : "Pending"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="29">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            className="pagination-button"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-button"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challan;
