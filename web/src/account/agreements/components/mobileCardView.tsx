import { AgreementType } from "../../../types/agreement.type";
import { formatCurrency, formatDateTime } from "../../../utils";

const MobileCardView = ({ agreement, handleDelete, handleEdit }: 
    { agreement: AgreementType, handleDelete: (id: string) => void, handleEdit: (id: string) => void }) => {
    return (
        <div key={agreement.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900">{agreement.name}</h3>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${agreement.status === 'active' ? 'bg-green-100 text-green-800' : 
                agreement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                agreement.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'}`}>
                {agreement.status}
            </span>
            </div>
            <div className="space-y-2 text-sm text-gray-500">
            <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium">{formatCurrency(agreement.amount)}</span>
            </div>
            <div className="flex justify-between">
                <span>Transaction Type:</span>
                <span>{agreement.transaction_type}</span>
            </div>
            <div className="flex justify-between">
                <span>Deadline:</span>
                <span>{agreement.days_to_deliver} days</span>
            </div>
            <div className="flex justify-between">
                <span>Created:</span>
                <span>{formatDateTime(agreement.created_at)}</span>
            </div>
            </div>
        </div>
    )
}

export default MobileCardView;