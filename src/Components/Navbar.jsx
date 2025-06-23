import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg py-2' 
        : 'bg-gradient-to-r from-blue-800 to-purple-800 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to={
              user
                ? user.role === "Admin"
                  ? "/admin/dashboard"
                  : "/home"
                : "/"
            }
            className="flex items-center space-x-3"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
              Roamingg
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Hotels link for all users */}
            <Link to="/alllistings" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
              Hotels
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Add Listing for Admin */}
            {user?.role === 'Admin' && (
              <Link to="/add-listing" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
                Add Listing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
            
            {/* Dashboard for Admin */}
            {user?.role === 'Admin' && (
              <Link to="/admin/dashboard" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
            
            {/* Hide About and Contact when logged in */}
            {!user && (
              <>
                <Link to="/about" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/contact" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
            
            {/* User profile and auth links */}
            {user ? (
              <>
                <Link to="/profile" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group"
                >
                  Logout
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                <Link to="/profile" className="flex items-center ml-4">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="bg-gradient-to-r from-pink-500 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {user.name?.charAt(0) || user.username?.charAt(0) || 'U'}
                    </div>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/signup" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
                  Sign Up
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-full text-white`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 z-40 pt-16">
          <div className="flex flex-col items-center py-8 px-6 space-y-8">
            <Link 
              to="/alllistings" 
              className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
              onClick={() => setIsOpen(false)}
            >
              Hotels
            </Link>
            
            {/* Add Listing for Admin */}
            {user?.role === 'Admin' && (
              <Link 
                to="/add-listing" 
                className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
                onClick={() => setIsOpen(false)}
              >
                Add Listing
              </Link>
            )}
            
            {/* Dashboard for Admin */}
            {user?.role === 'Admin' && (
              <Link 
                to="/admin/dashboard" 
                className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            {/* Hide About and Contact when logged in */}
            {!user && (
              <>
                <Link 
                  to="/about" 
                  className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </>
            )}
            
            {user && (
              <>
                <Link 
                  to="/profile" 
                  className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                
                {user.role === 'Admin' && (
                  <Link 
                    to="/admin/users" 
                    className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Manage Users
                  </Link>
                )}
              </>
            )}
            
            <div className="w-full h-px bg-white/20 my-4"></div>
            
            <div className="flex flex-col w-full max-w-xs space-y-6">
              {user ? (
                <button 
                  onClick={handleLogout}
                  className="w-full text-center bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="w-full text-center text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="w-full text-center text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;