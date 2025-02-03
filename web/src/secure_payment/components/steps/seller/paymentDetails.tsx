import { ArrowRight } from "lucide-react"
import { AgreementInputData } from "./form"
import { toast } from "react-toastify";

const PaymentDetails = ({ formInputData, setFormInputData, setFormStep }: 
    { formInputData: AgreementInputData, setFormInputData: (formInputData: AgreementInputData ) => void, 
      setFormStep: (formStep: number) => void }) => {
    return (
    <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type
          </label>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div 
              onClick={() => setFormInputData({ ...formInputData, transaction_type: 'full_payment' })}
              className={`px-4 py-3 rounded-lg border-2 ${formInputData?.transaction_type === 'full_payment' ? 
                'bg-sky-50 border-sky-500' : 'bg-gray-50 border-gray-200'} hover:border-sky-500 cursor-pointer transition-colors`}
            >
              <div className="font-medium">Full Payment</div>
              <div className="text-sm text-gray-500">Pay the entire amount upfront</div>
            </div>
            <div
              onClick={() => setFormInputData({ ...formInputData, transaction_type: 'down_payment' })}
              className={`px-4 py-3 rounded-lg border-2 ${formInputData?.transaction_type === 'down_payment' ? 
                'bg-sky-50 border-sky-500' : 'bg-gray-50 border-gray-200'} hover:border-sky-500 cursor-pointer transition-colors`}
            >
              <div className="font-medium">Down Payment</div>
              <div className="text-sm text-gray-500">Pay a portion now, rest later</div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center px-3">
              <span className="text-gray-500">KES</span>
            </div>
            <input
              type="number"
              name="amount"
              value={formInputData.amount}
              onChange={(e) => setFormInputData({ ...formInputData, amount: e.target.value })}
              className="pl-8 w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
              placeholder="0.00"
            />
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount Breakdown (Optional)
          </label>
          <div className="space-y-4">
            {formInputData.amount_breakdown?.split('\n').map((_:any, index: never) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text" 
                  placeholder="Cost description"
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                    value={formInputData.amount_breakdown?.split('\n')[index]?.split(':')[0] || ''}
                  onChange={(e) => {
                    const lines = formInputData.amount_breakdown?.split('\n') || [];
                    const amount = lines[index]?.split(':')[1] || '';
                    lines[index] = `${e.target.value}:${amount}`;
                    setFormInputData({...formInputData, amount_breakdown: lines.join('\n')});
                  }}
                />
                <div className="relative w-32">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 p-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                    value={formInputData.amount_breakdown?.split('\n')[index]?.split(':')[1] || ''}
                    onChange={(e) => {
                      const lines = formInputData.amount_breakdown?.split('\n') || [];
                      const desc = lines[index]?.split(':')[0] || '';
                      lines[index] = `${desc}:${e.target.value}`;
                      setFormInputData({...formInputData, amount_breakdown: lines.join('\n')});
                    }}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const lines = formInputData.amount_breakdown?.split('\n') || [];
                lines.push(':');
                setFormInputData({...formInputData, amount_breakdown: lines.join('\n')});
              }}
              className="text-sky-500 hover:text-sky-600 text-sm font-medium"
            >
              + Add Cost Item
            </button>
          </div>
        </div>
  
        <div className="pt-4 flex justify-between">
          <button
            onClick={() => setFormStep(1)}
            className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={() => {
              if (formInputData.amount && formInputData.transaction_type) {
                setFormStep(3);
              } else {
                toast.error('Please enter amount and select transaction type');
              }
            }}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
    </div>
    )
}

export default PaymentDetails