import React, { useState, useEffect, useContext } from "react";
import "./report.css"; // Import the CSS file for styling
import axiosInstance, { isTokenSet } from "../Utils/axiosConfig";
import PrintReport from "./ReportPrint/printReport";
import PrintCCB from "./ReportPrint/generateCCB";

const Report = () => {
  const token = JSON.parse(localStorage.getItem("token"));
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
  const [sumData, setSumData] = useState({}); // State for summed data
  const [pageTotal, setPageTotal] = useState({});

  // Fetch challan data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Construct query parameters for search and date range
        const veryOldDate = new Date("1900-01-01").toISOString().split("T")[0];
        const startDate = date1 || veryOldDate; // Use very old date if `date1` is not selected
        // Get the current date if `date2` is not selected
        const currentDate = new Date().toISOString().split("T")[0];
        const endDate = date2 || currentDate; // Use current date if `date2` is not selected
        const queryParam =
          searchType === "name"
            ? `studentName=${nameQuery}`
            : searchType === "challanNo"
            ? `challanNo=${nameQuery}`
            : searchType === "rollNo"
            ? `rollNo=${nameQuery}`
            : "";
        const dateRangeParam =
          date1 || date2 ? `&startDate=${startDate}&endDate=${endDate}` : "";
        const [response, sumResponse] = await Promise.all([
          axiosInstance.get(
            `/challan?isPaid=true&page=${page}&${queryParam}${dateRangeParam}&limit=10`
          ),
          axiosInstance.get(`/challan/sum?${dateRangeParam}`),
        ]); // Update endpoint with search and pagination

        console.log(sumResponse.data.data);

        setFetchedUserData(response.data.data);
        setTotalPages(response.data.totalPages); // Set total pages from response
        setSumData(sumResponse.data.data);
        calculatePageTotals(response.data.data);
      } catch (error) {
        console.error("Error fetching challan data:", error);
        setError("Failed to fetch challan data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (isTokenSet()) {
      fetchData();
    }
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

  // Toggle row selection on double click
  const handleRowDoubleClick = (id) => {
    setSelectedRows((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id],
    }));
  };
  const calculatePageTotals = (data) => {
    console.log("fetch challan data", fetchChallanData);
    // Assuming each record is an object containing all fee fields
    const totals = {
      admissionFee: 0,
      tuitionFee: 0,
      total: 0,
      generalFund: 0,
      studentIdCardFund: 0,
      redCrossFund: 0,
      medicalFee: 0,
      studentWelfareFund: 0,
      scBreakageFund: 0,
      magazineFund: 0,
      librarySecFund: 0,
      boardExamDues: 0,
      sportsFund: 0,
      miscellaneousFund: 0,
      processingFee: 0,
      transportFund: 0,
      burqaFund: 0,
      collegeExamFund: 0,
      computerFee: 0,
      secondShift: 0,
      fineFunds: 0,
      payment: 0,
      grandTotal: 0,
    };

    // Loop through each record on the current page
    data.forEach((record) => {
      totals.admissionFee += record.admissionFee || 0;
      totals.tuitionFee += record.tuitionFee || 0;
      totals.total += record.total || 0;
      totals.generalFund += record.generalFund || 0;
      totals.studentIdCardFund += record.studentIdCardFund || 0;
      totals.redCrossFund += record.redCrossFund || 0;
      totals.medicalFee += record.medicalFee || 0;
      totals.studentWelfareFund += record.studentWelfareFund || 0;
      totals.scBreakageFund += record.scBreakageFund || 0;
      totals.magazineFund += record.magazineFund || 0;
      totals.librarySecFund += record.librarySecFund || 0;
      totals.boardExamDues += record.boardExamDues || 0;
      totals.sportsFund += record.sportsFund || 0;
      totals.miscellaneousFund += record.miscellaneousFund || 0;
      totals.processingFee += record.processingFee || 0;
      totals.transportFund += record.transportFund || 0;
      totals.burqaFund += record.burqaFund || 0;
      totals.collegeExamFund += record.collegeExamFund || 0;
      totals.computerFee += record.computerFee || 0;
      totals.secondShift += record.secondShift || 0;
      totals.fineFunds += record.fineFunds || 0;
      totals.payment += record.payment || 0;
      totals.grandTotal += record.grandTotal || 0;
    });
    console.log("hu" + totals);
    setPageTotal(totals);
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
              <option value="rollNo">Roll No</option>
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
            <PrintReport
              startDate={
                date1 || new Date("1900-01-01").toISOString().split("T")[0]
              }
              endDate={date2 || new Date().toISOString().split("T")[0]}
            />
            <PrintCCB
              startDate={
                date1 || new Date("1900-01-01").toISOString().split("T")[0]
              }
              endDate={date2 || new Date().toISOString().split("T")[0]}
            />

            {/* Date Pickers */}
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
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report No</th>
                <th>Name</th>
                <th>D/O</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Dated</th>
                <th>Due Date</th>
                <th>Admission Fee</th>
                <th>Tuition Fee</th>
                <th>Total</th>
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
                <th>Total</th>
                <th>Payment</th>
                <th>Grand Total</th>
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
                    {/* Report Data */}
                    <td>{challan.challanNo}</td>
                    <td>{challan.studentId.name}</td>
                    <td>{challan.studentId.fatherName}</td>
                    <td>{challan.studentId.rollNo}</td>
                    <td>{challan.studentId.class}</td>
                    <td>{new Date(challan.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(challan.dueDate).toLocaleDateString()}</td>
                    <td>{challan.admissionFee}</td>
                    <td>{challan.tuitionFee}</td>
                    <td>
                      {(challan.admissionFee || 0) + (challan.tuitionFee || 0)}
                    </td>
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
                    <td>
                      {(challan.generalFund || 0) +
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="29">No data available</td>
                </tr>
              )}
            </tbody>

            <tfoot>
              <tr>
                <td>
                  <b>Total</b>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <b>{pageTotal.admissionFee}</b>
                </td>
                <td>
                  <b>{pageTotal.tuitionFee}</b>
                </td>
                <td>
                  <b>
                    {(pageTotal.admissionFee || 0) +
                      (pageTotal.tuitionFee || 0)}
                  </b>
                </td>
                <td>
                  <b>{pageTotal.generalFund}</b>
                </td>
                <td>
                  <b>{pageTotal.studentIdCardFund}</b>
                </td>
                <td>
                  <b>{pageTotal.redCrossFund}</b>
                </td>
                <td>
                  <b>{pageTotal.medicalFee}</b>
                </td>
                <td>
                  <b>{pageTotal.studentWelfareFund}</b>
                </td>
                <td>
                  <b>{pageTotal.scBreakageFund}</b>
                </td>
                <td>
                  <b>{pageTotal.magazineFund}</b>
                </td>
                <td>
                  <b>{pageTotal.librarySecFund}</b>
                </td>
                <td>
                  <b>{pageTotal.boardUnivRegExamDues}</b>
                </td>
                <td>
                  <b>{pageTotal.sportsFund}</b>
                </td>
                <td>
                  <b>{pageTotal.miscellaneousFund}</b>
                </td>
                <td>
                  <b>{pageTotal.boardUniProcessingFee}</b>
                </td>
                <td>
                  <b>{pageTotal.transportFund}</b>
                </td>
                <td>
                  <b>{pageTotal.burqaFund}</b>
                </td>
                <td>
                  <b>{pageTotal.collegeExaminationFund}</b>
                </td>
                <td>
                  <b>{pageTotal.computerFee}</b>
                </td>
                <td>
                  <b>{pageTotal.secondShiftFee}</b>
                </td>
                <td>
                  <b>{pageTotal.fineFunds}</b>
                </td>
                <td>
                  <b>
                    {(pageTotal.generalFund || 0) +
                      (pageTotal.studentIdCardFund || 0) +
                      (pageTotal.redCrossFund || 0) +
                      (pageTotal.medicalFee || 0) +
                      (pageTotal.studentWelfareFund || 0) +
                      (pageTotal.scBreakageFund || 0) +
                      (pageTotal.magazineFund || 0) +
                      (pageTotal.librarySecFund || 0) +
                      (pageTotal.boardUnivRegExamDues || 0) +
                      (pageTotal.sportsFund || 0) +
                      (pageTotal.miscellaneousFund || 0) +
                      (pageTotal.boardUniProcessingFee || 0) +
                      (pageTotal.transportFund || 0) +
                      (pageTotal.burqaFund || 0) +
                      (pageTotal.collegeExaminationFund || 0) +
                      (pageTotal.computerFee || 0) +
                      (pageTotal.secondShift || 0) +
                      (pageTotal.fineFunds || 0)}
                  </b>
                </td>
                <td></td>
                <td>
                  <b>
                    {pageTotal.admissionFee +
                      pageTotal.tuitionFee +
                      (pageTotal.generalFund || 0) +
                      (pageTotal.studentIdCardFund || 0) +
                      (pageTotal.redCrossFund || 0) +
                      (pageTotal.medicalFee || 0) +
                      (pageTotal.studentWelfareFund || 0) +
                      (pageTotal.scBreakageFund || 0) +
                      (pageTotal.magazineFund || 0) +
                      (pageTotal.librarySecFund || 0) +
                      (pageTotal.boardUnivRegExamDues || 0) +
                      (pageTotal.sportsFund || 0) +
                      (pageTotal.miscellaneousFund || 0) +
                      (pageTotal.boardUniProcessingFee || 0) +
                      (pageTotal.transportFund || 0) +
                      (pageTotal.burqaFund || 0) +
                      (pageTotal.collegeExaminationFund || 0) +
                      (pageTotal.computerFee || 0) +
                      (pageTotal.secondShift || 0) +
                      (pageTotal.fineFunds || 0)}
                  </b>
                </td>
              </tr>

              {totalPages === page ? (
                <tr>
                  <td>
                    <b>Grand Total</b>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <b>{sumData.admissionFee}</b>
                  </td>
                  <td>
                    <b>{sumData.tuitionFee}</b>
                  </td>
                  <td>
                    <b>
                      {(sumData.admissionFee || 0) + (sumData.tuitionFee || 0)}
                    </b>
                  </td>
                  <td>
                    <b>{sumData.generalFund}</b>
                  </td>
                  <td>
                    <b>{sumData.studentIdCardFund}</b>
                  </td>
                  <td>
                    <b>{sumData.redCrossFund}</b>
                  </td>
                  <td>
                    <b>{sumData.medicalFee}</b>
                  </td>
                  <td>
                    <b>{sumData.studentWelfareFund}</b>
                  </td>
                  <td>
                    <b>{sumData.scBreakageFund}</b>
                  </td>
                  <td>
                    <b>{sumData.magazineFund}</b>
                  </td>
                  <td>
                    <b>{sumData.librarySecFund}</b>
                  </td>
                  <td>
                    <b>{sumData.boardUnivRegExamDues}</b>
                  </td>
                  <td>
                    <b>{sumData.sportsFund}</b>
                  </td>
                  <td>
                    <b>{sumData.miscellaneousFund}</b>
                  </td>
                  <td>
                    <b>{sumData.boardUniProcessingFee}</b>
                  </td>
                  <td>
                    <b>{sumData.transportFund}</b>
                  </td>
                  <td>
                    <b>{sumData.burqaFund}</b>
                  </td>
                  <td>
                    <b>{sumData.collegeExaminationFund}</b>
                  </td>
                  <td>
                    <b>{sumData.computerFee}</b>
                  </td>
                  <td>
                    <b>{sumData.secondShiftFee}</b>
                  </td>
                  <td>
                    <b>{sumData.fineFunds}</b>
                  </td>
                  <td>
                    <b>
                      {(sumData.generalFund || 0) +
                        (sumData.studentIdCardFund || 0) +
                        (sumData.redCrossFund || 0) +
                        (sumData.medicalFee || 0) +
                        (sumData.studentWelfareFund || 0) +
                        (sumData.scBreakageFund || 0) +
                        (sumData.magazineFund || 0) +
                        (sumData.librarySecFund || 0) +
                        (sumData.boardUnivRegExamDues || 0) +
                        (sumData.sportsFund || 0) +
                        (sumData.miscellaneousFund || 0) +
                        (sumData.boardUniProcessingFee || 0) +
                        (sumData.transportFund || 0) +
                        (sumData.burqaFund || 0) +
                        (sumData.collegeExaminationFund || 0) +
                        (sumData.computerFee || 0) +
                        (sumData.secondShift || 0) +
                        (sumData.fineFunds || 0)}
                    </b>
                  </td>
                  <td>
                    <b>
                      {sumData.admissionFee +
                        sumData.tuitionFee +
                        (sumData.generalFund || 0) +
                        (sumData.studentIdCardFund || 0) +
                        (sumData.redCrossFund || 0) +
                        (sumData.medicalFee || 0) +
                        (sumData.studentWelfareFund || 0) +
                        (sumData.scBreakageFund || 0) +
                        (sumData.magazineFund || 0) +
                        (sumData.librarySecFund || 0) +
                        (sumData.boardUnivRegExamDues || 0) +
                        (sumData.sportsFund || 0) +
                        (sumData.miscellaneousFund || 0) +
                        (sumData.boardUniProcessingFee || 0) +
                        (sumData.transportFund || 0) +
                        (sumData.burqaFund || 0) +
                        (sumData.collegeExaminationFund || 0) +
                        (sumData.computerFee || 0) +
                        (sumData.secondShift || 0) +
                        (sumData.fineFunds || 0)}
                    </b>
                  </td>
                </tr>
              ) : null}
            </tfoot>
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

export default Report;
