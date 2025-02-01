import { useState } from 'react';
import SellerForm from './components/steps/seller/form';
import UserTypeSelection from './components/userTypeSelection';
import BuyerForm from './components/steps/buyer/form';

export type AgreementUserType = 'seller' | 'buyer' | '';

const SecurePayment = () => {
  
  const [userType, setUserType] = useState<AgreementUserType>('');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {!userType && <UserTypeSelection setUserType={setUserType} />}
        {userType === 'seller' && <SellerForm setUserType={setUserType}/>}
        {userType === 'buyer' && <BuyerForm setUserType={setUserType}/>}
      </div>
    </div>
  );
};

export default SecurePayment;