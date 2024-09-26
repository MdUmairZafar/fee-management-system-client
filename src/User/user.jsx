import React, { useState, useEffect, useContext } from "react";
import "./user.css"; // Import the CSS file for styling
import axiosInstance, { isTokenSet } from "../Utils/axiosConfig";
import UserModal from "./UserModal/userModal";

const User = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch user-specific data from the backend
  useEffect(() => {
    console.log("Token: ", token);
    console.log("User: ", user);
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/user"); // Replace with your actual API endpoint
        setFetchedUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (isTokenSet()) {
      // Fetch data on component mount
      fetchUserData();
    }
  }, [selectedUser, modalOpen]);

  const handleModalClose = () => {
    setModalOpen(!modalOpen); // This will trigger a re-render
  };

  // Handle row double-click event
  const handleRowDoubleClick = (user) => {
    if (selectedUser && selectedUser._id === user._id) {
      setSelectedUser(null); // Deselect if it's already selected
    } else {
      setSelectedUser(user); // Select the user
    }
  };

  // Display loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="challan-container">
      <div className="table-container">
        <div className="top-bar-user">
          <UserModal buttonName="Create User" close={handleModalClose} />
          {selectedUser ? (
            <UserModal
              buttonName="Edit User"
              values={selectedUser}
              close={handleModalClose}
            />
          ) : (
            <UserModal
              buttonName="Edit User"
              isDisabled={true}
              close={handleModalClose}
            />
          )}
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Name</th>
                <th>Type</th>
                <th>Email</th>
                <th>Phone No</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(fetchedUserData) && fetchedUserData.length > 0 ? (
                fetchedUserData.map((user, index) => (
                  <tr
                    key={user._id}
                    onDoubleClick={() => handleRowDoubleClick(user)}
                    className={
                      selectedUser && selectedUser._id === user._id
                        ? "selected-row"
                        : ""
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.type}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
