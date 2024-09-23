import { useRef } from "react";
import ReactToPrint from "react-to-print";
import useFetchAllPages from "../../Utils/fetchAllData.js";
import ReportTable from "./ReportTable.jsx";
import "../report.css";

const PrintReport = ({ startDate, endDate }) => {
  const componentRef = useRef();

  // Use the custom hook with optional start and end dates
  const { allData, loading, error } = useFetchAllPages(startDate, endDate);

  return (
    <div>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <div>
          <ReactToPrint
            trigger={() => (
              <button className="action-button" style={{ height: 38 }}>
                Print Table
              </button>
            )}
            content={() => componentRef.current}
            pageStyle="@page { size: A4 landscape; }" // Print in landscape mode
          />
          <ReportTable ref={componentRef} data={allData} />
        </div>
      )}
    </div>
  );
};

export default PrintReport;
