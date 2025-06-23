// context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Load user from server on mount
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/get-user-profile`,
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      console.error("Fetch user error:", err.response?.data || err.message);
    } finally {
      setLoading(false); // Stop loading regardless of success/error
    }
  };
  
    const login = async (form) => {
    try {
        const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/login`,
        form, // ✅ directly use the object { email, password }
        { withCredentials: true }
        );
        console.log("res", res);
        setUser(res.data.user);
        //console.log("user", user);
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
      console.log("res",res);
      return res.data.favourites;
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

  const getAllUsers = async () =>{
    try{
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/admin/users`, {withCredentials : true,});
      console.log("res", res);
      return res.data.users;
    }
    catch(error){
      console.log("error", error);
    }
  }

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
        getAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
