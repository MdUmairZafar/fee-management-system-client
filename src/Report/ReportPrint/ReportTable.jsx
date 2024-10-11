import React from "react";
import "./printTable.css";

const ReportTable = React.forwardRef((props, ref) => (
  <div ref={ref} className="print-div">
    {Object.keys(props.data).map((pageIndex) => {
      let count = 0;
      return (
        <div key={pageIndex}>
          {/* First half of the columns */}
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Challan No</th>
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
                <th>Medical Fund</th>
                <th>Student Welfare Fund</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(props.data[pageIndex]).map((date, index) => (
                <React.Fragment key={index}>
                  {props.data[pageIndex][date].data.map((challan, index) => (
                    <tr key={index}>
                      <td>{++count + (pageIndex-1)*25}</td>
                      <td>{challan.challanNo}</td>
                      <td>{challan.studentId.name}</td>
                      <td>{challan.studentId.fatherName}</td>
                      <td>{challan.studentId.rollNo}</td>
                      <td>{challan.studentId.class}</td>
                      <td>
                        {new Date(challan.createdAt).toLocaleDateString()}
                      </td>
                      <td>{new Date(challan.dueDate).toLocaleDateString()}</td>
                      <td>{challan.admissionFee}</td>
                      <td>{challan.tuitionFee}</td>
                      <td>
                        {(challan.admissionFee || 0) +
                          (challan.tuitionFee || 0)}
                      </td>
                      <td>{challan.generalFund}</td>
                      <td>{challan.studentIdCardFund}</td>
                      <td>{challan.redCrossFund}</td>
                      <td>{challan.medicalFee}</td>
                      <td>{challan.studentWelfareFund}</td>
                    </tr>
                  ))}

                  {/* Sum row after each date.data.map ends */}
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
                    <td></td>
                    <td>{props.data[pageIndex][date].sum.admissionFee}</td>
                    <td>{props.data[pageIndex][date].sum.tuitionFee}</td>
                    <td>
                      {(props.data[pageIndex][date].sum.admissionFee || 0) +
                        (props.data[pageIndex][date].sum.tuitionFee || 0)}
                    </td>
                    <td>{props.data[pageIndex][date].sum.generalFund}</td>
                    <td>{props.data[pageIndex][date].sum.studentIdCardFund}</td>
                    <td>{props.data[pageIndex][date].sum.redCrossFund}</td>
                    <td>{props.data[pageIndex][date].sum.medicalFee}</td>
                    <td>
                      {props.data[pageIndex][date].sum.studentWelfareFund}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>

            <tfoot>
              {Object.keys(props.data).length == pageIndex ? (
                <tr>
                  <td height={20}>Final</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{props.sum.admissionFee}</td>
                  <td>{props.sum.tuitionFee}</td>
                  <td>
                    {(props.sum.admissionFee || 0) +
                      (props.sum.tuitionFee || 0)}
                  </td>
                  <td>{props.sum.generalFund}</td>
                  <td>{props.sum.studentIdCardFund}</td>
                  <td>{props.sum.redCrossFund}</td>
                  <td>{props.sum.medicalFee}</td>
                  <td>{props.sum.studentWelfareFund}</td>
                </tr>
              ) : null}
            </tfoot>
          </table>
          <p className="page-number">Page {pageIndex}</p>
          <div className="page-break"></div>
          {/* Second half of the columns */}
          <table className="table">
            <thead>
              <tr>
                <th>Sc. Breakage Fund</th>
                <th>Magazine Fund</th>
                <th>Library Sec Fund</th>
                <th>Board/Univ Regd/Exam Fund</th>
                <th>Sports Fund</th>
                <th>Miscellaneous Fund</th>
                <th>Board Uni Processing Fee</th>
                <th>Transport Fund</th>
                <th>Burqa Fund</th>
                <th>College Examination Fund</th>
                <th>Computer Fund</th>
                <th>2nd Shift Fund</th>
                <th>Fine Funds</th>
                <th>Total Fee</th>
                <th>Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(props.data[pageIndex]).map((date, index) => (
                <React.Fragment key={index}>
                  {props.data[pageIndex][date].data.map((challan, i) => (
                    <tr key={i}>
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
                  ))}

                  {/* Sum Row */}
                  <tr>
                    <td>{props.data[pageIndex][date].sum.scBreakageFund}</td>
                    <td>{props.data[pageIndex][date].sum.magazineFund}</td>
                    <td>{props.data[pageIndex][date].sum.librarySecFund}</td>
                    <td>
                      {props.data[pageIndex][date].sum.boardUnivRegExamDues}
                    </td>
                    <td>{props.data[pageIndex][date].sum.sportsFund}</td>
                    <td>{props.data[pageIndex][date].sum.miscellaneousFund}</td>
                    <td>
                      {props.data[pageIndex][date].sum.boardUniProcessingFee}
                    </td>
                    <td>{props.data[pageIndex][date].sum.transportFund}</td>
                    <td>{props.data[pageIndex][date].sum.burqaFund}</td>
                    <td>
                      {props.data[pageIndex][date].sum.collegeExaminationFund}
                    </td>
                    <td>{props.data[pageIndex][date].sum.computerFee}</td>
                    <td>{props.data[pageIndex][date].sum.secondShift}</td>
                    <td>
                      {(props.data[pageIndex][date].sum.generalFund || 0) +
                        (props.data[pageIndex][date].sum.studentIdCardFund ||
                          0) +
                        (props.data[pageIndex][date].sum.redCrossFund || 0) +
                        (props.data[pageIndex][date].sum.medicalFee || 0) +
                        (props.data[pageIndex][date].sum.studentWelfareFund ||
                          0) +
                        (props.data[pageIndex][date].sum.scBreakageFund || 0) +
                        (props.data[pageIndex][date].sum.magazineFund || 0) +
                        (props.data[pageIndex][date].sum.librarySecFund || 0) +
                        (props.data[pageIndex][date].sum.boardUnivRegExamDues ||
                          0) +
                        (props.data[pageIndex][date].sum.sportsFund || 0) +
                        (props.data[pageIndex][date].sum.miscellaneousFund ||
                          0) +
                        (props.data[pageIndex][date].sum
                          .boardUniProcessingFee || 0) +
                        (props.data[pageIndex][date].sum.transportFund || 0) +
                        (props.data[pageIndex][date].sum.burqaFund || 0) +
                        (props.data[pageIndex][date].sum
                          .collegeExaminationFund || 0) +
                        (props.data[pageIndex][date].sum.computerFee || 0) +
                        (props.data[pageIndex][date].sum.secondShift || 0) +
                        (props.data[pageIndex][date].sum.fineFunds || 0)}
                    </td>
                    <td>
                      {(props.data[pageIndex][date].sum.admissionFee || 0) +
                        (props.data[pageIndex][date].sum.tuitionFee || 0) +
                        (props.data[pageIndex][date].sum.generalFund || 0) +
                        (props.data[pageIndex][date].sum.studentIdCardFund ||
                          0) +
                        (props.data[pageIndex][date].sum.redCrossFund || 0) +
                        (props.data[pageIndex][date].sum.medicalFee || 0) +
                        (props.data[pageIndex][date].sum.studentWelfareFund ||
                          0) +
                        (props.data[pageIndex][date].sum.scBreakageFund || 0) +
                        (props.data[pageIndex][date].sum.magazineFund || 0) +
                        (props.data[pageIndex][date].sum.librarySecFund || 0) +
                        (props.data[pageIndex][date].sum.boardUnivRegExamDues ||
                          0) +
                        (props.data[pageIndex][date].sum.sportsFund || 0) +
                        (props.data[pageIndex][date].sum.miscellaneousFund ||
                          0) +
                        (props.data[pageIndex][date].sum
                          .boardUniProcessingFee || 0) +
                        (props.data[pageIndex][date].sum.transportFund || 0) +
                        (props.data[pageIndex][date].sum.burqaFund || 0) +
                        (props.data[pageIndex][date].sum
                          .collegeExaminationFund || 0) +
                        (props.data[pageIndex][date].sum.computerFee || 0) +
                        (props.data[pageIndex][date].sum.secondShift || 0) +
                        (props.data[pageIndex][date].sum.fineFunds || 0)}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>

            <tfoot>
              {Object.keys(props.data).length == pageIndex ? (
                <tr>
                  <td>{props.sum.scBreakageFund}</td>
                  <td>{props.sum.magazineFund}</td>
                  <td>{props.sum.librarySecFund}</td>
                  <td>{props.sum.boardUnivRegExamDues}</td>
                  <td>{props.sum.sportsFund}</td>
                  <td>{props.sum.miscellaneousFund}</td>
                  <td>{props.sum.boardUniProcessingFee}</td>
                  <td>{props.sum.transportFund}</td>
                  <td>{props.sum.burqaFund}</td>
                  <td>{props.sum.collegeExaminationFund}</td>
                  <td>{props.sum.computerFee}</td>
                  <td>{props.sum.secondShift}</td>
                  <td>{props.sum.fineFunds}</td>
                  <td>
                    {(props.sum.generalFund || 0) +
                      (props.sum.studentIdCardFund || 0) +
                      (props.sum.redCrossFund || 0) +
                      (props.sum.medicalFee || 0) +
                      (props.sum.studentWelfareFund || 0) +
                      (props.sum.scBreakageFund || 0) +
                      (props.sum.magazineFund || 0) +
                      (props.sum.librarySecFund || 0) +
                      (props.sum.boardUnivRegExamDues || 0) +
                      (props.sum.sportsFund || 0) +
                      (props.sum.miscellaneousFund || 0) +
                      (props.sum.boardUniProcessingFee || 0) +
                      (props.sum.transportFund || 0) +
                      (props.sum.burqaFund || 0) +
                      (props.sum.collegeExaminationFund || 0) +
                      (props.sum.computerFee || 0) +
                      (props.sum.secondShift || 0) +
                      (props.sum.fineFunds || 0)}
                  </td>
                  <td>
                    {(props.sum.admissionFee || 0) +
                      (props.sum.tuitionFee || 0) +
                      (props.sum.generalFund || 0) +
                      (props.sum.studentIdCardFund || 0) +
                      (props.sum.redCrossFund || 0) +
                      (props.sum.medicalFee || 0) +
                      (props.sum.studentWelfareFund || 0) +
                      (props.sum.scBreakageFund || 0) +
                      (props.sum.magazineFund || 0) +
                      (props.sum.librarySecFund || 0) +
                      (props.sum.boardUnivRegExamDues || 0) +
                      (props.sum.sportsFund || 0) +
                      (props.sum.miscellaneousFund || 0) +
                      (props.sum.boardUniProcessingFee || 0) +
                      (props.sum.transportFund || 0) +
                      (props.sum.burqaFund || 0) +
                      (props.sum.collegeExaminationFund || 0) +
                      (props.sum.computerFee || 0) +
                      (props.sum.secondShift || 0) +
                      (props.sum.fineFunds || 0)}
                  </td>
                </tr>
              ) : null}
            </tfoot>
          </table>

          <p className="page-number">Page {pageIndex}</p>

          {/* CSS to force page break after each table set */}
          <div className="page-break"></div>
        </div>
      );
    })}
  </div>
));

export default ReportTable;
