import { Link } from 'react-router';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          SecurePay
        </Link>
        
        <button 
          className="menu-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`navbar-links ${isOpen ? 'show' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link to="/secure_payment">New Agreement</Link>
              <Link to="/account/transactions">Transactions</Link>
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