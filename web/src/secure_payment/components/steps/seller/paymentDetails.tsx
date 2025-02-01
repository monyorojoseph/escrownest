import { ArrowRight } from "lucide-react"
import { Agreement } from "./form"

const PaymentDetails = ({ formData, setFormData, setFormStep }: 
    { formData: Agreement, setFormData: (formData: Agreement) => void, setFormStep: (formStep: number) => void }) => {
    return (
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
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, costBreakdown: e.target.value })}
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
    )
}

export default PaymentDetails