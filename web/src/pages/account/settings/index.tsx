import React, { useState } from 'react';
import { getUser } from '../../../hooks/getUser';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { postingData } from '../../../services/utils';


const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

const Settings: React.FC = () => {

  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account preferences and settings
        </p>
      </header>
      <UserInfo />
      <UserSecurity />
    </div>
  );
};

export default Settings; 

const UserInfo: React.FC = () => {
  const { user, isLoading } = getUser();
  const [ updatedUser, setUpdatedUser ] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ [e.target.name]: e.target.value });
  };  

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updatedUser);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-4 py-2 sm:p-6 border-b border-gray-100">
        <h2 className="text-xl font-medium text-gray-900">Personal Information</h2>
      </div>
      
      <form className="p-4 sm:p-6 space-y-4" onSubmit={handleSave}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text" name="name" value={user?.name} onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
              focus:border-sky-500 focus:ring-sky-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"  value={user?.email} name="email" onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
              focus:border-sky-500 focus:ring-sky-500 sm:text-sm"/>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"  value={user?.phone_number} name="phone_number" onChange={handleChange}
              placeholder="07123456789" pattern="[0-9]{10}"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
              focus:border-sky-500 focus:ring-sky-500 sm:text-sm"/>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium 
            hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const UserSecurity: React.FC = () => {
  const { user, isLoading, mutate } = getUser();
  const [ verifying, setVerifying ] = useState(false);


  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [updatedLoginPassword, setUpdatedLoginPassword] = useState('');
  const [showAgreementPassword, setShowAgreementPassword] = useState(false);
  const [updatedAgreementPassword, setUpdatedAgreementPassword] = useState('');

  const handleLoginPasswordSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updatedLoginPassword);
  };

  const handleAgreementPasswordSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updatedAgreementPassword);
  };

  const handleEmailVerification = async() => {
    setVerifying(true);
    const response = await postingData('/api/auth/verify-email/', { email: user?.email }) as AxiosResponse;
    console.log(response);
    setVerifying(false);
    if (response.status === 200) {
      toast.success('Email verification sent, check your email for verification');
    } else {
      toast.error('Email to send verification email not found');
    }
  };


  return (
  <div className="bg-white rounded-lg shadow-sm">
    {/* <div className="p-4 sm:p-6 border-b border-gray-100">
      <h2 className="text-xl font-medium text-gray-900">Security</h2>
      <p className="mt-1 text-sm text-gray-500">Manage your password and security settings</p>
    </div> */}
    
    <div className="p-4 sm:p-6 space-y-6">
      {/* Login Password Section */}
      {/* <div>
        <h3 className="text-lg font-medium text-gray-900">Login Password</h3>
        <p className="mt-1 text-sm text-gray-500">Change the password you use to log into your account</p>
        <form className="mt-4" onSubmit={handleLoginPasswordSave}>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <div className="relative mt-1">
              <input
                type={showLoginPassword ? "text" : "password"} value={updatedLoginPassword} 
                onChange={(e) => setUpdatedLoginPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 
                focus:border-sky-500 focus:ring-sky-500 sm:text-sm pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                {showLoginPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium 
              hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              Update Login Password
            </button>
          </div>
        </form>
      </div> */}

      {/* Agreement Password Section */}
      {/* <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Agreement Password</h3>
        <p className="mt-1 text-sm text-gray-500">Create a password for approving agreements</p>
        <div className="mt-4">
          <form className="relative" onSubmit={handleAgreementPasswordSave}>
            <label className="block text-sm font-medium text-gray-700">New Agreement Password</label>
            <div className="relative mt-1">
              <input
                type={showAgreementPassword ? "text" : "password"} value={updatedAgreementPassword} 
                onChange={(e) => setUpdatedAgreementPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 
                focus:ring-sky-500 sm:text-sm pr-10"/>
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowAgreementPassword(!showAgreementPassword)} >
                {showAgreementPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium 
              hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              Create Agreement Password
            </button>
          </div>
        </div>
      </div> */}

      {/* Verification Status Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Verification Status</h3>
        <p className="mt-1 text-sm text-gray-500">Status of your verified contact methods</p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Email Verification</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              { !user?.email_verified &&  
                <button onClick={handleEmailVerification} disabled={verifying}
                  className="mt-3 bg-sky-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold 
                  hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                  disabled:opacity-50 disabled:cursor-not-allowed">
                    {verifying ? 'Verifying...' : 'Verify Email'}
                </button>
              }
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
              ${user?.email_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {user?.email_verified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};