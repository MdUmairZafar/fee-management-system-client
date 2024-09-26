import "./sidebar.css";
import logo from "../college-logo.png";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User: ", user);
  const isAdmin = user.type === "admin";
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="empty-field">
        <h3>{user.name}</h3>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button
          onClick={() => navigate("/user", { replace: true })}
          className={isAdmin ? "sidebar-button" : "sidebar-button-disabled"}
          disabled={!isAdmin}
        >
          User
        </button>
        <button
          onClick={() => navigate("/challan", { replace: true })}
          className="sidebar-button"
        >
          Challan
        </button>
        <button
          onClick={() => navigate("/report", { replace: true })}
          className={isAdmin ? "sidebar-button" : "sidebar-button-disabled"}
          disabled={!isAdmin}
        >
          Reports
        </button>
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/", { replace: true });
          }}
          className="sidebar-button"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
