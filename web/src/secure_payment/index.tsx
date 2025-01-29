import  { useState } from 'react';
import { ArrowRight, DollarSign, Package, AlertCircle } from 'lucide-react';

const SecurePayment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    transactionType: '',
    amount: '',
    itemDescription: '',
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {['Transaction Details', 'Review', 'Payment'].map((label, index) => (
              <div key={label} className="flex-1">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1 ? 'bg-green-500' :
                    step === index + 1 ? 'bg-sky-500' : 'bg-gray-300'
                  } text-white font-semibold`}>
                    {index + 1}
                  </div>
                  <div className={`flex-1 h-1 ${
                    index < 2 ? (step > index + 1 ? 'bg-green-500' : 'bg-gray-300') : 'hidden'
                  }`} />
                </div>
                <div className="text-sm mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Transaction Details */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Enter Transaction Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({...formData, transactionType: 'full'})}
                    className={`p-4 border rounded-lg flex items-center gap-3 ${
                      formData.transactionType === 'full' 
                        ? 'border-sky-500 bg-sky-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Package className="w-6 h-6 text-sky-500" />
                    <div className="text-left">
                      <div className="font-medium">Full Payment</div>
                      <div className="text-sm text-gray-500">Pay full amount upfront</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setFormData({...formData, transactionType: 'partial'})}
                    className={`p-4 border rounded-lg flex items-center gap-3 ${
                      formData.transactionType === 'partial' 
                        ? 'border-sky-500 bg-sky-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <DollarSign className="w-6 h-6 text-sky-500" />
                    <div className="text-left">
                      <div className="font-medium">Down Payment</div>
                      <div className="text-sm text-gray-500">Pay partial amount now</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Amount
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
                    className="pl-8 w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Description
                </label>
                <textarea
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  rows={3}
                  placeholder="Describe the item or service being purchased"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seller's Email
                </label>
                <input
                  type="email"
                  name="sellerEmail"
                  value={formData.sellerEmail}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="seller@example.com"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Review Details</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Transaction Type</div>
                    <div className="font-medium">
                      {formData.transactionType === 'full' ? 'Full Payment' : 'Down Payment'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Amount</div>
                    <div className="font-medium">${formData.amount}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-gray-500">Item Description</div>
                    <div className="font-medium">{formData.itemDescription}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-gray-500">Seller's Email</div>
                    <div className="font-medium">{formData.sellerEmail}</div>
                  </div>
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 p-4 rounded-lg flex gap-3">
                <AlertCircle className="w-6 h-6 text-sky-500 flex-shrink-0" />
                <div className="text-sm">
                  By proceeding, you agree to our terms of service and escrow agreement. 
                  The seller will be notified and must accept the transaction before any payment is processed.
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
                onClick={handleNext}
                className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
              >
                Continue to Payment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
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