import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:3001/api", // Replace with your API base URL
});

export const setupAxiosInterceptors = (token) => {
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export default axiosInstance;
