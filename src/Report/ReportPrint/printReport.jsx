import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import useFetchAllPages from "../../Utils/fetchAllData.js";
import ReportTable from "./ReportTable.jsx";
import axiosInstance from "../../Utils/axiosConfig.js";
import "../report.css";

const PrintReport = ({ startDate, endDate }) => {
  const componentRef = useRef();
  const [sum, setSum] = useState(null);

  const { allData, loading, error } = useFetchAllPages(startDate, endDate);

  useEffect(() => {
    const getSum = async () => {
      console.log("Fetching sum...");
      try {
        const response = await axiosInstance.get(
          `/challan/sum?startDate=${startDate}&endDate=${endDate}`
        );
        console.log("Sum response:", response.data.data);
        setSum(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getSum();
  }, []);

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
          {sum ? (
            <ReportTable ref={componentRef} data={allData} sum={sum} />
          ) : (
            <p>Loading sum data...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PrintReport;
