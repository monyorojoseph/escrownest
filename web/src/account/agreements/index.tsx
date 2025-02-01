import React from 'react';
import { AgreementType } from '../../types/agreement.type';
import { getAgreements } from '../../hooks/getAgreements';

const Agreements: React.FC = () => {
  const { agreements, isLoading } = getAgreements();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Agreements</h1>
      
      {/* Mobile view - card layout */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {agreements.map((agreement: AgreementType) => (
            <div key={agreement.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{agreement.name}</h3>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${agreement.status === 'active' ? 'bg-green-100 text-green-800' : 
                  agreement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  agreement.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'}`}>
                  {agreement.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">{formatCurrency(agreement.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction Type:</span>
                  <span>{agreement.transaction_type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadline:</span>
                  <span>{agreement.days_to_deliver} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{formatDateTime(agreement.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view - table layout */}
      <div className="hidden sm:block">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product/Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agreements.map((agreement: AgreementType) => (
                <tr key={agreement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agreement.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(agreement.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agreement.transaction_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agreement.days_to_deliver} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(agreement.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${agreement.status === 'active' ? 'bg-green-100 text-green-800' : 
                      agreement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      agreement.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'}`}>
                      {agreement.status}
                    </span>
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

export default Agreements; 