import { formatCurrency } from "../../../../utils"

const AgreementDetails = ({ agreement }: { agreement: any }) => {

    return (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid gap-4">
                <div>
                  <div className="text-sm text-gray-500">Product Name</div>
                  <div className="font-medium">{agreement?.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Amount</div>
                  <div className="font-medium">{formatCurrency(agreement?.amount)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Description</div>
                  <div className="font-medium">{agreement?.description}</div>
                </div>
                {agreement?.amount_breakdown && typeof agreement.amount_breakdown === 'string' && (
                <div>
                    <div className="text-sm text-gray-500">Amount Breakdown</div>
                    <div className="font-medium">
                        {JSON.parse(agreement.amount_breakdown)?.map((item: {description: string, amount: string}, index: number) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.description}</span>
                                <span>{formatCurrency(Number(item.amount))}</span>
                            </div>
                        ))}
                    </div>
                </div>
                )}
                <div>
                  <div className="text-sm text-gray-500">Days to deliver</div>
                  <div className="font-medium">{agreement?.holding_days}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Buyer Email</div>
                  <div className="font-medium">{agreement?.buyer_email}</div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default AgreementDetails