import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Calendar, Users, Star, Shield, Award, 
  Globe, ChevronLeft, ChevronRight, Play, Check, ArrowRight,
  Wifi, Car, Coffee, Utensils, Dumbbell, Waves
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
// Navbar Component


// Main Landing Page Component
const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const featuredHotels = [
    {
      id: 1,
      name: "Ocean Breeze Resort",
      location: "Maldives",
      price: "$299",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      amenities: ["Pool", "Spa", "Beach Access"]
    },
    {
      id: 2,
      name: "Mountain View Lodge",
      location: "Swiss Alps",
      price: "$189",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      amenities: ["Ski Access", "Restaurant", "Fireplace"]
    },
    {
      id: 3,
      name: "Urban Luxury Hotel",
      location: "New York",
      price: "$249",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      amenities: ["Gym", "Rooftop Bar", "Concierge"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      comment: "Amazing experience! The booking was seamless and the hotel exceeded expectations.",
      rating: 5,
      location: "Booked Ocean Breeze Resort"
    },
    {
      name: "Mike Chen", 
      comment: "Great platform with competitive prices. Customer service was outstanding.",
      rating: 5,
      location: "Booked Urban Luxury Hotel"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredHotels.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Perfect 
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Stay</span>
            <br />Awaits
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing hotels around the world with unbeatable prices
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search Hotels</span>
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 bg-pink-400/30 rounded-full animate-ping"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Roamingg?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Booking</h3>
              <p className="text-gray-600">Your payments and personal information are protected with bank-level security.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Price Guarantee</h3>
              <p className="text-gray-600">Find a lower price elsewhere? We'll match it and give you an extra 10% off.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Network</h3>
              <p className="text-gray-600">Access to over 1 million hotels worldwide in 200+ countries and territories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Hotels</h2>
            <p className="text-xl text-gray-600">Handpicked destinations for your perfect getaway</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      {hotel.amenities.map((amenity, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{hotel.price}</span>
                      <span className="text-gray-600">/night</span>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Hotels Worldwide</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5M+</div>
              <div className="text-blue-100">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8★</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Take Roamingg Anywhere</h2>
            <p className="text-xl mb-8 opacity-90">Download our app for exclusive mobile deals and seamless booking</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-black text-white px-8 py-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xs">📱</span>
                </div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
              <button className="bg-black text-white px-8 py-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xs">▶️</span>
                </div>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">Get the latest deals and travel inspiration delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border border-gray-300 rounded-l-lg sm:rounded-r-none rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-r-lg sm:rounded-l-none rounded-l-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Subscribe
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4">No spam, unsubscribe at any time</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;