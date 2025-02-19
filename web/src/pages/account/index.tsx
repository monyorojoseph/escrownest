import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { 
  Settings, 
  Bell, 
  DollarSign, 
  FileText, 
  AlertCircle, 
  Menu,
  X,
  LogOut
} from 'lucide-react';  
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../hooks/getUser';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-sky-50 rounded-lg transition-colors"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const accountRoutes = [
    {name: 'Agreements', path: '/account/agreements', icon: <FileText className="w-5 h-5" />},  
    {name: 'Transactions', path: '/account/transactions', icon: <DollarSign className="w-5 h-5" />}, 
    {name: 'Disputes', path: '/account/disputes', icon: <AlertCircle className="w-5 h-5" />},
    {name: 'Notifications', path: '/account/notifications', icon: <Bell className="w-5 h-5" />},
    {name: 'Settings', path: '/account/settings', icon: <Settings className="w-5 h-5" />}
];

const AccountLayout: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const { user } = getUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if(!isAuthenticated) {  
      navigate('/auth/login');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
  };


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle - adjusted top positioning */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-sky-500 text-white rounded-lg"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-3 border-b border-gray-100">
            <h2 className="font-semibold text-sm text-gray-900">{  user?.name  }</h2>
            <p className="text-xs text-gray-900">{  user?.email  }</p>
        </div>

        <nav className="p-4 space-y-1">
          {accountRoutes.map(accountRoute => (
            <SidebarItem 
              key={accountRoute.name} 
              icon={accountRoute.icon} 
              label={accountRoute.name} 
              to={accountRoute.path}
              onClick={() => setIsSidebarOpen(false)}
            />
          ))}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-sky-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AccountLayout;
