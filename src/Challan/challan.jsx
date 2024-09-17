import React, { useState, useEffect, useContext } from "react";
import "./challan.css"; // Import the CSS file for styling
import axiosInstance from "../axiosConfig";
import { AuthContext } from "../AuthContext";
import ChallanModal from "../challanModal";
import ChallanDataModal from "../challanDataModal";

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
        // Get the current date if `date2` is not selected
        const currentDate = new Date().toISOString().split("T")[0];
        const endDate = date2 || currentDate; // Use current date if `date2` is not selected
        const queryParam =
          searchType === "name"
            ? `studentName=${nameQuery}`
            : `challanNo=${nameQuery}`;
        const dateRangeParam = date1 ? `&startDate=${date1}&endDate=${endDate}` : "";
        
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

  // Trigger search on Enter key or button click
  const handleSearch = () => {
    // Validate if searchType is "challanNo" and the input contains non-numeric characters
    if (searchType === "challanNo" && !/^\d+$/.test(searchTerm)) {
      setError("Challan No should contain only numbers."); // Set error message
      return; // Exit the function without making the API request
    }

    // Clear the error message if the input is valid
    setError(null);

    // Update the search query and reset to the first page
    setNameQuery(searchTerm); 
    setPage(1); 
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
    setDate(selectedDate); // Ensure the selected date is in the correct format
  };

  // Change page
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Toggle row selection on double click
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
            <ChallanDataModal buttonName={"Edit Default Values"} />
            <ChallanModal buttonName={"Generate Challan"} />
            <ChallanModal buttonName={"Edit Challan"} />
            
            {/* From Date Picker */}
            <div className="date-picker">
              <label>From:</label>
              <input
                type="date"
                value={date1}
                onChange={(e) => handleDateChange(e, setDate1)}
              />
            </div>
            
            {/* To Date Picker */}
            <div className="date-picker">
              <label>To:</label>
              <input
                type="date"
                value={date2}
                onChange={(e) => handleDateChange(e, setDate2)}
              />
            </div>
            
            {/* Mark Challan as Done Button */}
            <button className="action-button" onClick={markChallansAsPaid}>
              Mark Challan as Done
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            {/* Table Headers */}
            <thead>
              <tr>
                {/* ... existing table headers ... */}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {Array.isArray(fetchChallanData) && fetchChallanData.length > 0 ? (
                fetchChallanData.map((challan) => (
                  <tr key={challan._id}>
                    {/* Challan Data */}
                    {/* ... existing table rows and data ... */}
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
