import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, User, Heart, Search } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
              isScrolled ? '' : 'text-white'
            }`}>
              Roamingg
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white hover:text-blue-200'
            }`}>
              Hotels
            </a>
            <a href="#" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white hover:text-blue-200'
            }`}>
              Destinations
            </a>
            <a href="#" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white hover:text-blue-200'
            }`}>
              Deals
            </a>
            <a href="/about" className={`font-medium transition-colors hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-white hover:text-blue-200'
            }`}>
              About
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`p-2 rounded-full transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}>
              <Heart className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}>
              <User className="w-5 h-5" />
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
              Hotels
            </a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
              Destinations
            </a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
              Deals
            </a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
              About
            </a>
            <div className="pt-4 pb-2 border-t border-gray-200">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;