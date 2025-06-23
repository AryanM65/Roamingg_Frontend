import { createContext, useContext, useState } from "react";
import axios from "axios";

const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);

  const createListing = async (formData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/addlisting`,
      formData,
      {
        // headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return res.data;
  };

  const editListing = async (listingId, formData) => {
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/listings/editlisting?listingId=${listingId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return res.data;
  };

  const getListingById = async (id) => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/listing/${id}`,
      { withCredentials: true }
    );
    setSelectedListing(res.data.listing);
    return res.data.listing;
  };

  const checkListingAvailability = async (id, data) => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/${id}/availability`,
      {
        data, // send body with GET using `axios.get`, which supports this via `config.data`
        withCredentials: true,
      }
    );
    return res.data;
  };

  const toggleListingStatus = async (id, isActive) => {
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/${id}/status`,
      { isActive },
      { withCredentials: true }
    );
    return res.data;
  };

    const getAllListings = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/v1/all-listings`,
            { withCredentials: true }
        );
        setListings(res.data.listings);
        return res.data.listings;
    };

  return (
    <ListingContext.Provider
      value={{
        listings,
        selectedListing,
        createListing,
        editListing,
        getListingById,
        checkListingAvailability,
        toggleListingStatus,
        getAllListings,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => useContext(ListingContext);
