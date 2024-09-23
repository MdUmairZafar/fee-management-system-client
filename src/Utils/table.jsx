import "./table.css";
import logo from "../college-logo.png";
const Table = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="empty-field">
        <p>username</p>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button className="sidebar-button">User</button>
        <button className="sidebar-button">Challan</button>
        <button className="sidebar-button">Reports</button>
      </div>

      {/* Button at the Bottom */}
    </div>
  );
};

export default Table;
