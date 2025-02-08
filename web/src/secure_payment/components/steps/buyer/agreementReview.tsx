import AgreementDetails from "../agreementDetails"
import { AgreementType } from "../../../../types/agreement.type"
import { toast } from "react-toastify"
import { AxiosResponse } from "axios"
import { useState } from "react"
import axiosInstance from "../../../../services/axios"
import { useNavigate } from "react-router"

const AgreementReview = ({setStep, agreement}: 
  {setStep: (step: number) => void, agreement: AgreementType}) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const updateAgreement = async(status: string) => {
        const toastId = toast.loading('Updating agreement...')
        setLoading(true)
        const response = await axiosInstance.put(`/api/payment-agreement/${agreement?.id}/update/`, {status: status}) as AxiosResponse
        setLoading(false)
        if(response.status === 200) {
            toast.update(toastId, {
                render: status === "cancelled" ? 'Agreement cancelled successfully' : 'Agreement activated successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            if(status === "cancelled") {
                navigate('/account/agreements')
            } else {
                setStep(3)
            }
        }else{
            toast.update(toastId, {
                render: status === "cancelled" ? 'Failed to cancel agreement' : 'Failed to activate agreement',
                type: 'error',
                isLoading: false,
                autoClose: 2000
            })
        }
    }
    return (
      <>
          <AgreementDetails agreement={agreement} />

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100" >
              Back
            </button>

            <div className="flex justify-left items-center space-x-2">
              <button disabled={loading}
                onClick={() => updateAgreement('cancelled')}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
                Cancel
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600">
                Proceed
              </button>
            </div>
          </div>
      </>
    )
}

export default AgreementReview

