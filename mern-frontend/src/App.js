// Import necessary modules and components from React and other libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import StatisticsBox from './components/StatisticsBox';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  // State variables to manage application data and UI states
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChart, setBarChart] = useState({});
  const [pieChart, setPieChart] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [month, setMonth] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  // useEffect hook to fetch data when certain state variables change
  useEffect(() => {
    fetchData();
  }, [month, searchTerm, currentPage]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      // Fetch transactions data based on selected month, search term, and pagination
      const response = await axios.get(`http://localhost:5000/api/transactions`, {
        params: {
          month,
          search: searchTerm,
          page: currentPage,
          perPage
        }
      });
      const fetchedTransactions = response.data.transactions;
      setTransactions(fetchedTransactions);
      setTotalItems(response.data.totalCount);

      // Disable the "Next" button if no data is found or if the current page is the last page
      setIsNextDisabled(fetchedTransactions.length === 0 || currentPage === Math.ceil(response.data.totalCount / perPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    try {
      // Fetch statistics, bar chart data, and pie chart data based on the selected month
      const statisticsResponse = await axios.get(`http://localhost:5000/api/statistics?month=${month}`);
      const barChartResponse = await axios.get(`http://localhost:5000/api/bar-chart?month=${month}`);
      const pieChartResponse = await axios.get(`http://localhost:5000/api/pie-chart?month=${month}`);

      setStatistics(statisticsResponse.data);
      setBarChart(barChartResponse.data);
      setPieChart(pieChartResponse.data);
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };

  // Handler function to update the current page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handler function to update the search term
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-4">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-center">Transactions Dashboard</h1>
      </div>

      {/* Filters */}
      <div className="flex justify-between mb-4">
        {/* Month selection dropdown */}
        <div>
          <label className="block mb-2">Select Month</label>
          <select
            value={month}
            onChange={(e) => { setMonth(e.target.value); setCurrentPage(1); }}
            className="p-2 border rounded-md w-full sm:w-auto"
          >
            {[...Array(12).keys()].map((m) => (
              <option key={m + 1} value={m + 1}>
                {new Date(0, m).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        {/* Search input */}
        <div className="ml-4 w-1/4">
          <label className="block mb-2">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 rounded-md w-full border-b-4 border-black outline-none"
            placeholder='Search Transactions (Title, Description, Category)'
          />
        </div>
      </div>

      {/* Transactions table */}
      <TransactionsTable transactions={transactions} currentPage={currentPage} perPage={perPage} />

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mr-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 text-white'} rounded-md`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 ${isNextDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 text-white'} rounded-md`}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>

      {/* Display Page Number and Total Items */}
      <div className="flex justify-center mt-4">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {Math.ceil(totalItems / perPage)} ({totalItems} items)
        </p>
      </div>

      {/* Charts and statistics */}
      <div className='flex justify-center flex-wrap gap-4 mt-20'>
        {/* Statistics box */}
        <div className="w-full lg:w-4/5 bg-red-300 rounded-xl overflow-hidden shadow-lg mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800">Statistics - {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <StatisticsBox statistics={statistics} />
          </div>
        </div>

        {/* Bar chart */}
        <div className="w-full lg:w-7/12 bg-sky-50 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800">Bar Chart Stats - {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <BarChart data={barChart} />
          </div>
        </div>

        {/* Pie chart */}
        <div className="w-full lg:w-4/12 bg-sky-50 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800">Pie Chart Stats - {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <PieChart data={pieChart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
