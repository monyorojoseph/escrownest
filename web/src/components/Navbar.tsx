import { Link } from 'react-router';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          SecurePay
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/account">Dashboard</Link>
              <Link to="/account/transactions">Transactions</Link>
              <Link to="/secure_payment">New Payment</Link>
              <Link to="/account/settings">Settings</Link>
            </>
          ) : (
            <>
              <Link to="/auth/login">Login</Link>
              <Link to="/auth/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 