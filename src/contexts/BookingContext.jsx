import { createContext, useContext, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]); // Admin view
  const [userBookings, setUserBookings] = useState([]); // Customer view
  const [loading, setLoading] = useState(false);

  // 🔵 Create a new booking
  const createBooking = async ({
    listingId,
    numberOfRooms,
    checkInDate,
    checkOutDate,
    guests,
    paymentMethod,
  }) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/create-booking`,
        {
          listingId,
          numberOfRooms,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod,
        },
        {
          withCredentials: true, // ✅ include cookies or auth headers
        }
      );

      // 👉 Handle card payments by redirecting to Stripe Checkout
      if (paymentMethod === "Card" && res.data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
      }

      // 👉 For non-card methods (e.g., Cash), just return the response
      return res.data;
    } catch (error) {
      console.error("Create Booking Error:", error.response?.data || error.message);
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Get all bookings (Admin only)
  const getAllBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/all-bookings`,
        {
          withCredentials: true, // ✅ required for auth
        }
      );
      setBookings(res.data.bookings);
      return res.data.bookings;
    } catch (error) {
      console.error("Get All Bookings Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Get current user's bookings
  const getMyBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/my-bookings`,
        {
          withCredentials: true, // ✅ required for auth
        }
      );
      setUserBookings(res.data.bookings);
    } catch (error) {
      console.error("Get My Bookings Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Mark a booking as completed
  const completeBooking = async (bookingId) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/complete-booking/${bookingId}`,
        {},
        {
          withCredentials: true, // ✅ required for auth
        }
      );
      return res.data; // includes updated booking
    } catch (error) {
      console.error("Complete Booking Error:", error.response?.data || error.message);
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

    // 🔵 Get bookings for a specific listing
  const getBookingsByListing = async (listingId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/booking/${listingId}`,
        {
          withCredentials: true, // ✅ required for auth
        }
      );
      return res.data.bookings;
    } catch (error) {
      console.error("Get Bookings by Listing Error:", error.response?.data || error.message);
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };


  return (
    <BookingContext.Provider
      value={{
        bookings,
        userBookings,
        loading,
        createBooking,
        getAllBookings,
        getMyBookings,
        completeBooking,
        getBookingsByListing,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
