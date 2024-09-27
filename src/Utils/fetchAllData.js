import { useState, useEffect } from "react";
import axiosInstance from "./axiosConfig";

const useFetchAllPages = (startDate = null, endDate = null) => {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculatePageTotals = (data) => {
    const totals = {
      admissionFee: 0,
      tuitionFee: 0,
      total: 0,
      generalFund: 0,
      studentIdCardFund: 0,
      redCrossFund: 0,
      medicalFee: 0,
      studentWelfareFund: 0,
      scBreakageFund: 0,
      magazineFund: 0,
      librarySecFund: 0,
      boardExamDues: 0,
      sportsFund: 0,
      miscellaneousFund: 0,
      processingFee: 0,
      transportFund: 0,
      burqaFund: 0,
      collegeExamFund: 0,
      computerFee: 0,
      secondShift: 0,
      fineFunds: 0,
      payment: 0,
      grandTotal: 0,
    };

    data.forEach((record) => {
      totals.admissionFee += record.admissionFee || 0;
      totals.tuitionFee += record.tuitionFee || 0;
      totals.total += record.total || 0;
      totals.generalFund += record.generalFund || 0;
      totals.studentIdCardFund += record.studentIdCardFund || 0;
      totals.redCrossFund += record.redCrossFund || 0;
      totals.medicalFee += record.medicalFee || 0;
      totals.studentWelfareFund += record.studentWelfareFund || 0;
      totals.scBreakageFund += record.scBreakageFund || 0;
      totals.magazineFund += record.magazineFund || 0;
      totals.librarySecFund += record.librarySecFund || 0;
      totals.boardExamDues += record.boardExamDues || 0;
      totals.sportsFund += record.sportsFund || 0;
      totals.miscellaneousFund += record.miscellaneousFund || 0;
      totals.processingFee += record.processingFee || 0;
      totals.transportFund += record.transportFund || 0;
      totals.burqaFund += record.burqaFund || 0;
      totals.collegeExamFund += record.collegeExamFund || 0;
      totals.computerFee += record.computerFee || 0;
      totals.secondShift += record.secondShift || 0;
      totals.fineFunds += record.fineFunds || 0;
      totals.payment += record.payment || 0;
      totals.grandTotal += record.grandTotal || 0;
    });

    return totals;
  };

  const fetchAllPages = async () => {
    try {
      setLoading(true);
      setError(null);

      let baseUrl = "/challan?isPaid=true&page=1&limit=25";
      if (startDate) {
        baseUrl += `&startDate=${startDate}`;
      }
      if (endDate) {
        baseUrl += `&endDate=${endDate}`;
      }

      // Fetch first page and determine total pages (capped at 25)
      const firstPageResponse = await axiosInstance.get(baseUrl);
      const totalPages = Math.min(firstPageResponse.data.totalPages, 25);
      let dataByPages = {
        1: {
          data: firstPageResponse.data.data,
          sum: calculatePageTotals(firstPageResponse.data.data), // Sum for the first page
        },
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
        dataByPages[page] = {
          data: response.data.data,
          sum: calculatePageTotals(response.data.data), // Calculate and store sum for each page
        };
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
  }, []);

  console.log("All data:", allData);
  return { allData, loading, error };
};

export default useFetchAllPages;
