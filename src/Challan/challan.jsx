import React, { useState, useEffect, useContext } from "react";
import "./challan.css"; // Import the CSS file for styling
import axiosInstance, { isTokenSet } from "../Utils/axiosConfig";
import ChallanModal from "./ChallanModals/challanModal";
import ChallanDataModal from "./ChallanModals/challanDataModal";

const Challan = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User: ", user);
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
  const [selectedRowData, setSelectedRowData] = useState(null); // State to store selected row data
  const [trigger, setTrigger] = useState(false); // State to trigger re-fetching data
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch challan data from the backend
  useEffect(() => {
    console.log("In useEffect");
    console.log("Token", token);
    console.log("isTokenSet", isTokenSet());
    const fetchChallanData = async () => {
      setLoading(true);
      setError(null);
      try {
        const veryOldDate = new Date("1900-01-01").toISOString().split("T")[0];
        const startDate = date1 || veryOldDate; // Use very old date if `date1` is not selected
        // Get the current date if `date2` is not selected
        const currentDate = new Date().toISOString().split("T")[0];
        const endDate = date2 || currentDate; // Use current date if `date2` is not selected
        const queryParam =
          searchType === "name"
            ? `studentName=${nameQuery}`
            : `challanNo=${nameQuery}`;
        const dateRangeParam =
          date1 || date2 ? `&startDate=${startDate}&endDate=${endDate}` : "";
        const response = await axiosInstance.get(
          `/challan?page=${page}&${queryParam}${dateRangeParam}&limit=10`
        ); // Update endpoint with search and pagination
        setFetchedUserData(response.data.data);
        console.log("response.data.data", response.data.data);
        setTotalPages(response.data.totalPages); // Set total pages from response
      } catch (error) {
        console.error("Error fetching challan data:", error);
        setError("Failed to fetch challan data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (isTokenSet()) {
      fetchChallanData();
    }
  }, [
    page,
    nameQuery,
    searchType,
    date1,
    date2,
    trigger,
    selectedRowData,
    modalOpen,
  ]); // Fetch data when page, search query, search type, or date changes

  // Reset states when modalOpen changes
  useEffect(() => {
    resetStates();
  }, [modalOpen]);

  const resetStates = () => {
    setSelectedRows({});
    setSelectedRowData(null);
  };

  // Handle input change for the search field
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModalClose = () => {
    setModalOpen(!modalOpen); // This will trigger a re-render
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

  // Toggle row selection on double click
  const handleRowDoubleClick = (data) => {
    setSelectedRows((prevSelected) => ({
      [data._id]: !prevSelected[data._id],
    }));
    if (selectedRows[data._id]) {
      console.log("in IF part: ", selectedRows[data._id]);
      setSelectedRowData(null);
    } else {
      console.log("in elsex part: ", selectedRows[data._id]);
      setSelectedRowData(data);
    }

    console.log("Selected Rows:", selectedRowData);
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

  // Use it in your function (e.g., when marking a challan as paid)
  const markChallansAsPaid = async () => {
    if (selectedRowData) {
      console.log("Selected Row Data:", selectedRowData);
      // updating status in backend
      if (selectedRowData.isPaid) {
        alert("Challan already paid");
        return;
      }
      const response = await axiosInstance.patch(
        `/challan/${selectedRowData._id}`,
        {
          isPaid: true,
        }
      );
      console.log("Response:", response);
      setTrigger(!trigger); // Trigger re-fetching data
    } else {
      console.log("No row selected");
    }
  };

  const getTransformedValues = (selectedRowData) => {
    const { studentId, ...rest } = selectedRowData;
    return {
      ...rest,
      studentName: studentId.name,
      grade: studentId.class,
      rollNo: studentId.rollNo,
      fatherName: studentId.fatherName,
      studentId: studentId._id,
    };
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
            <ChallanDataModal
              isDisable={user.type !== "admin"}
              buttonName={"Edit Default Values"}
            />
            <ChallanModal
              buttonName={"Generate Challan"}
              close={handleModalClose}
            />
            {selectedRowData ? (
              <ChallanModal
                buttonName={"Edit Challan"}
                close={handleModalClose}
                isDisable={false}
                values={getTransformedValues(selectedRowData)}
              />
            ) : (
              <ChallanModal buttonName={"Edit Challan"} isDisable={true} />
            )}
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
            <thead>
              <tr>
                <th>Challan No</th>
                <th>Name</th>
                <th>D/O</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Dated</th>
                <th>Due Date</th>
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
                <th>Payment</th>
                <th>Grand Total</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(fetchChallanData) &&
              fetchChallanData.length > 0 ? (
                fetchChallanData.map((challan) => (
                  <tr
                    key={challan._id}
                    className={selectedRows[challan._id] ? "selected-row" : ""}
                    onDoubleClick={() => handleRowDoubleClick(challan)}
                  >
                    {/* Challan Data */}
                    <td>{challan.challanNo}</td>
                    <td>{challan.studentId.name}</td>
                    <td>{challan.studentId.fatherName}</td>
                    <td>{challan.studentId.rollNo}</td>
                    <td>{challan.studentId.class}</td>
                    <td>{new Date(challan.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(challan.dueDate).toLocaleDateString()}</td>
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
                    <td>{challan.isPaid ? "Paid" : "Pending"}</td>
                    <td>
                      {(challan.admissionFee || 0) +
                        (challan.tuitionFee || 0) +
                        (challan.generalFund || 0) +
                        (challan.studentIdCardFund || 0) +
                        (challan.redCrossFund || 0) +
                        (challan.medicalFee || 0) +
                        (challan.studentWelfareFund || 0) +
                        (challan.scBreakageFund || 0) +
                        (challan.magazineFund || 0) +
                        (challan.librarySecFund || 0) +
                        (challan.boardUnivRegExamDues || 0) +
                        (challan.sportsFund || 0) +
                        (challan.miscellaneousFund || 0) +
                        (challan.boardUniProcessingFee || 0) +
                        (challan.transportFund || 0) +
                        (challan.burqaFund || 0) +
                        (challan.collegeExaminationFund || 0) +
                        (challan.computerFee || 0) +
                        (challan.secondShift || 0) +
                        (challan.fineFunds || 0)}
                    </td>
                    <td>{challan.userId.name}</td>
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
