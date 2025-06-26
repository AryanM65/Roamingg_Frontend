import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useListing } from '../contexts/ListingContext';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const AllListings = () => {
  const { listings, getAllListings, toggleListingStatus } = useListing();
  const { user, addToFavorites, removeFromFavorites, fetchUser } = useUser();
  const [activeListings, setActiveListings] = useState([]);
  const [inactiveListings, setInactiveListings] = useState([]);
  const [filteredActiveListings, setFilteredActiveListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(user?.favourites || []);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [showInactive, setShowInactive] = useState(false);

  // Sync favorites with user context updates
  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    if (user?.favourites) {
      setFavorites(user.favourites.map(fav => fav._id));
    }
  }, [user?.favourites]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        await getAllListings();
        setError(null);
      } catch (err) {
        setError('Failed to fetch listings. Please try again later.');
        console.error('Fetch listings error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchListings();
  }, []);
  
  // Handle favorite toggle - UPDATED TO UPDATE LOCAL STATE
  const handleFavoriteToggle = async (listingId) => {
    try {
      const isFavorite = favorites.includes(listingId);
      let newFavorites;
      
      if (isFavorite) {
        await removeFromFavorites(listingId);
        newFavorites = favorites.filter(id => id !== listingId);
      } else {
        await addToFavorites(listingId);
        newFavorites = [...favorites, listingId];
      }
      
      // Update local state immediately for UI responsiveness
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Favorite toggle error:", error);
      alert(error.message || "Failed to update favorites");
    }
  };

  // Separate active and inactive listings
  useEffect(() => {
    if (user?.role === 'Customer') {
      setActiveListings(listings.filter(l => l.isActive));
    } else {
      setActiveListings(listings.filter(l => l.isActive));
      setInactiveListings(listings.filter(l => !l.isActive));
    }
  }, [listings, user]);

  // Apply filters to active listings
  useEffect(() => {
    let result = [...activeListings];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (listing.location?.address?.toLowerCase().includes(searchTerm.toLowerCase()))
    )}
    
    // Apply room type filter
    if (roomTypeFilter !== 'all') {
      result = result.filter(listing => 
        listing.roomTypes.includes(roomTypeFilter)
      );
    }
    
    // Apply price range filter
    if (minPrice || maxPrice) {
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      
      result = result.filter(listing => {
        const minPriceValue = Math.min(
          ...Object.values(listing.pricePerNight).map(Number)
        );
        return minPriceValue >= min && minPriceValue <= max;
      });
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => {
          const aMinPrice = Math.min(...Object.values(a.pricePerNight).map(Number));
          const bMinPrice = Math.min(...Object.values(b.pricePerNight).map(Number));
          return aMinPrice - bMinPrice;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const aMaxPrice = Math.max(...Object.values(a.pricePerNight).map(Number));
          const bMaxPrice = Math.max(...Object.values(b.pricePerNight).map(Number));
          return bMaxPrice - aMaxPrice;
        });
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
    
    setFilteredActiveListings(result);
  }, [activeListings, searchTerm, roomTypeFilter, minPrice, maxPrice, sortOption]);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleListingStatus(id, !currentStatus);
      const updatedListings = listings.map(listing => 
        listing._id === id ? { ...listing, isActive: !currentStatus } : listing
      );
      getAllListings(updatedListings);
    } catch (error) {
      console.error('Failed to toggle listing status:', error);
      alert('Failed to update listing status');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRoomTypeFilter('all');
    setMinPrice('');
    setMaxPrice('');
    setSortOption('newest');
    setShowInactive(false);
  };

  // Calculate counts for display
  const activeCount = useMemo(() => {
    return user?.role === 'Customer' 
      ? listings.filter(l => l.isActive).length 
      : listings.length;
  }, [listings, user]);

  const inactiveCount = useMemo(() => {
    return listings.filter(l => !l.isActive).length;
  }, [listings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <br></br>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading beautiful listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-center p-8 bg-red-50 rounded-lg max-w-md">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6">
        <br></br>
        <br></br>
        <br></br>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        {/* Header Section */}
        <div className="text-center mb-12">
          {user?.role === "Admin" ? (
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              All Listings
            </h1>
          ) : (
            <>
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                Discover Your Perfect Stay
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our collection of beautiful accommodations tailored to your preferences
              </p>
            </>
          )}
        </div>


        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search listings
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, location or description"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Room Type Filter */}
            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
                Room Type
              </label>
              <select
                id="roomType"
                value={roomTypeFilter}
                onChange={(e) => setRoomTypeFilter(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Single">Single Room</option>
                <option value="Double">Double Room</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range ($)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Clear Filters
              </button>
              
              {/* Admin-only inactive toggle */}
              {user?.role === 'Admin' && inactiveCount > 0 && (
                <button
                  onClick={() => setShowInactive(prev => !prev)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    showInactive 
                      ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {showInactive ? 'Hide Inactive' : 'Show Inactive'}
                </button>
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredActiveListings.length} of {activeCount} listings
              {user?.role === 'Admin' && ` (${inactiveCount} inactive)`}
            </div>
          </div>
        </div>

        {/* Show message if there are no active listings and we're not showing inactive */}
        {filteredActiveListings.length === 0 && !showInactive && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No listings match your search</h3>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Active Listings Grid */}
        {filteredActiveListings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActiveListings.map((listing) => (
              <div 
                key={listing._id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Image Gallery */}
                <div className="relative h-56 overflow-hidden">
                  {listing.images && listing.images.length > 0 ? (
                    <img 
                      src={listing.images[0]} 
                      alt={listing.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-500">
                      No Image Available
                    </div>
                  )}
                  
                  {/* Admin status tag */}
                  {user?.role === 'Admin' && (
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        listing.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {listing.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  )}
                  
                  {/* Admin status toggle */}
                  {user?.role === 'Admin' && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleStatus(listing._id, listing.isActive);
                      }}
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${
                        listing.isActive
                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {listing.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <Link 
                      to={`/listing/${listing._id}`}
                      className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {listing.title}
                    </Link>
                  </div>

                  <div className="mt-2 flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm truncate">{listing.location?.address || 'Address not available'}</span>
                  </div>

                  <p className="mt-3 text-gray-600 line-clamp-2">
                    {listing.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700 font-medium">ROOM TYPES</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {listing.roomTypes.map(type => (
                          <span 
                            key={type} 
                            className="text-sm font-medium text-blue-900 bg-blue-100 px-2 py-1 rounded"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-xs text-indigo-700 font-medium">PRICE PER NIGHT</p>
                      <div className="mt-1">
                        {Object.entries(listing.pricePerNight).map(([type, price]) => (
                          <div key={type} className="flex justify-between text-sm">
                            <span className="text-indigo-900">{type}:</span>
                            <span className="font-semibold">${price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <p className="text-xs text-gray-600">TOTAL ROOMS</p>
                      <div className="flex space-x-3 mt-1">
                        {Object.entries(listing.availableRooms).map(([type, count]) => (
                          <div key={type} className="text-center">
                            <span className="block text-lg font-bold">{count}</span>
                            <span className="text-xs text-gray-500">{type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {/* Add to Favorites button - UPDATED */}
                      {user?.role === 'Customer' && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleFavoriteToggle(listing._id);
                          }}
                          className={`flex items-center justify-center p-2 rounded-full ${
                            favorites.includes(listing._id)
                              ? 'bg-red-100 text-red-500'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                          aria-label={
                            favorites.includes(listing._id) 
                              ? "Remove from favorites" 
                              : "Add to favorites"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${
                              favorites.includes(listing._id) 
                                ? 'text-red-500 fill-current' 
                                : 'text-gray-500 fill-none stroke-current'
                            }`}
                            viewBox="0 0 20 20"
                            style={{ strokeWidth: favorites.includes(listing._id) ? 0 : 1.5 }}
                          >
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                      
                      <Link 
                        to={`/listing/${listing._id}`}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:opacity-90 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Admin-only Inactive Listings Section */}
        {user?.role === 'Admin' && showInactive && inactiveListings.length > 0 && (
          <div className="mt-16">
            <div className="border-b border-gray-200 pb-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Inactive Listings
              </h2>
              <p className="mt-1 text-gray-600">
                {inactiveListings.length} listings not currently available to customers
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {inactiveListings.map((listing) => (
                <div 
                  key={`inactive-${listing._id}`} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-red-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    {listing.images && listing.images.length > 0 ? (
                      <img 
                        src={listing.images[0]} 
                        alt={listing.title} 
                        className="w-full h-full object-cover opacity-70"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-500">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-red-50 bg-opacity-40"></div>
                    <div className="absolute top-3 right-3">
                      <div className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                        Inactive
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleStatus(listing._id, listing.isActive);
                      }}
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 hover:bg-green-200"
                    >
                      Activate
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <Link 
                        to={`/listing/${listing._id}`}
                        className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {listing.title}
                      </Link>
                    </div>

                    <div className="mt-2 flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm truncate">{listing.location?.address || 'Address not available'}</span>
                    </div>

                    <p className="mt-3 text-gray-600 line-clamp-2">
                      {listing.description}
                    </p>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Last updated: {new Date(listing.updatedAt).toLocaleDateString()}
                      </div>
                      
                      <Link 
                        to={`/listing/${listing._id}`}
                        className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:opacity-90 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListings;