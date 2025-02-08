import { useState } from "react";
import AgreementInput from "./agreementInput";
import AgreementReview from "./agreementReview";
import AgreementPayment from "./agreementPayment";
import { AgreementUserType } from "../../..";
import ProgressStep from "../progressStep";
import { X } from "lucide-react";
import { AgreementType } from "../../../../types/agreement.type";
import 'react-credit-cards-2/dist/es/styles-compiled.css';


const   BuyerForm = ({setUserType}: {setUserType: (userType: AgreementUserType) => void}) => {
    const [step, setStep] = useState(1);
    const [ agreement, setAgreement ] = useState<AgreementType | null>(null);
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold mb-6">Activate Agreement</h2>
                <button onClick={() => setUserType("")} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <X className="w-4 h-4" /> 
                </button>
            </div>

            <ProgressStep steps={['Agreement ID', 'Review Agreement', 'Proceed to Payment']} step={step} />
            {step === 1 && <AgreementInput setStep={setStep} setAgreement={setAgreement} />}
            {(step === 2 && agreement) && <AgreementReview setStep={setStep} agreement={agreement} />}
            {(step === 3 && agreement) && <AgreementPayment setStep={setStep} agreement={agreement} />}
        </div>
    )
}

export default BuyerForm


