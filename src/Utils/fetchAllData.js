import { useState, useEffect } from "react";
import axiosInstance from "./axiosConfig";

const useFetchAllPages = (startDate = null, endDate = null) => {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllPages = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build the base URL with optional query parameters, limit set to 25
      let baseUrl = "/challan?isPaid=true&page=1&limit=25";
      if (startDate) {
        baseUrl += `&startDate=${startDate}`;
      }
      if (endDate) {
        baseUrl += `&endDate=${endDate}`;
      }

      // Fetch first page and determine total pages (capped at 25)
      const firstPageResponse = await axiosInstance.get(baseUrl);
      const totalPages = Math.min(firstPageResponse.data.totalPages, 25); // Limit to 25 pages
      let dataByPages = {
        1: firstPageResponse.data.data, // Store first page data
      };

      // Fetch remaining pages up to the limit of 25 pages
      for (let page = 2; page <= totalPages; page++) {
        let url = `/challan?isPaid=true&page=${page}&limit=25`;
        if (startDate) {
          url += `&startDate=${startDate}`;
        }
        if (endDate) {
          url += `&endDate=${endDate}`;
        }

        const response = await axiosInstance.get(url);
        dataByPages[page] = response.data.data; // Store each page data by page number
      }

      setAllData(dataByPages);
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
  console.log("All data:", allData);
  return { allData, loading, error };
};

export default useFetchAllPages;
