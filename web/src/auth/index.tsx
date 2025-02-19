import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(isAuthenticated) {
      navigate('/account/agreements');
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-sky-500">
        <div className="max-w-2xl text-white p-8">
          <h1 className="text-4xl font-bold">Welcome to Escrownest</h1>
          <p className="mt-4 text-xl">
            The safest way to protect your online transactions.
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}