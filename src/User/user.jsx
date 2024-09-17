import React, { useContext, useState, useEffect } from "react";
import "./user.css"; // Import the CSS file for styling
import { AuthContext } from "../AuthContext";
import axiosInstance, { setupAxiosInterceptors } from "../axiosConfig";

const User = () => {
  // const { user, token } = useContext(AuthContext);
  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Setup Axios interceptors to include the token in requests
  // useEffect(() => {
  //   if (token) {
  //     setupAxiosInterceptors(token);
  //   }
  // }, [token]);

  // Fetch user-specific data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/user"); // Replace with your actual API endpoint
        console.log("API Response:", response.data.data); // Inspect the data structure
        // console.log(response.data.a)
        setFetchedUserData(response.data.data);
        // Check if the response data is as expected
       
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch data on component mount
    fetchUserData();
  }, []); // add token in dependency if needed

  // Display loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  // Render the main content
  return (
    <div className="challan-container">
      {/* Debugging log to verify data format */}
      {/* <pre>{JSON.stringify(fetchedUserData, null, 2)}</pre> */}

      {/* {Array.isArray(fetchedUserData) && fetchedUserData.length > 0 && (
        <div className="user-data">
          <h2>Fetched User Data:</h2>
          <pre>{JSON.stringify(fetchedUserData, null, 2)}</pre>
        </div>
      )} */}

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
              <th>Type</th>
              <th>Email</th>
              <th>Phone No</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(fetchedUserData) && fetchedUserData.length > 0 ? (
              fetchedUserData.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.type}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  {/* <td>{user.dob || "N/A"}</td> */}
                  {/* <td>{user.rollNo || "N/A"}</td> */}
                  {/* <td>{user.class || "N/A"}</td> */}
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
  );
};

export default User;
