import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { postingData } from "../services/utils";
import { AxiosResponse } from "axios";
const GoogleCallback = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const { token, context } = useParams();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleGoogleAuth = async () => {
        setLoading(true);
        const response = await postingData(`/api/auth/google/`, { token, context }) as AxiosResponse;
        setLoading(false);
        if (response.status === 200) {
            localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
            setIsAuthenticated(true);
            setStatus('success');
            toast.success('Google authentication successful, you will be redirected to your dashboard');
            setTimeout(() => {
                navigate('/account/agreements');
            }, 3000);
        } else {
            setStatus('error');
            toast.error(response?.data?.message || 'Google authentication failed, please try again');
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
        }
    }

    useEffect(() => {
        handleGoogleAuth();
    }, [token, context]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Google Authentication</h1>
                    
                    {loading && (
                        <div className="space-y-4">
                            <p className="text-gray-600">Please wait while we verify your Google account...</p>
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-500 border-t-transparent"></div>
                            </div>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="space-y-4">
                            <div className="text-green-500">
                                <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-gray-800 font-medium">Google authentication successful!</p>
                            <p className="text-gray-600 text-sm">Redirecting you to your account settings...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="space-y-4">
                            <div className="text-red-500">
                                <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <p className="text-gray-800 font-medium">Authentication Failed</p>
                            <p className="text-gray-600 text-sm">Redirecting you to the login page...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}   

export default GoogleCallback;
