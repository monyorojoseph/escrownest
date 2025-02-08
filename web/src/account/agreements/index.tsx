import React from 'react';
import { AgreementType } from '../../types/agreement.type';
import { getAgreements } from '../../hooks/getAgreements';
import MobileCardView from './components/mobileCardView';
import TableRow from './components/tableRow';
import axiosInstance from '../../services/axios';
import { toast } from 'react-toastify';



const Agreements: React.FC = () => {
  const { agreements, isLoading, mutate } = getAgreements();


  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting agreement...");
    const response = await axiosInstance.delete(`/api/payment-agreement/${id}/delete/`);
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
    const response = await axiosInstance.get(`/api/payment-agreement//${id}/edit`);
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
    const response = await axiosInstance.get(`/api/payment-agreement/${id}dispute//`);
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
      
      {/* Mobile view - card layout */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {agreements.map((agreement: AgreementType) => (
            <MobileCardView agreement={agreement} handleDelete={handleDelete} handleEdit={handleEdit} />))}
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
                  Deadline
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
                handleView={handleView} handleDispute={handleDispute} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Agreements; 