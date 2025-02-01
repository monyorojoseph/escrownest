import { ArrowRight } from "lucide-react"

const AgreementReview = ({setStep}: {setStep: (step: number) => void}) => {
    const agreement  = {} as any
    return (
            
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Review Agreement</h2>
      


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

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
            >
              Proceed to Payment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
      </div>
    </div>
    )
}

export default AgreementReview

