const AgreementReview = () => {
    const agreement  = {} as any

    return (
            
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Agreement Created!</h2>
      
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Share this Agreement ID with the buyer:</div>
            <div className="text-2xl font-mono font-bold text-green-600">{agreement?.id}</div>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid gap-4">
                <div>
                <div className="text-sm text-gray-500">Product Name</div>
                <div className="font-medium">{agreement?.productName}</div>
                </div>
                <div>
                <div className="text-sm text-gray-500">Amount</div>
                <div className="font-medium">${agreement?.amount}</div>
                </div>
                <div>
                <div className="text-sm text-gray-500">Description</div>
                <div className="font-medium">{agreement?.description}</div>
                </div>
                {agreement?.costBreakdown && (
                <div>
                    <div className="text-sm text-gray-500">Cost Breakdown</div>
                    <div className="font-medium">{agreement.costBreakdown}</div>
                </div>
                )}
                <div>
                <div className="text-sm text-gray-500">Delivery Period</div>
                <div className="font-medium">{agreement?.deliveryPeriod}</div>
                </div>
                <div>
                <div className="text-sm text-gray-500">Seller Email</div>
                <div className="font-medium">{agreement?.sellerEmail}</div>
                </div>
            </div>
            </div>

        </div>
    </div>
    )
}

export default AgreementReview

