import React from 'react';
import './report.css';

const Report = () => {
  return (
    <div className="table-container">
       
      <div className="top-bar">
        <button className="btn">Pending</button>
        <button className="btn">Done</button>
        <input type="date" className="date-picker" />
        </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {/* Populate your table rows here */}
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
          </tr>
        </tbody>
          <tfoot>
          <tr>
            <td>Total 1</td>
            <td>Total 2</td>
            <td>Total 3</td>
            {/* Add more total/sum data here */}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Report;
