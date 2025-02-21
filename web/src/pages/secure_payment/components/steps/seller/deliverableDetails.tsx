import { ArrowRight } from "lucide-react"
import { AgreementInputData } from "../../../new"
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
            Holding period for {formInputData.name}
          </label>
          <input
            type="number"
            name="deliveryPeriod"
            value={formInputData.holding_days}
            onChange={(e) => setFormInputData({ ...formInputData, holding_days: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
            placeholder="e.g., 14 days"
            title="This cannot be updated after creation"/>
          <p className="mt-1 text-sm text-gray-500">
            This is the period in which we hold the funds until both you and the client agree to release them. If no agreement is reached within this period, the funds will be refunded to the client.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days to dispute
          </label>
          <input
            type="number"
            name="disputePeriod"
            value={formInputData.days_to_dispute}
            onChange={(e) => setFormInputData({ ...formInputData, days_to_dispute: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
            placeholder="e.g., 7 days" max={formInputData.holding_days}
            title="This cannot be updated after creation"/>
          <p className="mt-1 text-sm text-gray-500">
            This is the period within which the client can deactivate an already activated agreement if they are not interested in the product.
          </p>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client's Email
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
            The client will receive agreement details at this email
          </p>
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium mb-1">Important Notice:</p>
          <ul className="text-sm text-red-500 space-y-1">
            <li>• Once created, agreement details cannot be modified</li>
            <li>• Agreement will remain in "Pending" status initially</li>
            <li>• Status changes to "Active" after client completes payment</li>
            <li>• Please review all details carefully before creating</li>
          </ul>
        </div>
  
        <div className="pt-4 flex justify-between">
          <button
            onClick={() => setFormStep(2)}
            className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100">
            Back
          </button>
          <button disabled={loading}
            onClick={async () => {
              if (formInputData.holding_days && formInputData.buyer_email && formInputData.days_to_dispute) {
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
