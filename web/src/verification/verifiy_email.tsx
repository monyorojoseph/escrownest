import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { fetcher } from "../services/utils";
import { AxiosResponse } from "axios";

const EmailVerification = () => {
    const navigate = useNavigate();
    const { uid, token } = useParams();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const verifyEmail = async (uid: string, token: string) => {
        setLoading(true);
        try {
            const response = await fetcher(`/api/auth/email-verification/${uid}/${token}/`) as AxiosResponse;
            setLoading(false);
            if (response.status === 200) {
                setStatus('success');
                setMessage('Your email has been successfully verified!');
                toast.success('Email verification successful');
                setTimeout(() => {
                    navigate('/account/settings');
                }, 3000);
            }
        } catch (error) {
            setLoading(false);
            setStatus('error');
            setMessage('Email verification failed. The link may have expired or is invalid.');
            toast.error('Email verification failed');
        }
    };

    useEffect(() => {
        if (uid && token) {
            verifyEmail(uid, token);
        } else {
            setStatus('error');
            setMessage('Invalid verification link. Please request a new verification email.');
            toast.error('Invalid verification link');
        }
    }, [uid, token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Verification</h1>
                    
                    {loading && (
                        <div className="space-y-4">
                            <p className="text-gray-600">Please wait while we verify your email address...</p>
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
                            <p className="text-gray-800 font-medium">{message}</p>
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
                            <p className="text-gray-800 font-medium">{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
