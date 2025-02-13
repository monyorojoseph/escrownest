import AgreementDetails from "../agreementDetails"
import { AgreementType } from "../../../../types/agreement.type"
import { toast } from "react-toastify"
import { AxiosResponse } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { updateItem } from "../../../../services/utils"

const AgreementReview = ({setStep, agreement}: 
  {setStep: (step: number) => void, agreement: AgreementType}) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const handleCancelAgreement = async() => {
        const toastId = toast.loading('Cancelling agreement...')
        setLoading(true)
        const response = await updateItem(`/api/payment-agreement/${agreement?.id}/cancel/`, {}) as AxiosResponse
        setLoading(false)
        if(response.status === 200) {
            toast.update(toastId, {
                render: 'Agreement cancelled successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
                navigate('/account/agreements')
        }else{
            toast.update(toastId, {
                render: 'Failed to cancel agreement',
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
                onClick={() => handleCancelAgreement()}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
                Cancel
              </button>
              <button
                disabled={agreement.status !== 'pending'}
                onClick={() => {
                  if(agreement.status === 'pending') {
                    setStep(3)
                  }else{
                    toast.error('You not allowed to proceed, only for pending agreements.')
                  }
                }}
                className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 disabled:opacity-50">
                Proceed
              </button>
            </div>
          </div>
      </>
    )
}

export default AgreementReview

