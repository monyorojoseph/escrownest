import React from 'react';

interface Agreement {
  id: string;
  productName: string;
  amount: number;
  transactionType: 'Full Payment' | 'Down Payment';
  deadline: string;
  status: 'Active' | 'Pending' | 'Completed' | 'Overdue';
  createdAt: string;
  paymentMethod: string;
}

const Agreements: React.FC = () => {
  // Mock data - replace with actual API call later
  const agreements: Agreement[] = [
    {
      id: '1',
      productName: 'Premium Package',
      amount: 299.99,
      transactionType: 'Full Payment',
      deadline: '2024-12-31',
      status: 'Active',
      createdAt: '2024-03-15T10:30:00',
      paymentMethod: 'Credit Card',
    },
    {
      id: '2',
      productName: 'Professional Services',
      amount: 1499.99,
      transactionType: 'Down Payment',
      deadline: '2024-06-30',
      status: 'Pending',
      createdAt: '2024-03-14T15:45:00',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: '3',
      productName: 'Basic Plan',
      amount: 49.99,
      transactionType: 'Full Payment',
      deadline: '2024-03-20',
      status: 'Completed',
      createdAt: '2024-03-01T09:15:00',
      paymentMethod: 'PayPal',
    },
  ];

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
          {agreements.map((agreement) => (
            <div key={agreement.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{agreement.productName}</h3>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${agreement.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  agreement.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  agreement.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
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
                  <span>Payment Type:</span>
                  <span>{agreement.transactionType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>{agreement.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadline:</span>
                  <span>{new Date(agreement.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{formatDateTime(agreement.createdAt)}</span>
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
                  Payment Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
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
              {agreements.map((agreement) => (
                <tr key={agreement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agreement.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(agreement.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agreement.transactionType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agreement.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(agreement.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(agreement.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${agreement.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      agreement.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      agreement.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
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