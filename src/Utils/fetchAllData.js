import { useState, useEffect } from "react";
import axiosInstance from "./axiosConfig";

const useFetchAllPages = (startDate = null, endDate = null) => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const fetchAllPages = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build the base URL with optional query parameters
      let baseUrl = "/challan?page=1";
      if (startDate) {
        baseUrl += `&startDate=${startDate}`;
      }
      if (endDate) {
        baseUrl += `&endDate=${endDate}`;
      }

      // Fetch first page and determine total pages
      const firstPageResponse = await axiosInstance.get(baseUrl);
      const totalPages = firstPageResponse.data.totalPages; // Assuming `totalPages` is returned
      let allData = firstPageResponse.data.data;

      // Fetch remaining pages
      for (let page = 2; page <= totalPages; page++) {
        let url = `/challan?page=${page}`;
        if (startDate) {
          url += `&startDate=${startDate}`;
        }
        if (endDate) {
          url += `&endDate=${endDate}`;
        }

        const response = await axiosInstance.get(url);
        allData = [...allData, ...response.data.data];
      }

      setAllData(allData);
    } catch (err) {
      console.error("Error fetching all data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPages();
  }, [startDate, endDate]); // Re-fetch data when dates change

  return { allData, loading, error };
};

export default useFetchAllPages;
