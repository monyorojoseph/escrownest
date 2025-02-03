import { useState } from "react"
import { useAuth } from "../../../../context/AuthContext"
import { AxiosResponse } from "axios"
import axiosInstance from "../../../../services/axios"
import { AgreementType } from "../../../../types/agreement.type"
import { toast } from "react-toastify"

const AgreementInput = ({setStep, setAgreement}: 
    {setStep: (step: number) => void, setAgreement: (agreement: AgreementType) => void}) => {
    const { isAuthenticated } = useAuth()
    const [agreementId, setAgreementId] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchAgreement = async(value: string) => {

        if(!isAuthenticated) {
            // toast.error('Please login to continue')
            return
        }
        if(!agreementId) {
            toast.error('Please enter an agreement ID')
            return
        }

        const toastId = toast.loading('Fetching agreement...')
        setLoading(true)
        const response = await axiosInstance.get(`/api/payment-agreement/${value}/get/`) as AxiosResponse;
        setLoading(false)
        console.log({ response })
        if(response.status === 200) {
            setAgreement(response.data)
            toast.update(toastId, {
                render: 'Agreement fetched successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            setStep(2);

        }else{
            toast.update(toastId, {
                render: 'Failed to fetch agreement',
                type: 'error',
                isLoading: false,
                autoClose: 2000
            })
        }
    }

    return (
        
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
                onClick={async() => { await fetchAgreement(agreementId);}} disabled={loading}
                className="w-full bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600">
                {loading ? 'Loading...' : 'Look Up Agreement'}
            </button>
        </div>
    )
}

export default AgreementInput