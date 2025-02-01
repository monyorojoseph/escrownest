import { useState } from "react";
import AgreementInput from "./agreementInput";
import AgreementReview from "./agreementReview";
import AgreementPayment from "./agreementPayment";

const BuyerForm = () => {
    const [step, setStep] = useState(1);
    return (
        <div>
            {step === 1 && <AgreementInput setStep={setStep} />}
            {step === 2 && <AgreementReview setStep={setStep}/>}
            {step === 3 && <AgreementPayment setStep={setStep}/>}

        </div>
    )
}

export default BuyerForm


