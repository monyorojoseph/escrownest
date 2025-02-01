import { useState } from "react"
import { AgreementUserType } from "../../..";
import { X } from "lucide-react";

const AgreementInput = ({setStep, setUserType}: {setStep: (step: number) => void, setUserType: (userType: AgreementUserType) => void}) => {
    const [agreementId, setAgreementId] = useState('')
    const fetchAgreement = (value: string) => {
        console.log({value})
        console.log('fetching agreement')
    }
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold mb-6">Enter Agreement Details</h2>
                <button onClick={() => setUserType("")} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <X className="w-4 h-4" />
                </button>
            </div>
        
            <div className="space-y-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Escrow Agreement ID
                </label>
                <input
                    type="text"
                    value={agreementId}
                    onChange={(e) => setAgreementId(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="ESC-XXXXXX"
                />
                </div>

                <button
                onClick={() => {
                    fetchAgreement(agreementId);
                    setStep(2);
                }}
                className="w-full bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600"
                >
                Look Up Agreement
                </button>
            </div>
        </div>
    )
}

export default AgreementInput