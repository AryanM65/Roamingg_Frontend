import React from 'react';
import { MapPin, Users, Globe, Heart, Star, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { number: '50+', label: 'Happy Travelers' },
    { number: '12+', label: 'Countries' },
    { number: '50+', label: 'Local Guides' },
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
      name: 'Aryan Mahajan',
      role: 'Founder & CEO',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzM3NTVGRiIvPgo8c3RvcCBvZmZmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiM5MzMzRUEiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRUY0NDg4Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSIxNTAiIGZpbGw9InVybCgjYmcpIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPkE8L3RleHQ+Cjwvc3ZnPg==',
      bio: 'Visionary entrepreneur with a passion for connecting cultures and creating meaningful travel experiences that transform both travelers and communities.',
      special: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-md rounded-full text-sm font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-8 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              Discover. Connect. Roam.
              <Sparkles className="w-4 h-4 ml-2 text-purple-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight leading-normal pb-2">
              About Roamingg
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              We're reimagining travel by connecting curious souls with authentic experiences and local communities around the globe.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white/60 backdrop-blur-lg border-y border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-500 border border-white/40">
                  <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-bold text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40">
                <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text mb-8 leading-tight">
                  Our Story
                </h2>
                <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                  <p className="font-medium">
                    Born from a simple belief that travel should be more than just visiting places—it should be about creating meaningful connections and understanding different cultures.
                  </p>
                  <p>
                    Founded in 2025 by <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Aryan Mahajan</span>, Roamingg started as a passionate project to help adventurous souls find authentic local experiences. Today, we've grown into a global community that celebrates the beauty of cultural exchange.
                  </p>
                  <p>
                    Every journey tells a story, and we're here to help you write yours while supporting local communities and promoting sustainable tourism practices.
                  </p>
                </div>
                <div className="mt-10">
                  <button 
                    onClick={() => window.location.href = '/signup'}
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-white/30"
                  >
                    Join Our Journey
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500 opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 opacity-40"></div>
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl transform group-hover:scale-105 transition-all duration-500 border-4 border-white/50">
                <img 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&crop=center" 
                  alt="Beautiful landscape" 
                  className="w-full h-80 object-cover rounded-2xl"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Beautiful+Landscape";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-28 bg-white/40 backdrop-blur-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text mb-8">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Our core values shape every experience we create and every connection we facilitate.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-white/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-8 group-hover:scale-125 transition-transform duration-300 inline-block">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">{value.title}</h3>
                    <p className="text-gray-700 leading-relaxed font-medium">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text mb-8">
              Meet the Founder
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              The visionary behind Roamingg, driven by a passion for meaningful travel and cultural connection.
            </p>
          </div>
          <div className="grid justify-center">
            {team.map((member, index) => (
              <div key={index} className="group cursor-pointer max-w-md">
                <div className={`bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-xl hover:shadow-2xl transform hover:-translate-y-6 transition-all duration-500 text-center border border-white/40 relative overflow-hidden ${member.special ? 'ring-4 ring-gradient-to-r ring-blue-500/30' : ''}`}>
                  {member.special && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-xs font-bold transform rotate-12 shadow-lg">
                      FOUNDER
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-110"></div>
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="relative w-28 h-28 rounded-full mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500 border-4 border-white/80"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">{member.name}</h3>
                    <p className="text-blue-600 font-bold mb-6 text-lg">{member.role}</p>
                    <p className="text-gray-700 leading-relaxed font-medium">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-28 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-10 h-10 text-yellow-300 fill-current hover:scale-125 transition-transform duration-300 animate-pulse" style={{animationDelay: `${i * 200}ms`}} />
            ))}
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Ready to Start Roaming?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Join thousands of travelers who've discovered their next adventure through authentic local experiences.
          </p>
          <button 
            onClick={() => window.location.href = '/signup'}
            className="group inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-full font-black text-xl hover:bg-blue-50 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-white/25 border-4 border-white/20 hover:border-white/40"
          >
            Start Your Journey
            <ArrowRight className="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}