import { ArrowRight } from "lucide-react"
import { Agreement } from "./form"

const ProductDetails = ({ formData, setFormData, setFormStep }: 
    { formData: Agreement, setFormData: (formData: Agreement) => void, setFormStep: (formStep: number) => void }) => {
    return (
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
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
    )
}

export default ProductDetails

