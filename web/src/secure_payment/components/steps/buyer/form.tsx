import { useState } from "react";
import AgreementInput from "./agreementInput";
import AgreementReview from "./agreementReview";
import AgreementPayment from "./agreementPayment";
import { AgreementUserType } from "../../..";


const   BuyerForm = ({setUserType}: {setUserType: (userType: AgreementUserType) => void}) => {
    const [step, setStep] = useState(1);
    return (
        <div>
            {step === 1 && <AgreementInput setStep={setStep} setUserType={setUserType} />}
            {step === 2 && <AgreementReview setStep={setStep} setUserType={setUserType}/>}
            {step === 3 && <AgreementPayment setStep={setStep} setUserType={setUserType}/>}
        </div>
    )
}

export default BuyerForm


