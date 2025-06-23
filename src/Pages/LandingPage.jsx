import React, { useState } from 'react';
import { 
  ArrowRight, Star, Shield, Award, Globe, Play, Check, 
  Heart, TrendingUp, ShieldCheck, CreditCard, Globe2, 
  Headphones, Smartphone, Gift, ChevronDown, Mail, Phone, MapPin
} from 'lucide-react';

const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSignup = () => {
    // Navigate to /signup - in a real app, you'd use router navigation
    console.log('Navigate to /signup');
  };

  // Data arrays
  const testimonials = [
    {
      name: "Abhay Pathak",
      comment: "Roamingg transformed how I travel. Their exclusive deals saved me hundreds on my Maldives getaway.",
      rating: 5,
      location: "Frequent Traveler"
    },
    {
      name: "Adit Gupta", 
      comment: "The personalized recommendations helped me discover hidden gems I would've never found on my own.",
      rating: 5,
      location: "Adventure Seeker"
    },
    {
      name: "Abhay Gupta", 
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
    { value: "10+", label: "Premium Properties" },
    { value: "50+", label: "Happy Travelers" },
    { value: "15+", label: "Countries Covered" },
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40"></div>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-800/30 to-transparent"></div>
        </div>
        
        <div className="relative z-20 text-center max-w-5xl mx-auto px-4 py-20">
          <div className="inline-block bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-sm px-8 py-3 rounded-full mb-8 border border-teal-400/30">
            <span className="text-teal-200 font-medium text-lg">✨ Discover the world differently</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight text-white">
            Travel <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Reimagined</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Experience seamless journeys with our curated travel platform. Luxury stays, exclusive experiences, and personalized service at your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <button 
              onClick={handleSignup}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-5 px-10 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-teal-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white py-5 px-10 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3 border border-white/20">
              <Play className="w-6 h-6" />
              <span>Watch Video</span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex justify-center items-center space-x-8 text-white/70">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-teal-400" />
              <span className="text-sm">Secure Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-teal-400" />
              <span className="text-sm">Award Winning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-teal-400" />
              <span className="text-sm">Worldwide Coverage</span>
            </div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center animate-bounce">
          <div className="w-8 h-14 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-6xl font-bold mb-3 transition-all group-hover:text-cyan-400">{stat.value}</div>
              <div className="text-indigo-200 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Travelers Choose Roamingg</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Premium benefits designed for the modern traveler who demands excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white via-white to-gray-50 p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Elevate Your Travel Experience</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Unlock premium benefits with Roamingg membership and travel like never before</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-6 group">
                  <div className={`mt-2 bg-gradient-to-r ${benefit.gradient} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border-4 border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="text-center">
                    <Heart className="w-20 h-20 text-pink-400 mx-auto mb-6 animate-pulse" />
                    <h3 className="text-4xl font-bold mb-6">Member Exclusive</h3>
                    <p className="text-xl text-gray-200 max-w-md mx-auto leading-relaxed">Access premium properties and experiences unavailable to the general public</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Traveler Stories</h2>
            <p className="text-xl text-gray-600">Discover why our community loves Roamingg</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 text-lg italic group-hover:text-gray-900 transition-colors leading-relaxed">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about Roamingg</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-3xl overflow-hidden transition-all hover:border-indigo-300 hover:shadow-lg"
              >
                <button
                  className={`flex justify-between items-center w-full p-8 text-left font-medium transition-all ${
                    activeFaq === index ? 'bg-indigo-50' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-xl font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-6 h-6 transition-transform duration-300 ${
                      activeFaq === index ? 'transform rotate-180 text-indigo-600' : 'text-gray-500'
                    }`}
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-8 pt-0 bg-indigo-50">
                    <p className="text-gray-700 text-lg leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-8 text-lg">Still have questions?</p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-10 rounded-2xl font-bold hover:shadow-lg transition-all inline-flex items-center space-x-3 text-lg">
              <Headphones className="w-6 h-6" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </section>

      {/* About Founder Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Meet Our Founder</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">The visionary behind Roamingg's mission to transform travel</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-12 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 text-6xl font-bold">
                    A
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Aryan Mahajan</h3>
                  <p className="text-xl text-teal-100">Founder & CEO</p>
                </div>
              </div>
              <div className="p-12 flex items-center">
                <div>
                  <blockquote className="text-2xl text-gray-700 font-medium mb-8 italic leading-relaxed">
                    "Travel isn't just about reaching a destination—it's about the journey, the experiences, and the memories we create along the way. At Roamingg, we're committed to making every journey extraordinary."
                  </blockquote>
                  <div className="space-y-4 text-gray-600">
                    <p className="text-lg">
                      With a passion for exploration and technology, Aryan founded Roamingg to bridge the gap between luxury travel and accessibility.
                    </p>
                    <p className="text-lg">
                      His vision: creating personalized travel experiences that inspire and connect people across the globe.
                    </p>
                  </div>
                  <div className="mt-8">
                    <button 
                      onClick={handleSignup}
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 px-8 rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center space-x-2"
                    >
                      <span>Join Our Journey</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-8">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of travelers experiencing the world through Roamingg's curated collection of exceptional stays and unforgettable experiences.
          </p>
          <button 
            onClick={handleSignup}
            className="bg-white text-cyan-600 py-5 px-12 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;