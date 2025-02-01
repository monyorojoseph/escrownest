import { useState } from "react";
import DeliverableDetails from "./deliverableDetails";
import PaymentDetails from "./paymentDetails";
import ProductDetails from "./productDetails";
import AgreementReview from "./agreementReview";

export type Agreement = {
  id: string;
  transactionType: string;
  amount: string;
  productName: string;
  description: string;
  costBreakdown?: string;
  deliveryPeriod: string;
  sellerEmail: string;
};

const SellerForm = () => {
    const [formStep, setFormStep] = useState(1);
    const [formData, setFormData] = useState({} as Agreement);

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Create Escrow Agreement</h2>
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {['Basic Details', 'Payment', 'Delivery'].map((label, index) => (
              <div key={label} className="flex-1">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    formStep > index + 1 ? 'bg-green-500' :
                    formStep === index + 1 ? 'bg-sky-500' : 'bg-gray-300'
                  } text-white font-semibold`}>
                    {index + 1}
                  </div>
                  <div className={`flex-1 h-1 ${
                    index < 2 ? (formStep > index + 1 ? 'bg-green-500' : 'bg-gray-300') : 'hidden'
                  }`} />
                </div>
                <div className="text-sm mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {formStep === 1 && <ProductDetails formData={formData} setFormData={setFormData} setFormStep={setFormStep} />}
        {formStep === 2 && <PaymentDetails formData={formData} setFormData={setFormData} setFormStep={setFormStep} />}
        {formStep === 3 && <DeliverableDetails formData={formData} setFormData={setFormData} setFormStep={setFormStep} />}
        {formStep === 4 && <AgreementReview  />}

      </div>
    );
};

export default SellerForm