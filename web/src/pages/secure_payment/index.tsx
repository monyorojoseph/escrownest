import { Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

const SecurePayment = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      { !isAuthenticated && 
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center space-y-4">
          <h1 className="text-xl text-gray-900">Authentication Required</h1>
          <p className="text-gray-600 text-lg">
            Please <Link to="/auth/login" className="text-sky-500 hover:text-sky-600">log in</Link> or <Link to="/auth/register" className="text-sky-500 hover:text-sky-600">register</Link>.
          </p>
        </div>
      </div>
      }
      <div className={`max-w-3xl mx-auto px-4 ${!isAuthenticated ? 'opacity-10' : ''}`}>
        <Outlet />
      </div>

    </div>
  );
};

export default SecurePayment;