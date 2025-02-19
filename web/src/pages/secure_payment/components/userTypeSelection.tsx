import { User, Store } from "lucide-react"
import { AgreementUserType } from "..";

const UserTypeSelection = ({ setUserType }: { setUserType: (userType: AgreementUserType) => void}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Select Your Role</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
                onClick={() => {
                setUserType('buyer');
                }}
                className="p-6 border rounded-lg flex items-center gap-3 hover:border-sky-500 hover:bg-sky-50"
            >
                <User className="w-8 h-8 text-sky-500" />
                <div className="text-left">
                <div className="font-medium">I'm a Buyer</div>
                <div className="text-sm text-gray-500">Pay for an existing escrow agreement</div>
                </div>
            </button>
    
            <button
                onClick={() => {
                setUserType('seller');
                }}
                className="p-6 border rounded-lg flex items-center gap-3 hover:border-sky-500 hover:bg-sky-50"
            >
                <Store className="w-8 h-8 text-sky-500" />
                <div className="text-left">
                <div className="font-medium">I'm a Seller</div>
                <div className="text-sm text-gray-500">Create a new escrow agreement</div>
                </div>
            </button>
            </div>
        </div>
    )
}

export default UserTypeSelection