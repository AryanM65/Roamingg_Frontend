import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useBooking } from '../contexts/BookingContext';

const UserProfile = () => {
  const { user, logout, getFavorites, removeFromFavorites, editUserProfile, fetchUser } = useUser();
  const { getMyBookings, userBookings, loading: bookingsLoading } = useBooking();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    profilePicture: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const [activeTab, setActiveTab] = useState('favorites');
  const [error, setError] = useState(null);

  // Skeleton loaders
  const SkeletonCard = () => (
    <div className="animate-pulse border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-200 h-48 w-full" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  const SkeletonBooking = () => (
    <div className="animate-pulse border rounded-lg p-4 shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <div className="bg-gray-200 w-full h-40 rounded-lg"></div>
        </div>
        <div className="md:w-3/4 md:pl-6">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mt-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Load user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchUser();
      } catch (err) {
        console.error('Error loading user:', err);
        setError('Failed to load user data');
      } finally {
        setUserLoading(false);
      }
    };
    
    if (!user) loadUser();
    else setUserLoading(false);
  }, [user, fetchUser]);

  // Load user favorites
  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        try {
          const favs = await getFavorites();
          setFavorites(favs || []);
        } catch (err) {
          console.error('Error loading favorites:', err);
          setError('Failed to load favorites');
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadFavorites();
  }, [user, getFavorites]);

  // Load user bookings
  useEffect(() => {
    const loadBookings = async () => {
      if (user) {
        try {
          await getMyBookings();
        } catch (err) {
          console.error('Error loading bookings:', err);
          setError('Failed to load bookings');
        }
      }
    };
    
    loadBookings();
  }, [user]);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user && !editMode) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        profilePicture: null
      });
      setPreviewImage(user.profilePicture || '');
    }
  }, [user, editMode]);

  const handleLogout = () => {
    logout();
  };

  const handleRemoveFavorite = async (listingId) => {
    try {
      await removeFromFavorites(listingId);
      setFavorites(favorites.filter(fav => fav._id !== listingId));
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove favorite');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('username', formData.username);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      if (formData.profilePicture) {
        form.append('profilePicture', formData.profilePicture);
      }
      
      await editUserProfile(form);
      setEditMode(false);
    } catch (err) {
      console.error('Profile update error:', err);
      setError('Failed to update profile');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, profilePicture: file});
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return 'Invalid date';
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-blue-500 animate-pulse mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Loading Your Profile</h2>
          <p className="text-gray-500">Just a moment...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-150 ease-in-out"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button 
                  className="text-red-700 hover:text-red-500"
                  onClick={() => setError(null)}
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative mb-6 md:mb-0 md:mr-8">
              <div className="relative">
                {previewImage ? (
                  <div className="relative rounded-full overflow-hidden w-40 h-40 border-4 border-white shadow-lg">
                    <img 
                      src={previewImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed border-gray-300 rounded-full w-40 h-40 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                
                {editMode && (
                  <div className="mt-4 text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Change Profile Photo
                    </label>
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Choose File
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left w-full">
              {editMode ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-150 ease-in-out"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600 mt-1">@{user.username}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {user.role}
                    </span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      {user.email}
                    </span>
                    {user.phone && (
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                        {user.phone}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-150 ease-in-out"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                      </div>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-150 ease-in-out"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-4 px-8 font-semibold text-lg relative ${
              activeTab === 'favorites'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('favorites')}
          >
            Your Favourites
            {activeTab === 'favorites' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
            )}
          </button>
          <button
            className={`py-4 px-8 font-semibold text-lg relative ${
              activeTab === 'bookings'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            Your Bookings
            {activeTab === 'bookings' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Favorites Section */}
        {activeTab === 'favorites' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Favourites</h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : !favorites || favorites.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Start saving your favorite listings by clicking the heart icon on any property
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map(listing => (
                  <div 
                    key={listing._id} 
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {listing.images?.[0] ? (
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={listing.images[0]} 
                          alt={listing.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-b border-gray-200 h-56 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-1 text-gray-800 truncate">{listing.title}</h3>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Single:</span>
                          <span className="font-medium">${listing.pricePerNight?.Single || 'N/A'}/night</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Double:</span>
                          <span className="font-medium">${listing.pricePerNight?.Double || 'N/A'}/night</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFavorite(listing._id)}
                        className="w-full py-2 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove from Favorites
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bookings Section */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h2>
            
            {bookingsLoading ? (
              <div className="space-y-6">
                <SkeletonBooking />
                <SkeletonBooking />
              </div>
            ) : !userBookings || userBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Start your journey by booking your first stay with us
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {userBookings.map(booking => (
                  <div 
                    key={booking._id} 
                    className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        {booking.listing?.images?.[0] ? (
                          <div className="overflow-hidden rounded-lg h-40 md:h-full">
                            <img 
                              src={booking.listing.images[0]} 
                              alt={booking.listing.title || 'Listing image'} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 rounded-lg h-40 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="md:w-3/4 md:pl-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {booking.listing?.title || 'Unavailable Listing'}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="font-medium text-gray-700">Dates</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                              <span className="block">Check-in: {formatDate(booking.checkInDate)}</span>
                              <span className="block">Check-out: {formatDate(booking.checkOutDate)}</span>
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span className="font-medium text-gray-700">Pricing</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                              <span className="block">Rooms: 
                                {booking.numberOfRooms?.Single > 0 && ` ${booking.numberOfRooms.Single} Single`}
                                {booking.numberOfRooms?.Double > 0 && ` ${booking.numberOfRooms.Double} Double`}
                              </span>
                              <span className="block">Total: ${booking.totalAmount || 'N/A'}</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-700 mr-2">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'Booked' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {booking.status || 'Unknown'}
                            </span>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-700 mb-1">Guests:</p>
                            {booking.guests?.length > 0 ? (
                              <ul className="flex flex-wrap gap-2">
                                {booking.guests.map((guest, index) => (
                                  <li key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                    {guest.name} {guest.age && `(${guest.age})`}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500 text-sm">No guest information</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;