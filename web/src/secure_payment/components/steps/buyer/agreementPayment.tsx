import { ArrowRight } from "lucide-react"
import { AgreementType } from "../../../../types/agreement.type"
import { formatCurrency } from "../../../../utils"

const AgreementPayment = ({setStep, agreement}: 
    {setStep: (step: number) => void, agreement: AgreementType}) => {

    return (
        <>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(agreement?.amount)}</div>
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
      </>
    )
}

export default AgreementPayment