import React, { useState } from 'react';
import { AgreementType } from '../../types/agreement.type';
import { getAgreements } from '../../hooks/getAgreements';
import TableRow from './components/tableRow';
import { toast } from 'react-toastify';
import { deleteItem, fetcher } from '../../services/utils';
import { AxiosResponse } from 'axios';


const Agreements: React.FC = () => {
  const { agreements, isLoading, mutate } = getAgreements();
  const [searchTerm, setSearchTerm] = useState('');


  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting agreement...");
    const response = await deleteItem(`/api/payment-agreement/${id}/delete/`) as AxiosResponse;
    if(response.status === 200){
      await mutate();
      toast.update(toastId, {
        render: "Agreement deleted successfully",
        type: "success", isLoading: false, autoClose: 3000 });
    }else{
      toast.update(toastId, {
        render: "Failed to delete agreement",
        type: "error", isLoading: false, autoClose: 3000 });
    }
  }

  const handleEdit = async (id: string) => {
    const toastId = toast.loading("Editing agreement...");
    const response = await fetcher(`/api/payment-agreement//${id}/edit`) as AxiosResponse;
    if(response.status === 200){
      await mutate();
      toast.update(toastId, {
        render: "Agreement edited successfully",
        type: "success", isLoading: false, autoClose: 3000 });
    }else{
      toast.update(toastId, {
        render: "Failed to edit agreement",
        type: "error", isLoading: false, autoClose: 3000 });
    }
  } 

  const handleView = (id: string) => {
    console.log(id);
  }

  const handleDispute = async (id: string) => {
    const toastId = toast.loading("Disputing agreement...");
    const response = await fetcher(`/api/payment-agreement/${id}dispute//`) as AxiosResponse;
    if(response.status === 200){
      await mutate();
      toast.update(toastId, {
        render: "Agreement disputed successfully",
        type: "success", isLoading: false, autoClose: 3000 });
    }else{
      toast.update(toastId, {
        render: "Failed to dispute agreement",
        type: "error", isLoading: false, autoClose: 3000 });
    }
  } 

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Agreements</h1>
      <div className="mb-6 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search agreements..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm 
            placeholder:text-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500
            transition duration-200"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : agreements && agreements.length > 0 ? (
        <>
          {/* Desktop view - table layout */}
          <div className="overflow-x-auto">
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
                      Deadline In
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agreements.map((agreement: AgreementType) => (
                    <TableRow agreement={agreement} handleDelete={handleDelete} handleEdit={handleEdit} 
                    handleDispute={handleDispute} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-48">
          <p className="text-gray-500 text-lg">No agreements found</p>
          <p className="text-gray-400 text-sm mt-2">Create a new agreement to get started</p>
        </div>
      )}
    </div>
  );
};

export default Agreements; 