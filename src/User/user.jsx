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
  const [trigger, setTrigger] = useState(false);

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
  }, [selectedUser, modalOpen, trigger]);

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

  const deleteUser = async () => {
    if (selectedUser) {
      console.log("Selected Row Data:", selectedUser);

      // Confirm before deletion
      const confirmDelete = window.confirm(
        "Are you sure you want to delete user?"
      );
      if (!confirmDelete) {
        return;
      }

      try {
        // Send delete request to the backend
        const id = selectedUser._id.trim();
        const response = await axiosInstance.delete(`/user/${id}`);
        console.log("Delete Response:", response);

        if (response.status === 200 || response.status === 204) {
          alert("User deleted successfully.");

          setTrigger(!trigger); // Trigger a re-render to fetch updated data

          // Clear the selected user after deletion
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user. Please try again.");
      }
    } else {
      console.log("No row selected");
      alert("Please select a user to delete.");
    }
  };

  // Display loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="challan-container">
      <div className="table-container">
        <div className="top-bar-user">
          <button onClick={deleteUser} className="delete-button">
            delete
          </button>
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
