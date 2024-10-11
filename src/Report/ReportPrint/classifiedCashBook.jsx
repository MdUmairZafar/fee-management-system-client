import React from "react";
import "./printTable.css";

const ClassifiedCashBook = React.forwardRef((props, ref) => (
  <div ref={ref} className="print-div">
    {Object.keys(props.data).map((pageIndex) => (
      <div key={pageIndex}>
        {/* First half of the columns */}
        <table className="table">
          {(pageIndex == 1 || pageIndex % 21 == 0) && (
            <thead>
              <tr>
                <th>Classified Register Page No.</th>
                <th>Dated</th>
                <th>Admission Fee</th>
                <th>Tuition Fee</th>
                <th>Gov. Dues Total</th>
                <th>General Fund</th>
                <th>Student I.D Card Fund</th>
                <th>Red Cross Fund</th>
                <th>Medical Fund</th>
                <th>Student Welfare Fund</th>
                <th>Sc. Breakage Fund</th>
                <th>Magazine Fund</th>
                <th>Library Sec Fund</th>
              </tr>
            </thead>
          )}
          <tbody>
            {Object.keys(props.data[pageIndex]).map((date, index) => (
              <tr key={index}>
                <td>{pageIndex}</td>
                <td>{date}</td>
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
                <td>{props.data[pageIndex][date].sum.studentWelfareFund}</td>
                <td>{props.data[pageIndex][date].sum.scBreakageFund}</td>
                <td>{props.data[pageIndex][date].sum.magazineFund}</td>
                <td>{props.data[pageIndex][date].sum.librarySecFund}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {Object.keys(props.data).length == pageIndex && (
              <tr>
                <td> Total</td>
                <td></td>
                <td>{props.sum.admissionFee}</td>
                <td>{props.sum.tuitionFee}</td>
                <td>
                  {(props.sum.admissionFee || 0) + (props.sum.tuitionFee || 0)}
                </td>
                <td>{props.sum.generalFund}</td>
                <td>{props.sum.studentIdCardFund}</td>
                <td>{props.sum.redCrossFund}</td>
                <td>{props.sum.medicalFee}</td>
                <td>{props.sum.studentWelfareFund}</td>
                <td>{props.sum.scBreakageFund}</td>
                <td>{props.sum.magazineFund}</td>
                <td>{props.sum.librarySecFund}</td>
              </tr>
            )}
          </tfoot>
        </table>
        {pageIndex % 20 == 0 && (
          <div>
            <p className="page-number">Page {pageIndex / 20}</p>
            <div className="page-break"></div>
          </div>
        )}
        {pageIndex == Object.keys(props.data).length && pageIndex % 20 != 0 && (
          <p className="page-number">Page 1</p>
        )}
      </div>
    ))}
    <div className="page-break"></div>
    {/* second half of columns */}
    {Object.keys(props.data).map((pageIndex) => (
      <div key={pageIndex}>
        {/* First half of the columns */}
        <table className="table">
          {(pageIndex == 1 || pageIndex % 21 == 0) && (
            <thead>
              <tr>
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
                <th>Fund Total</th>
                <th>Grand Total</th>
              </tr>
            </thead>
          )}
          <tbody>
            {Object.keys(props.data[pageIndex]).map((date, index) => (
              <tr key={index}>
                <td>{props.data[pageIndex][date].sum.boardUnivRegExamDues}</td>
                <td>{props.data[pageIndex][date].sum.sportsFund}</td>
                <td>{props.data[pageIndex][date].sum.miscellaneousFund}</td>
                <td>{props.data[pageIndex][date].sum.boardUniProcessingFee}</td>
                <td>{props.data[pageIndex][date].sum.transportFund}</td>
                <td>{props.data[pageIndex][date].sum.burqaFund}</td>
                <td>
                  {props.data[pageIndex][date].sum.collegeExaminationFund}
                </td>
                <td>{props.data[pageIndex][date].sum.computerFee}</td>
                <td>{props.data[pageIndex][date].sum.secondShift}</td>
                <td>{props.data[pageIndex][date].sum.fineFunds}</td>
                <td>
                  {(props.data[pageIndex][date].sum.generalFund || 0) +
                    (props.data[pageIndex][date].sum.studentIdCardFund || 0) +
                    (props.data[pageIndex][date].sum.redCrossFund || 0) +
                    (props.data[pageIndex][date].sum.medicalFee || 0) +
                    (props.data[pageIndex][date].sum.studentWelfareFund || 0) +
                    (props.data[pageIndex][date].sum.scBreakageFund || 0) +
                    (props.data[pageIndex][date].sum.magazineFund || 0) +
                    (props.data[pageIndex][date].sum.librarySecFund || 0) +
                    (props.data[pageIndex][date].sum.boardUnivRegExamDues ||
                      0) +
                    (props.data[pageIndex][date].sum.sportsFund || 0) +
                    (props.data[pageIndex][date].sum.miscellaneousFund || 0) +
                    (props.data[pageIndex][date].sum.boardUniProcessingFee ||
                      0) +
                    (props.data[pageIndex][date].sum.transportFund || 0) +
                    (props.data[pageIndex][date].sum.burqaFund || 0) +
                    (props.data[pageIndex][date].sum.collegeExaminationFund ||
                      0) +
                    (props.data[pageIndex][date].sum.computerFee || 0) +
                    (props.data[pageIndex][date].sum.secondShift || 0) +
                    (props.data[pageIndex][date].sum.fineFunds || 0)}
                </td>
                <td>
                  {(props.data[pageIndex][date].sum.admissionFee || 0) +
                    (props.data[pageIndex][date].sum.tuitionFee || 0) +
                    (props.data[pageIndex][date].sum.generalFund || 0) +
                    (props.data[pageIndex][date].sum.studentIdCardFund || 0) +
                    (props.data[pageIndex][date].sum.redCrossFund || 0) +
                    (props.data[pageIndex][date].sum.medicalFee || 0) +
                    (props.data[pageIndex][date].sum.studentWelfareFund || 0) +
                    (props.data[pageIndex][date].sum.scBreakageFund || 0) +
                    (props.data[pageIndex][date].sum.magazineFund || 0) +
                    (props.data[pageIndex][date].sum.librarySecFund || 0) +
                    (props.data[pageIndex][date].sum.boardUnivRegExamDues ||
                      0) +
                    (props.data[pageIndex][date].sum.sportsFund || 0) +
                    (props.data[pageIndex][date].sum.miscellaneousFund || 0) +
                    (props.data[pageIndex][date].sum.boardUniProcessingFee ||
                      0) +
                    (props.data[pageIndex][date].sum.transportFund || 0) +
                    (props.data[pageIndex][date].sum.burqaFund || 0) +
                    (props.data[pageIndex][date].sum.collegeExaminationFund ||
                      0) +
                    (props.data[pageIndex][date].sum.computerFee || 0) +
                    (props.data[pageIndex][date].sum.secondShift || 0) +
                    (props.data[pageIndex][date].sum.fineFunds || 0)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {Object.keys(props.data).length == pageIndex && (
              <tr>
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
            )}
          </tfoot>
        </table>

        {pageIndex % 20 == 0 && (
          <div>
            <p className="page-number">Page {pageIndex / 20}</p>
            <div className="page-break"></div>
          </div>
        )}
        {pageIndex == Object.keys(props.data).length && pageIndex % 20 != 0 && (
          <p className="page-number">Page 1</p>
        )}
      </div>
    ))}
  </div>
));

export default ClassifiedCashBook;
