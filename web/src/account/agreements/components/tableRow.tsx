import { getUser } from "../../../hooks/getUser";
import { AgreementType } from "../../../types/agreement.type";
import { formatCurrency, formatDate, formatTime } from "../../../utils";

const TableRow = ({ agreement, handleDelete, handleEdit, handleView, handleDispute }: 
    { agreement: AgreementType, handleDelete: (id: string) => void, handleEdit: (id: string) => void, 
    handleView: (id: string) => void, handleDispute: (id: string) => void }) => {
    const { user } = getUser();
    return (
        <tr key={agreement.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {agreement.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {formatCurrency(agreement.amount)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {agreement.transaction_type.split('_').join(' ').toLocaleUpperCase()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {agreement.days_to_deliver} days
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col space-y-0.5">
                <span className="text-gray-500">
                    {formatDate(agreement.created_at)}
                </span>
                <span className="text-gray-500 text-xs">
                    {formatTime(agreement.created_at)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${agreement.status === 'active' ? 'bg-green-100 text-green-800' : 
                    agreement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    agreement.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'}`}>
                    {agreement.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-xs space-x-1.5">
                <button className="cursor-pointer text-gray-600 hover:text-gray-800 hover:font-bold" 
                    onClick={() => handleView(agreement.id)}> View </button>
                    
                { (agreement.status === 'pending' && 
                agreement.seller.id === user!.id) && 
                    <button className="cursor-pointer text-gray-600 hover:text-gray-800 hover:font-bold" 
                        onClick={() => handleEdit(agreement.id)}> Edit </button>}
                { (agreement.status === 'active' && 
                agreement.buyer?.id === user!.id) && 
                    <button className="cursor-pointer text-gray-600 hover:text-gray-800 hover:font-bold" 
                        onClick={() => handleDispute(agreement.id)}> Dispute </button>}

                {(agreement.status === 'pending') && 
                agreement.seller.id === user!.id && 
                    <button className="cursor-pointer text-gray-600 hover:text-gray-800 hover:font-bold" 
                        onClick={() => handleDelete(agreement.id)}> Delete </button>}
            </td>
        </tr>
    )
}

export default TableRow;