import React from 'react';

const TransactionsTable = ({ transactions, currentPage, perPage }) => {
  // Calculate the starting index based on current page and perPage
  const startIndex = (currentPage - 1) * perPage + 1;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sold</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date of Sale</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={transaction._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="px-6 py-4  text-sm ">{startIndex + index}</td>
                <td className="px-6 py-4  text-sm">{transaction.title}</td>
                <td className="px-6 py-4  text-sm text-black-500 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs cursor-pointer" title={transaction.description}>{transaction.description}</td>
                <td className="px-6 py-4  text-sm text-black-500">{transaction.price}</td>
                <td className="px-6 py-4  text-sm text-black-500">{transaction.category}</td>
                <td className="px-6 py-4  text-sm text-black-500">{transaction.sold ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4  text-sm text-black-500">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                <td className="px-6 py-4 ">
                  <img src={transaction.image} alt={transaction.title} className="h-8 w-8 object-cover" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-4  text-sm text-black text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
