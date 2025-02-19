import { useState } from "react";
import { AgreementType } from "../../types/agreement.type";
import ProgressStep from "./components/steps/progressStep";
import AgreementInput from "./components/steps/buyer/agreementInput";
import AgreementReview from "./components/steps/buyer/agreementReview";
import AgreementPayment from "./components/steps/buyer/agreementPayment";

const ActivateAgreement = () => {
    const [step, setStep] = useState(1);
    const [ agreement, setAgreement ] = useState<AgreementType | null>(null);
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Activate Agreement</h2>

            <ProgressStep steps={['Agreement ID', 'Review Agreement', 'Proceed to Payment']} step={step} />
            {step === 1 && <AgreementInput setStep={setStep} setAgreement={setAgreement} />}
            {(step === 2 && agreement) && <AgreementReview setStep={setStep} agreement={agreement} />}
            {(step === 3 && agreement) && <AgreementPayment setStep={setStep} agreement={agreement} />}
        </div>
    )
}

export default ActivateAgreement;