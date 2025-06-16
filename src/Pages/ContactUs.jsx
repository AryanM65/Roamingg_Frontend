import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Users, MessageCircle, CheckCircle } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: 'hello@roamingg.com',
      subtitle: 'We reply within 24 hours'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      subtitle: 'Mon-Fri, 9AM-6PM EST'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: 'San Francisco, CA',
      subtitle: 'Schedule an appointment'
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your travel needs'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Team',
      description: 'Experienced travel professionals ready to help'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Quick Response',
      description: 'Average response time under 2 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600 mb-8 shadow-lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              We're Here to Help
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about your next adventure? We'd love to hear from you and help make your travel dreams come true.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center group">
                <div className="text-blue-600 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="p-4 bg-blue-100 rounded-full">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-xl text-blue-600 font-semibold mb-2">{info.details}</p>
                <p className="text-gray-600">{info.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-green-600 mb-6 flex justify-center">
                    <div className="p-4 bg-green-100 rounded-full">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                      placeholder="Tell us about your travel plans or questions..."
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Roamingg?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  We're committed to providing exceptional support and personalized travel experiences. Our team is passionate about helping you discover the world in the most authentic way possible.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white/30 backdrop-blur-sm rounded-2xl hover:bg-white/50 transition-all duration-300">
                    <div className="text-blue-600 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Questions?</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How quickly do you respond?</h4>
                    <p className="text-gray-600">We typically respond to all inquiries within 2-24 hours during business days.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Can you help with custom itineraries?</h4>
                    <p className="text-gray-600">Absolutely! We specialize in creating personalized travel experiences tailored to your preferences.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Do you offer travel insurance?</h4>
                    <p className="text-gray-600">We partner with trusted providers to offer comprehensive travel insurance options for all our travelers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's create your perfect travel experience together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
              Browse Destinations
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
              View Travel Guides
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}