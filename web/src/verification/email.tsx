const EmailVerificationWaiting = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Check Your Email</h1>
                    
                    <div className="text-sky-500">
                        <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-800">
                            We've sent a verification email to your inbox. Please click the link in the email to verify your account.
                        </p>

                        <div className="text-sm text-gray-600 space-y-2">
                            <p>The verification link will expire in 24 hours.</p>
                            <p>If you don't see the email, please check your spam folder.</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <p className="text-sm text-gray-500">
                            Having trouble? Contact our support team for assistance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationWaiting;