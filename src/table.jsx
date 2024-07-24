import "./table.css";
const Table = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img src="https://via.placeholder.com/100" alt="Logo" />
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
