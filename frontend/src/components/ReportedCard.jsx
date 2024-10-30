import React, { useState, useEffect } from "react";
import { Calendar, ExternalLink, Trash2 } from "lucide-react";
import SearchInput from "./SearchInput";
import { getUserFraudReports } from "../services/api";

const ReportedCard = () => {
  const [allReports, setAllReports] = useState([]);
  const [displayedReports, setDisplayedReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    phoneNumber: "",
    status: "All status",
    timeframe: "All time",
  });
  const itemsPerPage = 10;

  useEffect(() => {
    fetchReports();
  }, [filters]);

  useEffect(() => {
    paginateReports();
  }, [allReports, currentPage]);

  const fetchReports = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};

      if (filters.phoneNumber.trim() !== "") {
        params.phoneNumber = filters.phoneNumber.trim();
      }
      if (filters.status !== "All status") {
        params.status = filters.status;
      }
      if (filters.timeframe !== "All time") {
        params.timeframe = filters.timeframe;
      }

      const response = await getUserFraudReports(params);
      setAllReports(response.reports);
      setTotalPages(Math.ceil(response.reports.length / itemsPerPage));
      setCurrentPage(1);
    } catch (err) {
      // console.error("Error fetching reports:", err);?
      setError(
        err.message || "Failed to fetch reports. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const paginateReports = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedReports(allReports.slice(startIndex, endIndex)); 
    console.table(allReports)
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = (searchTerm) => {
    setFilters((prevFilters) => ({ ...prevFilters, phoneNumber: searchTerm }));
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-xl font-semibold mb-4 md:mb-0">
          {allReports.length} Reported Cases
        </h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <SearchInput
            onSearch={handleSearch}
            className="w-full md:w-64"
            placeholder="Search phone number"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto"
          >
            <option value="All status">All Status</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <select
            name="timeframe"
            value={filters.timeframe}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto"
          >
            <option value="All time">All time</option>
            <option value="Today">Today</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last month">Last month</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">
                NAME
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">
                PHONE NUMBER
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">
                NETWORK
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">
                DATE REPORTED
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">
                STATUS
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">
                COMMENT
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {displayedReports.map((report) => (
              <tr key={report._id} className="border-t border-gray-200">
                <td className="py-3 px-4">
                  {report.fraudFirstName} {report.fraudLastName}
                </td>
                <td className="py-3 px-4">{report.fraudPhoneNumber}</td>
                <td className="py-3 px-4">{report.mobileMoneyProvider}</td>
                <td className="py-3 px-4">
                  <Calendar className="inline mr-2" size={16} />
                  {new Date(report.dateReported).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      report.status === "Public"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {report.fraudDescription &&
                  report.fraudDescription.length > 30
                    ? `${report.fraudDescription.substring(0, 30)}...`
                    : report.fraudDescription || "N/A"}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <ExternalLink
                      className="text-blue-500 cursor-pointer"
                      size={16}
                    />
                    <Trash2 className="text-red-500 cursor-pointer" size={16} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportedCard;
