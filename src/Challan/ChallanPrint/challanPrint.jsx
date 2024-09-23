// ChallanComponent.js
import React from "react";
import "./challanPrint.css";

const ChallanComponent = ({ label, challan }) => (
  <div className="challan-box">
    <h2 className="challan-header">
      GOVT. DEGREE COLLEGE (W), MUSTAFABAD, LAHORE
    </h2>
    <h3 className="challan-subheader">THE BANK OF PUNJAB</h3>
    <p className="challan-info">Collection Account Detail: #6020033760300048</p>

    <div className="challan-label">
      <p>
        <strong>{label} Copy</strong>
      </p>
      <p>
        <strong style={{ marginRight: 4 }}>Challan No:</strong>{" "}
        {challan.challanNo}
      </p>
      <p>
        <strong style={{ marginRight: 4 }}>Name:</strong> {challan.studentName}
        <strong style={{ marginLeft: 40, marginRight: 4 }}>
          Father Name:
        </strong>{" "}
        {challan.fatherName}
      </p>
      <p>
        <strong style={{ marginRight: 4 }}>Roll No:</strong> {challan.rollNo}
        <strong style={{ marginLeft: 40, marginRight: 4 }}>Class:</strong>{" "}
        {challan.grade}
        <strong style={{ marginLeft: 40 }}>Date:</strong>{" "}
        {new Date().toISOString().split("T")[0]}
      </p>

      <FeeTable values={challan} />
    </div>

    <div className="challan-footer">
      <p style={{ marginRight: 20 }}>
        <strong style={{ marginRight: 4 }}>Cashier/Clerk:</strong> Ali
      </p>
    </div>
  </div>
);

const FeeTable = ({ values }) => {
  const calculateTotal = () => {
    return (
      (values.admissionFee || 0) +
      (values.tuitionFee || 0) +
      (values.generalFund || 0) +
      (values.studentIdCardFund || 0) +
      (values.redCrossFund || 0) +
      (values.medicalFund || 0) +
      (values.studentWelfareFund || 0) +
      (values.scBreakageFund || 0) +
      (values.magazineFund || 0) +
      (values.librarySecutityFund || 0) +
      (values.boardUniRegdExamDues || 0) +
      (values.sportsFund || 0) +
      (values.miscellaneousFund || 0) +
      (values.boardUniProcessingFee || 0) +
      (values.transportFund || 0) +
      (values.burqaFund || 0) +
      (values.collegeExaminationFund || 0) +
      (values.computerFee || 0) +
      (values.secondShiftFee || 0) +
      (values.fineFund || 0)
    );
  };

  return (
    <table className="challan-table">
      <thead>
        <tr>
          <th>Name of Fund</th>
          <th>Amount (in Rs.)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Admission Fee</td>
          <td>{values.admissionFee || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Tuition Fee</td>
          <td>{values.tuitionFee || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>General Fund</td>
          <td>{values.generalFund || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Student I.D Card Fund</td>
          <td>{values.studentIdCardFund || ""}</td>{" "}
          {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Red Cross Fund</td>
          <td>{values.redCrossFund || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Medical Fee</td>
          <td>{values.medicalFund || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Student Welfare Fund</td>
          <td>{values.studentWelfareFund || ""}</td>{" "}
          {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Sc. Breakage Fund</td>
          <td>{values.scBreakageFund || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Magazine Fund</td>
          <td>{values.magazineFund || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Library Sec Fund</td>
          <td>{values.librarySecutityFund || ""}</td>{" "}
          {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Board/Univ Regd/Exam Dues</td>
          <td>{values.boardUniRegdExamDues || ""}</td>{" "}
          {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Sports Fund</td>
          <td>{values.sportsFund || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Miscellaneous Fund</td>
          <td>{values.miscellaneousFund || ""}</td>{" "}
          {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Board Uni Processing Fee</td>
          <td>{values.boardUniProcessingFee || ""}</td>{" "}
          {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Transport Fund</td>
          <td>{values.transportFund || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Burqa Fund</td>
          <td>{values.burqaFund || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>College Examination Fund</td>
          <td>{values.collegeExaminationFund || ""}</td>{" "}
          {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Computer Fee</td>
          <td>{values.computerFee || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>2nd Shift</td>
          <td>{values.secondShiftFee || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr>
          <td>Fine Funds</td>
          <td>{values.fineFund || ""}</td> {/* Dynamic value or empty */}
        </tr>
        <tr style={{ height: 18 }}>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{calculateTotal}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ChallanComponent;
