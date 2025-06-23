import { useEffect, useState, useMemo, useRef } from "react";
import { useListing } from "../contexts/ListingContext";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ListingCard } from "../Components/ListingCard";

const UserHome = () => {
  const { listings, getAllListings } = useListing();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const lastActiveCount = useRef(0);
  const recommendationsRef = useRef([]);

  const activeListings = useMemo(() => 
    listings.filter(listing => listing.isActive), 
    [listings]
  );

  const recommendedListings = useMemo(() => {
    if (activeListings.length !== lastActiveCount.current) {
      lastActiveCount.current = activeListings.length;
      
      if (activeListings.length >= 6) {
        const shuffled = [...activeListings];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        recommendationsRef.current = shuffled.slice(0, 6);
      } else {
        recommendationsRef.current = activeListings;
      }
    }
    return recommendationsRef.current;
  }, [activeListings]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        await getAllListings();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [getAllListings]);

  const handleListingClick = (listingId) => {
    navigate(`/listing/${listingId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg">Loading recommendations...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* CSS to hide active tags */}
      <style>{`
        .active-tag {
          display: none !important;
        }
      `}</style>
      
      <br />
      <br />
      <br />
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {user ? `Welcome back, ${user.name}!` : "Welcome to our platform!"}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover your perfect stay with our handpicked recommendations
        </p>
        
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          onClick={() => navigate("/alllistings")}
        >
          Book Your Journey Now
        </button>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Today's Featured Listings</h2>
        
        {recommendedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedListings.map((listing) => (
              <div 
                key={listing._id} 
                onClick={() => handleListingClick(listing._id)}
                className="cursor-pointer"
              >
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No active listings available at the moment. Please check back later.
          </p>
        )}
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-8">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2">Best Prices</h4>
            <p className="text-gray-600">Guaranteed lowest prices for all listings</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2">Verified Stays</h4>
            <p className="text-gray-600">All listings are personally verified</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-600">Our team is always here to help you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;