// PrintChallan.js
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ChallanComponent from "./challanPrint";
import "./challanPrint.css";

const PrintChallan = ({ challan }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print Challan</button>
      <div
        className="print-challan-div"
        ref={componentRef}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ChallanComponent label="Bank" />
        <ChallanComponent label="Student" />
        <ChallanComponent label="College" />
      </div>
    </div>
  );
};

export default PrintChallan;
