import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const GoogleAuth = ({ context }: { context: 'signin' | 'signup' }) => {
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse: any) => {
        navigate(`/linking_accounts/google_callback/${credentialResponse.credential}/${context}`);
    }

    const handleError = () => {
        toast.error(`${context === 'signin' ? 'Sign in' : 'Sign up'} Failed`);
    }

    return (
        <div className='flex items-center justify-center'>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} 
                context={context} text={`${context}_with`}/>
        </div>
    );
};  

export default GoogleAuth;