import axios from "axios";

let currentToken = null; // Variable to store the current token

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", // Replace with your API base URL
});

export const setupAxiosInterceptors = (token) => {
  currentToken = token; // Store the token in a variable

  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// Utility function to check if the token is set in the interceptor
export const isTokenSet = () => {
  return currentToken !== null;
};

export default axiosInstance;
