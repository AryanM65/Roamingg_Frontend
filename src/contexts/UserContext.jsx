// context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from server on mount (if token exists)
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/get-user-id/${user?._id}`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Fetch user error:", err.response?.data || err.message);
    }
  };
  
    const login = async (form) => {
    try {
        const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/login`,
        form, // ✅ directly use the object { email, password }
        { withCredentials: true }
        );
        setUser(res.data.user);
        return res.data;
    } catch (err) {
        throw err.response?.data || { message: "Login failed" };
    }
    };


  const signup = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/signup`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Signup failed" };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };

  const sendOTP = async (email) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/send-otp`, { email });
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Send OTP failed" };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "OTP verification failed" };
    }
  };

  const getFavorites = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/favorites`, {
        withCredentials: true,
      });
      return res.data.favorites;
    } catch (err) {
      console.error("Get favorites error:", err.response?.data || err.message);
      return [];
    }
  };

  const addToFavorites = async (listingId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/favorites/add`,
        { listingId },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Add to favorites failed" };
    }
  };

  const removeFromFavorites = async (listingId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/${listingId}/favourite`,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Remove from favorites failed" };
    }
  };

  const viewUserProfile = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/get-user-id/${id}`, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (err) {
      throw err.response?.data || { message: "View profile failed" };
    }
  };

  const editUserProfile = async (formData) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/edit-profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Edit profile failed" };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        sendOTP,
        verifyOTP,
        getFavorites,
        addToFavorites,
        removeFromFavorites,
        viewUserProfile,
        editUserProfile,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
