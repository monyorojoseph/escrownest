import React from 'react';
import { format } from 'date-fns';

interface Dispute {
  id: string;
  agreementId: string;
  transactionId: string;
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  reason: 'payment' | 'service' | 'refund' | 'other';
  createdAt: Date;
  updatedAt: Date;
  amount: number;
}

const sampleDisputes: Dispute[] = [
  {
    id: 'disp_1',
    agreementId: 'AGR-001',
    transactionId: 'tr_1',
    status: 'open',
    reason: 'payment',
    createdAt: new Date('2024-03-15T10:30:00'),
    updatedAt: new Date('2024-03-15T10:30:00'),
    amount: 1500.00
  },
  {
    id: 'disp_2',
    agreementId: 'AGR-002',
    transactionId: 'tr_3',
    status: 'under_review',
    reason: 'refund',
    createdAt: new Date('2024-03-13T09:20:00'),
    updatedAt: new Date('2024-03-14T15:45:00'),
    amount: 750.00
  }
];

const getStatusColor = (status: Dispute['status']) => {
  switch (status) {
    case 'open':
      return 'text-red-600 bg-red-50';
    case 'under_review':
      return 'text-yellow-600 bg-yellow-50';
    case 'resolved':
      return 'text-green-600 bg-green-50';
    case 'closed':
      return 'text-gray-600 bg-gray-50';
  }
};

const getReasonColor = (reason: Dispute['reason']) => {
  switch (reason) {
    case 'payment':
      return 'text-blue-600';
    case 'service':
      return 'text-purple-600';
    case 'refund':
      return 'text-orange-600';
    case 'other':
      return 'text-gray-600';
  }
};

const Disputes: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-6">Disputes</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agreement ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleDisputes.map((dispute) => (
                <tr key={dispute.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {dispute.agreementId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dispute.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-medium ${getReasonColor(dispute.reason)}`}>
                      {dispute.reason.charAt(0).toUpperCase() + dispute.reason.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${dispute.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(dispute.status)}`}>
                      {dispute.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(dispute.createdAt, 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(dispute.updatedAt, 'MMM d, yyyy HH:mm')}
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

export default Disputes; 