import React from 'react';
import { MapPin, Users, Globe, Heart, Star, ArrowRight } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { number: '50K+', label: 'Happy Travelers' },
    { number: '120+', label: 'Countries' },
    { number: '500+', label: 'Local Guides' },
    { number: '98%', label: 'Satisfaction' }
  ];

  const values = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Discovery',
      description: 'We believe every corner of the world holds a story waiting to be discovered.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community First',
      description: 'Our platform connects travelers with local communities for authentic experiences.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Sustainable Travel',
      description: 'We promote responsible tourism that benefits both travelers and destinations.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9225fcf?w=300&h=300&fit=crop&crop=face',
      bio: 'Former travel journalist with 15 years exploring hidden gems worldwide.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Community',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Cultural anthropologist passionate about connecting people through travel.'
    },
    {
      name: 'Aisha Patel',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Tech innovator building the future of personalized travel experiences.'
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
              <MapPin className="w-4 h-4 mr-2" />
              Discover. Connect. Roam.
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
              About Roamingg
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're reimagining travel by connecting curious souls with authentic experiences and local communities around the globe.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Born from a simple belief that travel should be more than just visiting places—it should be about creating meaningful connections and understanding different cultures.
                </p>
                <p>
                  Founded in 2019 by a team of passionate travelers, Roamingg started as a small platform to help adventurous souls find authentic local experiences. Today, we've grown into a global community that celebrates the beauty of cultural exchange.
                </p>
                <p>
                  Every journey tells a story, and we're here to help you write yours while supporting local communities and promoting sustainable tourism practices.
                </p>
              </div>
              <div className="mt-8">
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Join Our Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop" 
                alt="Beautiful landscape" 
                className="relative rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values shape every experience we create and every connection we facilitate.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group">
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet the Explorers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate team behind Roamingg, united by our love for discovery and connection.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-4 transition-all duration-500 text-center">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-300 fill-current" />
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Roaming?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered their next adventure through authentic local experiences.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Start Your Journey
            <ArrowRight className="w-6 h-6 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}