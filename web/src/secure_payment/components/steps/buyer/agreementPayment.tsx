import { ArrowRight, X } from "lucide-react"
import { AgreementUserType } from "../../..";

const AgreementPayment = ({setStep, setUserType}: {setStep: (step: number) => void, setUserType: (userType: AgreementUserType) => void}) => {
    const agreement  = {} as any

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Complete Payment</h2>


          <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-6">Complete Payment</h2>
              <button onClick={() => setUserType("")} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                  <X className="w-4 h-4" />
              </button>
          </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold">${agreement?.amount}</div>
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
            onClick={() => setStep(2)}
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
    )
}

export default AgreementPayment