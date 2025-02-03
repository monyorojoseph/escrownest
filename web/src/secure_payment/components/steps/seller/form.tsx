import { useEffect, useState } from "react";
import DeliverableDetails from "./deliverableDetails";
import PaymentDetails from "./paymentDetails";
import ProductDetails from "./productDetails";
import AgreementReview from "./agreementReview";
import axiosInstance from "../../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { AgreementUserType } from "../../..";
import ProgressStep from "../progressStep";

export type AgreementInputData = {
    buyer_email: string;
    name: string;
    amount: string;
    amount_breakdown: any;
    description: string;
    document?: File;
    transaction_type: string;
    days_to_deliver: string;
    extra_data?: any;
}

const SellerForm = ({setUserType}: {setUserType: (userType: AgreementUserType) => void}) => {
    const [formStep, setFormStep] = useState(1);
    const [formInputData, setFormInputData] = useState({} as AgreementInputData);
    const [agreement, setAgreement] = useState({} as any);

    const formData = new FormData();

    useEffect(() => {
        formData.append('buyer_email', formInputData.buyer_email);
        formData.append('name', formInputData.name);
        formData.append('amount', formInputData.amount);
        formData.append('transaction_type', formInputData.transaction_type);
        formData.append('description', formInputData.description);
        formData.append('days_to_deliver', formInputData.days_to_deliver);
        // optional fields
        formInputData.amount_breakdown && formData.append('amount_breakdown', formInputData.amount_breakdown);
        formInputData.document && formData.append('document', formInputData.document);
        formInputData.extra_data && formData.append('extra_data', formInputData.extra_data);
    }, [formInputData])

    const handleSubmit = async() => {
        const toastId = toast.loading('Creating agreement...');
        const response = await axiosInstance.post('/api/payment-agreement/create/', formData) as AxiosResponse;
        console.log({ response });
        if(response?.status === 201) {
          setAgreement(response.data);
          toast.update(toastId, {
            render: 'Agreement created successfully',
            type: 'success', isLoading: false, autoClose: 1000 });
          setFormStep(4);
        } else {
          toast.update(toastId, {
            render: 'Failed to create agreement',
            type: 'error', isLoading: false, autoClose: 1000 });
        }
      }

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-6">Create Escrow Agreement</h2>
          <button onClick={() => {
                setUserType("")
                setFormInputData({} as AgreementInputData)
              }} 
            className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Progress Steps */}
        <ProgressStep steps={['Basic Details', 'Payment', 'Deliverable', "Review"]} step={formStep} />

        {formStep === 1 && 
        <ProductDetails formInputData={formInputData} 
          setFormInputData={setFormInputData} setFormStep={setFormStep} />}
        {formStep === 2 && 
        <PaymentDetails formInputData={formInputData} 
          setFormInputData={setFormInputData} setFormStep={setFormStep} />}
        {formStep === 3 && 
        <DeliverableDetails formInputData={formInputData} 
          setFormInputData={setFormInputData} setFormStep={setFormStep} handleSubmit={handleSubmit} />}
        {formStep === 4 && <AgreementReview agreement={agreement} />}

      </div>
    );
};

export default SellerForm