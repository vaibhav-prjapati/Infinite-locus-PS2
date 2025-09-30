import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // UPDATED: Hover color changed from indigo-600 to a more subtle gray-900
  const navLinkClasses = "text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300";
  const buttonClasses = "text-white px-4 py-2 rounded-md font-semibold transition-transform duration-200 ease-in-out hover:scale-105 shadow-sm";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to="/" className="text-3xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-300">
          Canteen
        </Link>

        {/* Navigation Links and Auth Section */}
        <div className="flex items-center space-x-6">
          <Link to="/" className={navLinkClasses}>Menu</Link>
          <Link to="/cart" className={navLinkClasses}>Cart</Link>
          {user && (
            <Link to="/history" className={navLinkClasses}>Order History</Link>
          )}

          {/* Vertical Separator */}
          <div className="border-l border-gray-300 h-6"></div>

          {user ? (
            // Authenticated User View
            <div className="flex items-center space-x-4">
              <span className="text-gray-800 font-medium">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className={`${buttonClasses} bg-red-500 hover:bg-red-600`}
              >
                Logout
              </button>
            </div>
          ) : (
            // Guest View
            <div className="flex items-center space-x-4">
              <Link to="/login" className={navLinkClasses}>Login</Link>
              <Link
                to="/register"
                className={`${buttonClasses} bg-indigo-500 hover:bg-indigo-600`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;