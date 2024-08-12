import "./table.css";
import logo from "../src/Screenshot_2024-07-24-20-10-02-365_com.miui.videoplayer.png";
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
        <button className="sidebar-button">Home</button>
        <button className="sidebar-button">About</button>
        <button className="sidebar-button">Services</button>
      </div>

      {/* Empty Field */}

      {/* Button at the Bottom */}
      <div className="bottom-button">
        <button className="sidebar-button">Submit</button>
      </div>
    </div>
  );
};

export default Table;
