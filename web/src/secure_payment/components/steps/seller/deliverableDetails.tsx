import { ArrowRight } from "lucide-react"
import { Agreement } from "./form"

const DeliverableDetails = ({ formData, setFormData, setFormStep }: 
    { formData: Agreement, setFormData: (formData: Agreement) => void, setFormStep: (formStep: number) => void }) => {

    return (
        <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Period
          </label>
          <input
            type="text"
            name="deliveryPeriod"
            value={formData.deliveryPeriod}
            onChange={(e) => setFormData({ ...formData, deliveryPeriod: e.target.value })}
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
            value={formData.sellerEmail}
            onChange={(e) => setFormData({ ...formData, sellerEmail: e.target.value })}
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
            //   const id = generateAgreementId();
            //   setAgreement({ id, ...formData });
              setFormStep(3);
            }}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
          >
            Create Agreement <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
}

export default DeliverableDetails
