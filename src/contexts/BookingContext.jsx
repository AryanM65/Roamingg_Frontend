import { createContext, useContext, useState } from "react";
import axios from "axios";

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
      const res = await axios.post("/api/bookings/create-booking", {
        listingId,
        numberOfRooms,
        checkInDate,
        checkOutDate,
        guests,
        paymentMethod,
      });
      return res.data; // includes booking object
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
      const res = await axios.get("/api/bookings/all-bookings");
      setBookings(res.data.bookings);
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
      const res = await axios.get("/api/bookings/my-bookings");
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
      const res = await axios.put(`/api/bookings/complete-booking/${bookingId}`);
      return res.data; // includes updated booking
    } catch (error) {
      console.error("Complete Booking Error:", error.response?.data || error.message);
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
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
