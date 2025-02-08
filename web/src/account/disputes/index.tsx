import React from 'react';

interface Dispute {
  id: string;
  subject: string;
  transactionId: string;
  amount: number;
  status: 'Open' | 'Under Review' | 'Resolved' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  lastUpdated: string;
}

const Disputes: React.FC = () => {
  // Mock data - replace with actual API call later
  const disputes: Dispute[] = [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const EmptyState = () => (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <div className="text-4xl mb-4">⚖️</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Disputes</h3>
      <p className="text-gray-500">
        You don't have any active disputes at the moment
      </p>
    </div>
  );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Disputes</h1>
      
      {disputes.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Mobile view - card layout */}
          <div className="block sm:hidden">
            <div className="space-y-4">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{dispute.subject}</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${dispute.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : 
                      dispute.status === 'Under Review' ? 'bg-blue-100 text-blue-800' : 
                      dispute.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'}`}>
                      {dispute.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span>{dispute.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">{formatCurrency(dispute.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Priority:</span>
                      <span className={`font-medium ${
                        dispute.priority === 'High' ? 'text-red-600' :
                        dispute.priority === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>{dispute.priority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span>{formatDateTime(dispute.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>{formatDateTime(dispute.lastUpdated)}</span>
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
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disputes.map((dispute) => (
                    <tr key={dispute.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dispute.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dispute.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(dispute.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-medium ${
                          dispute.priority === 'High' ? 'text-red-600' :
                          dispute.priority === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {dispute.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(dispute.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(dispute.lastUpdated)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${dispute.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : 
                          dispute.status === 'Under Review' ? 'bg-blue-100 text-blue-800' : 
                          dispute.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'}`}>
                          {dispute.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Disputes;