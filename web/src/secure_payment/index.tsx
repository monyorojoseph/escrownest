import { useState } from 'react';
import { ArrowRight, User, Store } from 'lucide-react';

type UserType = 'seller' | 'buyer' | '';
type Agreement = {
  id: string;
  transactionType: string;
  amount: string;
  productName: string;
  description: string;
  costBreakdown?: string;
  deliveryPeriod: string;
  sellerEmail: string;
};

const SecurePayment = () => {
  const [userType, setUserType] = useState<UserType>('');
  const [step, setStep] = useState(1);
  const [agreementId, setAgreementId] = useState('');
  const [agreement, setAgreement] = useState<Agreement | null>(null);
  
  const [formData, setFormData] = useState({
    transactionType: '',
    amount: '',
    productName: '',
    description: '',
    costBreakdown: '',
    deliveryPeriod: '',
    sellerEmail: ''
  });

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const generateAgreementId = () => {
    // In real implementation, this would come from the backend
    return 'ESC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const fetchAgreement = (id: string) => {
    // In real implementation, this would be an API call
    // Mocked for demo
    setAgreement({
      id,
      ...formData
    });
  };

  const UserTypeSelection = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Select Your Role</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => {
            setUserType('buyer');
            setStep(2);
          }}
          className="p-6 border rounded-lg flex items-center gap-3 hover:border-sky-500 hover:bg-sky-50"
        >
          <User className="w-8 h-8 text-sky-500" />
          <div className="text-left">
            <div className="font-medium">I'm a Buyer</div>
            <div className="text-sm text-gray-500">Pay for an existing escrow agreement</div>
          </div>
        </button>

        <button
          onClick={() => {
            setUserType('seller');
            setStep(2);
          }}
          className="p-6 border rounded-lg flex items-center gap-3 hover:border-sky-500 hover:bg-sky-50"
        >
          <Store className="w-8 h-8 text-sky-500" />
          <div className="text-left">
            <div className="font-medium">I'm a Seller</div>
            <div className="text-sm text-gray-500">Create a new escrow agreement</div>
          </div>
        </button>
      </div>
    </div>
  );

  const BuyerAgreementInput = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Enter Agreement Details</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Escrow Agreement ID
          </label>
          <input
            type="text"
            value={agreementId}
            onChange={(e) => setAgreementId(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="ESC-XXXXXX"
          />
        </div>

        <button
          onClick={() => {
            fetchAgreement(agreementId);
            handleNext();
          }}
          className="w-full bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600"
        >
          Look Up Agreement
        </button>
      </div>
    </div>
  );

  const SellerForm = () => {
    const [formStep, setFormStep] = useState(1);

    const Step1_BasicDetails = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Basic Details</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
            rows={3}
            placeholder="Describe the product or service"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => setFormStep(2)}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );

    const Step2_PaymentDetails = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="pl-8 w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost Breakdown (Optional)
          </label>
          <textarea
            name="costBreakdown"
            value={formData.costBreakdown}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
            rows={2}
            placeholder="Break down the costs (optional)"
          />
        </div>

        <div className="pt-4 flex justify-between">
          <button
            onClick={() => setFormStep(1)}
            className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={() => setFormStep(3)}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );

    const Step3_DeliveryDetails = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Delivery Details</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Period
          </label>
          <input
            type="text"
            name="deliveryPeriod"
            value={formData.deliveryPeriod}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
            placeholder="e.g., 14 days"
          />
          <p className="mt-1 text-sm text-gray-500">
            This is the period within which you must deliver the product/service
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buyer's Email
          </label>
          <input
            type="email"
            name="sellerEmail"
            value={formData.sellerEmail}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
            placeholder="buyer@email.com"
          />
          <p className="mt-1 text-sm text-gray-500">
            The buyer will receive escrow agreement details at this email
          </p>
        </div>

        <div className="pt-4 flex justify-between">
          <button
            onClick={() => setFormStep(2)}
            className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={() => {
              const id = generateAgreementId();
              setAgreement({ id, ...formData });
              handleNext();
            }}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
          >
            Create Agreement <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );

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

        {formStep === 1 && <Step1_BasicDetails />}
        {formStep === 2 && <Step2_PaymentDetails />}
        {formStep === 3 && <Step3_DeliveryDetails />}
      </div>
    );
  };

  const AgreementReview = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">
        {userType === 'seller' ? 'Agreement Created!' : 'Review Agreement'}
      </h2>
      
      {userType === 'seller' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Share this Agreement ID with the buyer:</div>
            <div className="text-2xl font-mono font-bold text-green-600">{agreement?.id}</div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid gap-4">
            <div>
              <div className="text-sm text-gray-500">Product Name</div>
              <div className="font-medium">{agreement?.productName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Amount</div>
              <div className="font-medium">${agreement?.amount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Description</div>
              <div className="font-medium">{agreement?.description}</div>
            </div>
            {agreement?.costBreakdown && (
              <div>
                <div className="text-sm text-gray-500">Cost Breakdown</div>
                <div className="font-medium">{agreement.costBreakdown}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-500">Delivery Period</div>
              <div className="font-medium">{agreement?.deliveryPeriod}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Seller Email</div>
              <div className="font-medium">{agreement?.sellerEmail}</div>
            </div>
          </div>
        </div>

        {userType === 'buyer' && (
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
            >
              Proceed to Payment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {step === 1 && <UserTypeSelection />}
        {step === 2 && userType === 'buyer' && <BuyerAgreementInput />}
        {step === 2 && userType === 'seller' && <SellerForm />}
        {step === 3 && <AgreementReview />}
        {step === 4 && userType === 'buyer' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Complete Payment</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">${formData.amount}</div>
                  <div className="text-gray-500">Total to Pay</div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Payment Method</h3>
                {/* Payment form would go here - simplified for demo */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">CVC</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={handleBack}
                className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
              >
                Back
              </button>
              <button
                className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
              >
                Pay Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurePayment;