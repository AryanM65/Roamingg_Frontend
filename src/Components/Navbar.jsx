import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, Search, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg py-2' 
        : 'bg-gradient-to-r from-blue-800 to-purple-800 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
              Roamingg
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/hotels" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
              Hotels
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/destinations" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
              Destinations
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/experiences" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
              Experiences
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="font-medium transition-all duration-300 text-white hover:text-pink-300 relative group">
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-full transition-all duration-300 flex items-center text-white hover:bg-blue-700`}
              >
                <Search className="w-5 h-5" />
              </button>
              
              {searchOpen && (
                <div className="absolute top-14 right-0 w-80 bg-white rounded-xl shadow-xl p-4 animate-fade-in z-50">
                  <div className="flex items-center border-b border-gray-200 pb-2">
                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                    <input 
                      type="text" 
                      placeholder="Search destinations, hotels, experiences..." 
                      className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
                      autoFocus
                    />
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    <p className="font-medium mb-1">Recent Searches</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gradient-to-r from-pink-100 to-blue-100 text-gray-700 px-3 py-1 rounded-full">Bali</span>
                      <span className="bg-gradient-to-r from-pink-100 to-blue-100 text-gray-700 px-3 py-1 rounded-full">Paris Luxury</span>
                      <span className="bg-gradient-to-r from-pink-100 to-blue-100 text-gray-700 px-3 py-1 rounded-full">Beach Resorts</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button className={`p-2.5 rounded-full transition-colors text-white hover:bg-blue-700`}>
              <Heart className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-full transition-colors text-white hover:bg-blue-700`}
            >
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2.5 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-md"
              >
                <span>Account</span>
                <User className="w-4 h-4" />
              </button>
              
              {userDropdown && (
                <div className="absolute top-14 right-0 w-48 bg-white rounded-xl shadow-xl p-2 animate-fade-in z-50">
                  <Link 
                    to="/login" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-blue-50 rounded-lg transition-colors"
                    onClick={() => setUserDropdown(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-blue-50 rounded-lg transition-colors"
                    onClick={() => setUserDropdown(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              className={`p-2.5 rounded-full text-white`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-full text-white`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 shadow-lg z-40">
          <div className="flex items-center border-b border-gray-200 pb-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search destinations, hotels, experiences..." 
              className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 z-40 pt-16 animate-fade-in">
          <div className="flex flex-col items-center py-8 px-6 space-y-8">
            <Link 
              to="/hotels" 
              className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
              onClick={() => setIsOpen(false)}
            >
              Hotels
            </Link>
            <Link 
              to="/destinations" 
              className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
              onClick={() => setIsOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              to="/experiences" 
              className="text-2xl font-medium text-white transition-colors hover:text-pink-300"
              onClick={() => setIsOpen(false)}
            >
              Experiences
            </Link>
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
            
            <div className="w-full h-px bg-white/20 my-4"></div>
            
            <div className="flex flex-col w-full max-w-xs space-y-6">
              <Link 
                to="/login" 
                className="w-full text-center bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="w-full text-center bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
            
            <div className="flex space-x-6 pt-8">
              <button className="p-4 bg-white/20 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </button>
              <button 
                className="p-4 bg-white/20 rounded-full"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Moon className="w-6 h-6 text-white" /> : <Sun className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;