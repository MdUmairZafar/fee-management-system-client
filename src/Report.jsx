import React,{useState} from 'react';
import './report.css';

const Report = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
   const handleDateChange = (e, setDate) => {
    setDate(e.target.value);
  };
  return (
    <div className="challan-container">
    <div className="table-container">
      {/* Search Field and Buttons Above the Table */}
      <div className="top-bar">
        <div className="search-field">
          <input
            type="search"
            name="search-field"
            id=""
            placeholder="Search..."
          />
        </div>
        <div className="top-buttons">
          <button className="action-button">Pending</button>
          <button className="action-button">Done</button>

          <button className="action-button">Generate Challan</button>
          <button className="action-button">Edit Challan Values</button>
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
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>D/O</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Dated</th>
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
              <th>Grand Total</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>12/01/2000</td>
              <td>12345</td>
              <td>10th Grade</td>
              <td>01/08/2023</td>
              <td>$200</td>
              <td>$300</td>
              <td>$50</td>
              <td>$15</td>
              <td>$10</td>
              <td>$30</td>
              <td>$25</td>
              <td>$5</td>
              <td>$10</td>
              <td>$8</td>
              <td>$100</td>
              <td>$20</td>
              <td>$12</td>
              <td>$10</td>
              <td>$40</td>
              <td>$5</td>
              <td>$30</td>
              <td>$20</td>
              <td>$60</td>
              <td>$10</td>
              <td>$985</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>05/02/1998</td>
              <td>67890</td>
              <td>11th Grade</td>
              <td>01/08/2023</td>
              <td>$250</td>
              <td>$350</td>
              <td>$60</td>
              <td>$20</td>
              <td>$12</td>
              <td>$35</td>
              <td>$28</td>
              <td>$6</td>
              <td>$12</td>
              <td>$10</td>
              <td>$110</td>
              <td>$22</td>
              <td>$15</td>
              <td>$12</td>
              <td>$45</td>
              <td>$6</td>
              <td>$35</td>
              <td>$22</td>
              <td>$65</td>
              <td>$12</td>
              <td>$1110</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mike Johnson</td>
              <td>03/03/1997</td>
              <td>54321</td>
              <td>12th Grade</td>
              <td>01/08/2023</td>
              <td>$220</td>
              <td>$320</td>
              <td>$55</td>
              <td>$18</td>
              <td>$11</td>
              <td>$32</td>
              <td>$27</td>
              <td>$7</td>
              <td>$11</td>
              <td>$9</td>
              <td>$105</td>
              <td>$21</td>
              <td>$14</td>
              <td>$11</td>
              <td>$42</td>
              <td>$6</td>
              <td>$32</td>
              <td>$21</td>
              <td>$62</td>
              <td>$11</td>
              <td>$1045</td>
            </tr>
          </tbody>
          <tfoot>
          <tr>
            <td><b>Total 1</b></td>
            <td><b>Total 2</b></td>
            <td><b>Total 3</b></td>
            {/* Add more total/sum data here */}
          </tr>
        </tfoot>
        </table>

        {/* Buttons on the Right Side */}
      </div>
    </div>
  </div>
  );
};

export default Report;
