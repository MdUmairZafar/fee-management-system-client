import React, { useContext, useState, useEffect } from "react";
import "./challan.css"; // Import the CSS file for styling
import { AuthContext } from "./AuthContext";
import axiosInstance, { setupAxiosInterceptors } from "./axiosConfig";

const User = () => {
  const { user, token } = useContext(AuthContext);
  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Setup Axios interceptors to include the token in requests
  useEffect(() => {
    if (token) {
      setupAxiosInterceptors(token);
    }
  }, [token]);

  // Fetch user-specific data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/user/data"); // Replace with your actual API endpoint
        setFetchedUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  // Display loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  // Render the main content
  return (
    <div className="challan-container">
      {fetchedUserData && (
        <div className="user-data">
          <h2>Fetched User Data:</h2>
          <pre>{JSON.stringify(fetchedUserData, null, 2)}</pre>
        </div>
      )}

      <div className="table-container">
        <div className="top-bar"></div>
        <div className="top-buttons">
          <button className="action-button">Edit Challan Values</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>D/O</th>
              <th>Roll No</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamically render rows based on fetched data */}
            {fetchedUserData.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.dob || "N/A"}</td> {/* Assuming dob is part of the data */}
                <td>{user.rollNo || "N/A"}</td> {/* Assuming rollNo is part of the data */}
                <td>{user.class || "N/A"}</td> {/* Assuming class is part of the data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
