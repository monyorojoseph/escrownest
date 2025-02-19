import { AgreementType } from "../../../../../types/agreement.type"
import { formatCurrency } from "../../../../../utils"
import { useState, useRef, FormEvent } from "react"
import Cards from 'react-credit-cards-2'

interface CardState {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  issuer: string;
  focused: string;
}

const AgreementPayment = ({setStep, agreement}: {
  setStep: (step: number) => void, agreement: AgreementType }) => {
  const [cardState, setCardState] = useState<CardState>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: ""
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleCallback = ({ issuer }: { issuer: string }, isValid: boolean) => {
    if (isValid) {
      setCardState(prev => ({ ...prev, issuer }));
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardState(prev => ({
      ...prev,
      focused: e.target.name
    }));
  };

  const formatCreditCardNumber = (value: string) => {
    return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ") || "";
  };

  const formatExpirationDate = (value: string) => {
    return value.replace(/^([1-9]\/|[2-9])$/g, "0$1")
      .replace(/^(0[1-9]|1[0-2])$/g, "$1/")
      .replace(/^([0-1])([3-9])$/g, "0$1/$2")
      .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, "$1/$2")
      .replace(/^([0]+)\/|[0]+$/g, "0")
      .replace(/[^\d\/]|^[\/]*$/g, "")
      .replace(/\/\//g, "/");
  };

  const formatCVC = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 4);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === "number") {
      value = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
    } else if (name === "cvc") {
      value = formatCVC(value);
    }

    setCardState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Payment submitted:', data);
    form.reset();
    setCardState({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: "",
      focused: ""
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">{formatCurrency(agreement?.amount)}</div>
            <div className="text-gray-500">Total to Pay</div>
          </div>
        </div>

        <div className="p-4">          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="lg:sticky lg:top-4">
              <Cards
                number={cardState.number}
                name={cardState.name}
                expiry={cardState.expiry}
                cvc={cardState.cvc}
                focused={cardState.focused as any}
                callback={handleCallback}
              />
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="tel"
                  name="number"
                  className="w-full px-3 py-2 border rounded-lg text-sm md:text-base placeholder:text-gray-400"
                  placeholder="Card Number:- 1234 5678 9012 3456"
                  pattern="[\d| ]{16,22}"
                  required
                  value={cardState.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg text-sm md:text-base placeholder:text-gray-400"
                  placeholder="name:- John Doe"
                  required
                  value={cardState.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="expiry"
                  className="w-full px-3 py-2 border rounded-lg text-sm md:text-base placeholder:text-gray-400"
                  placeholder="valid till:- 01/25"
                  pattern="\d\d/\d\d"
                  required
                  value={cardState.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="tel"
                  name="cvc"
                  className="w-full px-3 py-2 border rounded-lg text-sm md:text-base placeholder:text-gray-400"
                  placeholder="CVC:- 123"
                  pattern="\d{3,4}"
                  required
                  value={cardState.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>

              <input type="hidden" name="issuer" value={cardState.issuer} />
              
              <button 
                type="submit"
                className="w-full bg-sky-500 text-white px-6 py-1.5 rounded-lg hover:bg-sky-600 text-base md:text-lg">
                Pay 
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setStep(2)}
          className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100">
          Back
        </button>
      </div>
    </>
  )
}

export default AgreementPayment