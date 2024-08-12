import React, { useContext, useState, useEffect } from "react";
import "./challan.css"; // Import the CSS file for styling
import { AuthContext } from "./AuthContext";
import axiosInstance, { setupAxiosInterceptors } from "./axiosConfig";

const User = () => {
  const { user, token } = useContext(AuthContext);
  const [fetchedUserData, setFetchedUserData] = useState(null);

  useEffect(() => {
    // Set up Axios interceptors with the token
    if (token) {
      setupAxiosInterceptors(token);
    }
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user-specific data
        const response = await axiosInstance.get("/user/data"); // Replace with your actual API endpoint
        setFetchedUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Optionally, display an error message to the user
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

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
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>01/01/2000</td>
              <td>12345</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
