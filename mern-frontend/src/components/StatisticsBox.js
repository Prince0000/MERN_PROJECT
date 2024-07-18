import React from 'react';

const StatisticsBox = ({ statistics }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex flex-col space-y-2">
        <div>Total Sale Amount: {statistics.totalSale}</div>
        <div>Total Sold Items: {statistics.totalSold}</div>
        <div>Total Not Sold Items: {statistics.totalNotSold}</div>
      </div>
    </div>
  );
};

export default StatisticsBox;
