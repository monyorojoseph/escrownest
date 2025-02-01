import { ArrowRight } from "lucide-react"
import { Agreement } from "./form"

const ProductDetails = ({ formData, setFormData, setFormStep }: 
    { formData: Agreement, setFormData: (formData: Agreement) => void, setFormStep: (formStep: number) => void }) => {
    return (
    <div className="space-y-6">
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
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Document (Optional)
          </label>
          <input
            type="file"
            name="document"
            onChange={(e) => {
              const file = e.target.files?.[0];
              // setFormData({ ...formData, document: file || null });
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0 file:text-sm file:font-semibold
            file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
            accept=".pdf,.doc,.docx,.txt"
          />
          <p className="mt-1 text-sm text-gray-500">
            Upload any relevant document (PDF, DOC, DOCX, or TXT)
          </p>
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

