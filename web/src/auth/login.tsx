import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    await login({ email, password });
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <Link to="/auth/register" className="text-sky-500 hover:text-sky-600 hover:underline">
            create a new account
          </Link>
        </p>
      </div>
      
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email" required 
            id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
              focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password" required
            id="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600 
            transition-colors duration-300 shadow-md hover:shadow-lg" >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 
          bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 
          transition-colors duration-300"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-5 w-5"
        />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}