import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-sky-600">
          escrownest
        </Link>
        
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-gray-600 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-gray-600 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        <div className={`lg:flex items-center gap-8 ${isOpen ? 'absolute top-16 left-0 right-0 flex flex-col bg-white p-4 border-b border-gray-100 shadow-sm' : 'hidden'}`}>
          {isAuthenticated ? (
            <>
              <Link to="/secure_payment/new" 
                className="text-gray-600 hover:text-sky-600 font-medium text-sm relative after:absolute after:bottom-0 after:left-0 
                after:h-0.5 after:w-0 hover:after:w-full after:bg-sky-600 after:transition-all">
                Create 
              </Link>
              <Link to="/secure_payment/activate" 
                className="text-gray-600 hover:text-sky-600 font-medium text-sm relative after:absolute after:bottom-0 after:left-0 
                after:h-0.5 after:w-0 hover:after:w-full after:bg-sky-600 after:transition-all">
                Activate
              </Link>
              <Link to="/account/settings"
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/login" 
                className="text-gray-600 hover:text-sky-600 font-medium text-sm relative after:absolute after:bottom-0 
                after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-sky-600 after:transition-all">
                Login
              </Link>
              <Link to="/auth/register" 
                className="text-gray-600 hover:text-sky-600 font-medium text-sm relative after:absolute after:bottom-0 
                after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-sky-600 after:transition-all">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 