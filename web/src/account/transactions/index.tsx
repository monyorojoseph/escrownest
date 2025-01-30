import React from 'react';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  agreementId: string;
  amount: number;
  transactionCharge: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  type: 'payment' | 'deposit' | 'refund';
  description: string;
}

const sampleTransactions: Transaction[] = [
  {
    id: 'tr_1',
    agreementId: 'AGR-001',
    amount: 1500.00,
    transactionCharge: 45.00,
    status: 'completed',
    timestamp: new Date('2024-03-15T10:30:00'),
    type: 'payment',
    description: 'Payment to buyer'
  },
  {
    id: 'tr_2',
    agreementId: 'AGR-001',
    amount: 1500.00,
    transactionCharge: 45.00,
    status: 'completed',
    timestamp: new Date('2024-03-14T15:45:00'),
    type: 'deposit',
    description: 'Deposit by seller'
  },
  {
    id: 'tr_3',
    agreementId: 'AGR-002',
    amount: 750.00,
    transactionCharge: 22.50,
    status: 'completed',
    timestamp: new Date('2024-03-13T09:20:00'),
    type: 'refund',
    description: 'Refund to seller'
  }
];

const getStatusColor = (status: Transaction['status']) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-50';
    case 'pending':
      return 'text-yellow-600 bg-yellow-50';
    case 'failed':
      return 'text-red-600 bg-red-50';
  }
};

const getTypeColor = (type: Transaction['type']) => {
  switch (type) {
    case 'payment':
      return 'text-blue-600';
    case 'deposit':
      return 'text-purple-600';
    case 'refund':
      return 'text-orange-600';
  }
};

const Transactions: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-6">Transactions</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agreement ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Charge
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.agreementId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${transaction.transactionCharge.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(transaction.timestamp, 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions; 