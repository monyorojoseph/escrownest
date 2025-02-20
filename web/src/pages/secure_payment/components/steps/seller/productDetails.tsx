import { ArrowRight } from "lucide-react"
import { toast } from "react-toastify";
import { AgreementInputData } from "../../../new";

const ProductDetails = ({ formInputData, setFormInputData, setFormStep }: 
    { formInputData: AgreementInputData, setFormInputData: (formInputData: AgreementInputData ) => void, 
      setFormStep: (formStep: number) => void }) => {
    return (
      <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formInputData.name}
              onChange={(e) => setFormInputData({ ...formInputData, name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
              placeholder="Enter product name"/>
          </div>
    
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formInputData.description}
              onChange={(e) => setFormInputData({ ...formInputData, description: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
              rows={3}
              placeholder="Describe the product or service"/>
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
                setFormInputData({ ...formInputData, document: file });
              }}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
              accept=".pdf,.doc,.docx,.txt,.jpg, .jpeg, .png"/>
            <p className="mt-1 text-sm text-gray-500">
              Upload any relevant document (PDF, DOC, DOCX, or TXT)
            </p>
          </div>
    
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => {
                if (formInputData.name && formInputData.description) {
                  setFormStep(2);
                }else{
                  toast.error('Please fill name and description fields');
                }
              }}
              className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
      </div>
    )
}

export default ProductDetails

