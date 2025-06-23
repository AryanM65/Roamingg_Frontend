import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useListing } from "../contexts/ListingContext";
import { useBooking } from "../contexts/BookingContext"; // Add this import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListingMap from "../components/ListingMap";
import ListingImageGallery from "../Components/ListingImageGallery";
import { StarIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { selectedListing, getListingById } = useListing();
  const { getBookingsByListing, completeBooking } = useBooking(); // Add booking context
  
  const [availability, setAvailability] = useState({
    startDate: null,
    endDate: null,
    singleQuantity: 0,
    doubleQuantity: 0,
    message: "",
    isAvailable: false
  });
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [userFeedback, setUserFeedback] = useState(null);
  const [newFeedback, setNewFeedback] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [bookings, setBookings] = useState([]); // State for bookings data

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getListingById(id);
        await fetchFeedbacks();
        
        // Fetch bookings if admin
        if (user?.role === "Admin") {
          const listingBookings = await getBookingsByListing(id);
          setBookings(listingBookings);
        }
      } catch (err) {
        setError("Failed to load listing details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // Update user feedback when feedbacks change
  useEffect(() => {
    if (user && feedbacks.length > 0) {
      const currentUserFeedback = feedbacks.find(
        feedback => feedback.user._id === user._id
      );
      setUserFeedback(currentUserFeedback || null);
    } else {
      setUserFeedback(null);
    }
  }, [feedbacks, user]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/feedbacks/${id}`,
        { withCredentials: true }
      );
      
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setError("Failed to load feedbacks");
    }
  };

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Updated availability check handler with new data structure
  const handleCheckAvailability = async () => {
    if (!availability.startDate || !availability.endDate) {
      setAvailability({
        ...availability,
        message: "Please select both start and end dates"
      });
      return;
    }

    // Validate at least one room is selected
    if (availability.singleQuantity <= 0 && availability.doubleQuantity <= 0) {
      setAvailability({
        ...availability,
        message: "Please select at least one room"
      });
      return;
    }

    try {
      // Prepare request data in the required format
      const requestData = {
        checkInDate: formatDate(availability.startDate),
        checkOutDate: formatDate(availability.endDate),
        numberOfRooms: {
          Single: availability.singleQuantity,
          Double: availability.doubleQuantity
        }
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/${id}/availability`,
        requestData,
        { withCredentials: true }
      );
      
      setAvailability({
        ...availability,
        message: response.data.message,
        isAvailable: response.data.isAvailable
      });
    } catch (error) {
      console.error("Availability check error:", error);
      const errorMsg = error.response?.data?.message || "Error checking availability";
      setAvailability({
        ...availability,
        message: errorMsg,
        isAvailable: false
      });
    }
  };

  // Handle navigation to booking page
  const handleBooking = () => {
    navigate(`/book/${id}`);
  };

  // Handle feedback submission
  const handleSubmitFeedback = async () => {
    if (!newFeedback.comment.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/addfeedback/${id}`,
        newFeedback,
        { withCredentials: true }
      );

      await fetchFeedbacks();
      setNewFeedback({ rating: 5, comment: "" });
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Feedback submission error:", error);
      alert(error.response?.data?.message || "Failed to submit feedback");
    }
  };

  // Handle feedback deletion
  const handleDeleteFeedback = async (feedbackId) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deletefeedback/${feedbackId}`,
        { withCredentials: true }
      );

      await fetchFeedbacks();
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Delete feedback error:", error);
      alert("Failed to delete feedback");
    }
  };

  // Handle completing a booking
  const handleCompleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to mark this booking as completed?")) return;

    try {
      await completeBooking(bookingId);
      // Refresh bookings list
      const updatedBookings = await getBookingsByListing(id);
      setBookings(updatedBookings);
      alert("Booking marked as completed successfully!");
    } catch (error) {
      console.error("Complete booking error:", error);
      alert(error.response?.data?.message || "Failed to complete booking");
    }
  };

  if (loading) return <div className="text-center py-10">Loading listing details...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!selectedListing) return <div className="text-center py-10">Listing not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Listing Header */}
      <br></br>
      <br></br>
      <br></br>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/2">
          <ListingImageGallery images={selectedListing.images} />
        </div>
        
        <div className="md:w-1/2">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold">{selectedListing.title}</h1>
          </div>
          
          <p className="text-gray-600 mb-4">{selectedListing.location?.address || "Address not available"}</p>
          
          {/* Room Prices */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">Room Prices</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Single Room</div>
                <div className="text-xl font-bold text-indigo-600">
                  ${selectedListing.pricePerNight?.Single || "N/A"} 
                  <span className="text-base font-normal text-gray-500"> / night</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Available: {selectedListing.availableRooms?.Single || 0}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Double Room</div>
                <div className="text-xl font-bold text-indigo-600">
                  ${selectedListing.pricePerNight?.Double || "N/A"} 
                  <span className="text-base font-normal text-gray-500"> / night</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Available: {selectedListing.availableRooms?.Double || 0}
                </div>
              </div>
            </div>
          </div>
          
          <p className="mb-6 text-gray-700">{selectedListing.description}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-bold mb-2">Property Details</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="font-medium">Room Types:</span> {selectedListing.roomTypes?.join(", ") || "N/A"}</div>
              {/* Show total revenue for admins */}
              {user?.role === "Admin" && (
                <div className="col-span-2 mt-2">
                  <span className="font-medium">Total Revenue:</span> 
                  <span className="ml-2 text-green-600 font-semibold">
                    ${selectedListing.totalRevenue || 0}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'details'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('details')}
        >
          {user?.role === "Admin" ? "Bookings" : "Availability & Booking"}
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'location'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('location')}
        >
          Location
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'feedback'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'details' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          {user?.role === "Admin" ? (
            <>
              <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
              {bookings.length === 0 ? (
                <p className="text-gray-500 italic">No bookings found for this listing.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked By</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rooms</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{booking.bookedBy?.name || "Unknown"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              Single: {booking.numberOfRooms?.Single || 0}<br />
                              Double: {booking.numberOfRooms?.Double || 0}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${booking.totalAmount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.status === "Booked" && (
                              <button
                                onClick={() => handleCompleteBooking(booking._id)}
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                              >
                                Complete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Check Availability & Book</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Dates</label>
                  <div className="flex gap-2">
                    <DatePicker
                      selected={availability.startDate}
                      onChange={date => setAvailability({...availability, startDate: date})}
                      minDate={new Date()}
                      className="w-full p-2 border rounded-md"
                      placeholderText="Start Date"
                    />
                    <DatePicker
                      selected={availability.endDate}
                      onChange={date => setAvailability({...availability, endDate: date})}
                      minDate={availability.startDate || new Date()}
                      className="w-full p-2 border rounded-md"
                      placeholderText="End Date"
                    />
                  </div>
                </div>
                
                {/* Single Room Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-1">Single Rooms</label>
                  <input
                    type="number"
                    min="0"
                    value={availability.singleQuantity}
                    onChange={e => setAvailability({...availability, singleQuantity: parseInt(e.target.value) || 0})}
                    className="w-full p-2.5 border rounded-md"
                  />
                </div>
                
                {/* Double Room Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-1">Double Rooms</label>
                  <input
                    type="number"
                    min="0"
                    value={availability.doubleQuantity}
                    onChange={e => setAvailability({...availability, doubleQuantity: parseInt(e.target.value) || 0})}
                    className="w-full p-2.5 border rounded-md"
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={handleCheckAvailability}
                    className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
              
              {availability.message && (
                <div className={`mb-4 p-3 rounded-md ${availability.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {availability.message}
                </div>
              )}
              
                <button
                  onClick={handleBooking}
                  className="w-full py-3 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Book Now
                </button>
            </>
          )}
        </div>
      )}

      {activeTab === 'location' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">Address</h3>
            <p className="text-gray-700">{selectedListing.location?.address || "Address not available"}</p>
          </div>
          
          <div className="mt-6">
            <ListingMap location={selectedListing.location} />
          </div>
          
          {selectedListing.location?.latitude && selectedListing.location?.longitude && (
            <div className="mt-4 text-sm text-gray-600">
              <p>Latitude: {selectedListing.location.latitude.toFixed(6)}</p>
              <p>Longitude: {selectedListing.location.longitude.toFixed(6)}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Guest Reviews</h2>
          
          {/* Feedback Form - Only for non-admin users */}
          {user && user.role !== "Admin" && !userFeedback && (
            <div className="mb-8 border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="font-bold mb-4 text-lg text-gray-700">Share Your Experience</h3>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600">Your Rating</label>
                  <div className="flex items-center">
                    <select
                      value={newFeedback.rating}
                      onChange={e => setNewFeedback({...newFeedback, rating: parseInt(e.target.value)})}
                      className="w-24 p-2.5 border rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <div className="ml-3 flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-5 w-5 ${i < newFeedback.rating ? 'text-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600">Your Review</label>
                  <textarea
                    value={newFeedback.comment}
                    onChange={e => setNewFeedback({...newFeedback, comment: e.target.value})}
                    className="w-full p-3 border rounded-md min-h-[120px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="What did you like about your stay? What could be improved?..."
                  />
                </div>
                
                <button
                  onClick={handleSubmitFeedback}
                  className="bg-indigo-600 text-white py-2.5 px-6 rounded-md hover:bg-indigo-700 transition self-end shadow-sm hover:shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}

          {/* User's Existing Feedback - Only for non-admin users */}
          {user && user.role !== "Admin" && userFeedback && (
            <div className="mb-8 border border-indigo-100 bg-indigo-50 rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-indigo-800">Your Review</h3>
                <button 
                  onClick={() => handleDeleteFeedback(userFeedback._id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-5 w-5 ${i < userFeedback.rating ? 'text-amber-400' : 'text-amber-200'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">rated {userFeedback.rating} out of 5</span>
              </div>
              <p className="mt-3 text-gray-700 leading-relaxed">{userFeedback.comment}</p>
              <p className="mt-3 text-xs text-gray-500">
                Posted on {new Date(userFeedback.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          )}

          {/* Feedback List - Visible to all */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-700">Guest Reviews</h3>
              {feedbacks.length > 0 && (
                <div className="text-sm text-gray-500">
                  {feedbacks.length} review{feedbacks.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
            
            {feedbacks.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <StarIcon className="h-10 w-10 mx-auto opacity-30" />
                </div>
                <p className="text-gray-500">No reviews yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {feedbacks.filter(fb => fb._id !== userFeedback?._id).map(feedback => (
                  <div key={feedback._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 text-indigo-800 h-10 w-10 rounded-full flex items-center justify-center font-bold mr-3">
                        {feedback.user?.name?.charAt(0) || "A"}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">
                            {feedback.user?.name || "Anonymous Guest"}
                          </h4>
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-amber-400 mr-1" />
                            <span className="text-sm text-gray-600">{feedback.rating}</span>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(feedback.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="mt-3 text-gray-700 leading-relaxed">
                          {feedback.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;