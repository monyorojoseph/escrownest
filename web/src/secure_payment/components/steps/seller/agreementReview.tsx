import { Link } from "react-router"
import AgreementDetails from "../agreementDetails"

const AgreementReview = ({ agreement }: { agreement: any }) => {

  return (
    <div className="p-6">
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Share this Agreement ID with the buyer:</div>
            <div className="text-2xl font-mono font-bold text-green-600">ESC-{agreement?.id}</div>
          </div>
        </div>
        <AgreementDetails agreement={agreement} />
        <div className="flex justify-between items-center mt-6">
          <Link to="/account/agreements" 
            className="px-4 py-2 text-sm font-medium text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg 
            transition-colors duration-200 flex items-center gap-2">
            View other agreements
          </Link>
        </div>
    </div>
  )
}

export default AgreementReview


