import { ArrowRight, X } from "lucide-react"
import AgreementDetails from "../agreementDetails"
import { AgreementUserType } from "../../..";

const AgreementReview = ({setStep, setUserType}: {setStep: (step: number) => void, setUserType: (userType: AgreementUserType) => void}) => {
    const agreement  = {} as any
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">

          <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-6">Review Agreement</h2>
              <button onClick={() => setUserType("")} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                  <X className="w-4 h-4" />
              </button>
          </div>
          <AgreementDetails agreement={agreement} />

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2"
            >
              Proceed to Payment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
      </div>
    )
}

export default AgreementReview

