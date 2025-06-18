import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Star, Shield, Award, Globe, Play, Check, 
  Heart, TrendingUp, ShieldCheck, CreditCard, Globe2, 
  Headphones, Smartphone, Gift, ChevronDown
} from 'lucide-react';

const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Data arrays
  const testimonials = [
    {
      name: "Sarah Johnson",
      comment: "Roamingg transformed how I travel. Their exclusive deals saved me hundreds on my Maldives getaway.",
      rating: 5,
      location: "Frequent Traveler"
    },
    {
      name: "Mike Chen", 
      comment: "The personalized recommendations helped me discover hidden gems I would've never found on my own.",
      rating: 5,
      location: "Adventure Seeker"
    },
    {
      name: "Emma Rodriguez", 
      comment: "Booking through Roamingg was seamless. Their customer service team resolved a last-minute issue within minutes!",
      rating: 5,
      location: "Business Traveler"
    }
  ];

  const features = [
    { icon: <TrendingUp size={32} />, title: "Exclusive Deals", description: "Access member-only pricing on premium accommodations worldwide" },
    { icon: <ShieldCheck size={32} />, title: "Price Protection", description: "Guaranteed best prices with our match policy" },
    { icon: <CreditCard size={32} />, title: "Flexible Payments", description: "Pay in installments with zero interest options" },
    { icon: <Globe2 size={32} />, title: "Global Coverage", description: "Over 1 million properties in 200+ countries" },
    { icon: <Smartphone size={32} />, title: "Mobile App", description: "Book and manage trips on the go with our app" },
    { icon: <Gift size={32} />, title: "Loyalty Rewards", description: "Earn points on every booking redeemable for future stays" }
  ];

  const faqs = [
    {
      question: "How do I become a Roamingg member?",
      answer: "Simply create an account on our platform to access exclusive member benefits. Premium tiers with additional perks are available through subscription."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Most bookings offer free cancellation up to 24 hours before check-in. Specific policies vary by property and are clearly displayed during the booking process."
    },
    {
      question: "How does your price match guarantee work?",
      answer: "If you find a lower publicly available price for the same property and dates within 24 hours of booking, we'll match it and give you an additional 10% discount."
    },
    {
      question: "Do you offer travel insurance?",
      answer: "Yes, comprehensive travel protection plans are available during checkout to cover unexpected events that might disrupt your travel plans."
    }
  ];

  const stats = [
    { value: "1M+", label: "Premium Properties" },
    { value: "5M+", label: "Happy Travelers" },
    { value: "200+", label: "Countries Covered" },
    { value: "24/7", label: "Customer Support" }
  ];

  const benefits = [
    { 
      title: "Priority Access", 
      description: "Be first to book limited availability properties and experiences",
      gradient: "from-cyan-500 to-blue-500"
    },
    { 
      title: "Personalized Concierge", 
      description: "24/7 dedicated support for itinerary planning and special requests",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      title: "Elite Rewards", 
      description: "Earn points on every booking redeemable for upgrades and experiences",
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      title: "Complimentary Benefits", 
      description: "Enjoy room upgrades, late checkouts, and welcome amenities",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-800/50 to-transparent"></div>
        </div>
        
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4 py-20">
          <div className="inline-block bg-indigo-600/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-indigo-400/30 animate-pulse">
            <span className="text-indigo-200 font-medium">Discover the world differently</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Travel <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Reimagined</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
            Experience seamless journeys with our curated travel platform. Luxury stays, exclusive experiences, and personalized service.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/destinations" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Explore Destinations</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-white/10 backdrop-blur-md text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2 border border-white/20">
              <Play className="w-5 h-5" />
              <span>Watch Video</span>
            </button>
          </div>
        </div>

        {/* Floating scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center animate-bounce">
          <div className="w-8 h-14 rounded-full border-2 border-white flex items-start justify-center p-1">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 group">
              <div className="text-4xl md:text-5xl font-bold mb-2 transition-all group-hover:text-cyan-400">{stat.value}</div>
              <div className="text-indigo-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Travelers Choose Roamingg</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Premium benefits designed for the modern traveler</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Elevate Your Travel Experience</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Unlock premium benefits with Roamingg membership</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className={`mt-1 bg-gradient-to-r ${benefit.gradient} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-video border-4 border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-3xl font-bold mb-4">Member Exclusive</h3>
                    <p className="text-xl text-gray-200 max-w-md mx-auto">Access premium properties and experiences unavailable to the general public</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Traveler Stories</h2>
            <p className="text-xl text-gray-600">Discover why our community loves Roamingg</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic group-hover:text-gray-900 transition-colors">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Your Journey, Our App</h2>
            <p className="text-xl mb-8 opacity-90 max-w-lg">
              Download the Roamingg app for exclusive mobile-only deals, real-time updates, and seamless booking management.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black/90 hover:bg-black text-white px-6 py-3 rounded-xl flex items-center space-x-3 transition-colors hover:scale-105">
                <div className="text-2xl">📱</div>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </button>
              <button className="bg-black/90 hover:bg-black text-white px-6 py-3 rounded-xl flex items-center space-x-3 transition-colors hover:scale-105">
                <div className="text-2xl">▶️</div>
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-black rounded-3xl border border-gray-700/50 shadow-2xl p-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center">
                    <Globe2 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Roamingg Mobile</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Exclusive mobile-only deals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Digital key & contactless check-in</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Real-time travel updates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Personalized recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about Roamingg</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all hover:border-indigo-300"
              >
                <button
                  className={`flex justify-between items-center w-full p-6 text-left font-medium ${
                    activeFaq === index ? 'bg-indigo-50' : 'bg-white'
                  } hover:bg-indigo-50`}
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeFaq === index ? 'transform rotate-180 text-indigo-600' : 'text-gray-500'
                    }`}
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 bg-indigo-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <Link to="/support" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-bold hover:shadow-lg transition-shadow inline-flex items-center space-x-2">
              <Headphones className="w-5 h-5" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of travelers experiencing the world through Roamingg's curated collection of exceptional stays.
          </p>
          <Link to="/signup" className="bg-white text-cyan-600 py-4 px-10 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg inline-block">
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}

    </div>
  );
};

export default LandingPage;