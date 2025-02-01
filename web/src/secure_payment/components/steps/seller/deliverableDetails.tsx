import { ArrowRight } from "lucide-react"
import { AgreementInputData } from "./form"
import { toast } from "react-toastify"
import { useState } from "react"

const DeliverableDetails = ({ formInputData, setFormInputData, setFormStep, handleSubmit }: 
    { formInputData: AgreementInputData, setFormInputData: (formInputData: AgreementInputData ) => void, 
      setFormStep: (formStep: number) => void, handleSubmit: () => void }) => {

    const [ loading, setLoading ] = useState(false)

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days to deliver {formInputData.name}
          </label>
          <input
            type="text"
            name="deliveryPeriod"
            value={formInputData.days_to_deliver}
            onChange={(e) => setFormInputData({ ...formInputData, days_to_deliver: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
            placeholder="e.g., 14 days"
          />
          <p className="mt-1 text-sm text-gray-500">
            This is the period within which you must deliver the product/service, failure to deliver within this period money will be refunded to the buyer
          </p>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buyer's Email
          </label>
          <input
            type="email"
            name="sellerEmail"
            value={formInputData.buyer_email}
            onChange={(e) => setFormInputData({ ...formInputData, buyer_email: e.target.value })}
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
            className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100">
            Back
          </button>
          <button disabled={loading}
            onClick={async () => {
              if (formInputData.days_to_deliver && formInputData.buyer_email) {
                setLoading(true)
                await handleSubmit()
                setLoading(false)
              } else {
                toast.error('Please enter delivery period and buyer email');
              }
            }}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2">
            {loading ? 'Creating Agreement...' : 'Create Agreement'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
}

export default DeliverableDetails
