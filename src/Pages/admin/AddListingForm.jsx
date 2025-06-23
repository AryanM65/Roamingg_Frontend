import { useState } from "react";
import { useListing } from "../../contexts/ListingContext";

const AddListingForm = () => {
  const { createListing } = useListing();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Initialize room details
  const initialRoomDetails = {
    Single: { available: 0, price: 0 },
    Double: { available: 0, price: 0 },
  };
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
    selectedRoomTypes: ["Single", "Double"],
    roomDetails: initialRoomDetails,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoomTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newSelected = checked
        ? [...prev.selectedRoomTypes, value]
        : prev.selectedRoomTypes.filter(type => type !== value);
      
      return { 
        ...prev, 
        selectedRoomTypes: newSelected 
      };
    });
  };

  const handleRoomDetailChange = (roomType, field, value) => {
    setFormData(prev => ({
      ...prev,
      roomDetails: {
        ...prev.roomDetails,
        [roomType]: {
          ...prev.roomDetails[roomType],
          [field]: Number(value)
        }
      }
    }));
  };

  const handleImageChange = (e) => {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  const newFiles = Array.from(e.target.files).filter(file => 
    validTypes.includes(file.type)
  );

  setFormData(prev => {
    // Combine existing and new files, then take first 5
    const updatedImages = [...prev.images, ...newFiles].slice(0, 5);
    return { ...prev, images: updatedImages };
  });

  // Reset input to allow reselecting same files
  e.target.value = null;
};

  const removeImage = (index) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate coordinates
    if (isNaN(parseFloat(formData.latitude)) || isNaN(parseFloat(formData.longitude))) {
      setError("Please enter valid latitude and longitude coordinates");
      setIsSubmitting(false);
      return;
    }

    // Validate images
    if (formData.images.length === 0) {
      setError("Please select at least one image");
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare location data
      const locationData = JSON.stringify({
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      });
      
      // Prepare room data using reduce
      const availableRoomsData = JSON.stringify(
        formData.selectedRoomTypes.reduce((acc, type) => {
          acc[type] = formData.roomDetails[type].available;
          return acc;
        }, {})
      );
      
      const pricePerNightData = JSON.stringify(
        formData.selectedRoomTypes.reduce((acc, type) => {
          acc[type] = formData.roomDetails[type].price;
          return acc;
        }, {})
      );
      
      // Prepare form data for submission
      const submissionData = new FormData();
      submissionData.append("title", formData.title);
      submissionData.append("description", formData.description);
      submissionData.append("location", locationData);
      submissionData.append("roomTypes", JSON.stringify(formData.selectedRoomTypes));
      submissionData.append("availableRooms", availableRoomsData);
      submissionData.append("pricePerNight", pricePerNightData);
      
      // Append images with filenames
      formData.images.forEach((image) => {
        submissionData.append("images", image, image.name);
      });

      // Submit using context
      await createListing(submissionData);
      
      // Reset form on success
      setFormData({
        title: "",
        description: "",
        address: "",
        latitude: "",
        longitude: "",
        selectedRoomTypes: ["Single", "Double"],
        roomDetails: initialRoomDetails,
        images: [],
      });
      
      alert("Listing created successfully!");
    } catch (err) {
      // Enhanced error handling
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          "Failed to create listing";
      
      setError(errorMessage);
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <br></br>
      <br></br>
      <br></br>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Listing</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Location Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude *
            </label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
              placeholder="e.g., 40.7128"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude *
            </label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
              placeholder="e.g., -74.0060"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Room Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room Types *
          </label>
          <div className="flex space-x-4">
            {["Single", "Double"].map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  value={type}
                  checked={formData.selectedRoomTypes.includes(type)}
                  onChange={handleRoomTypeChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-gray-700">{type} Rooms</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Room Details */}
        {formData.selectedRoomTypes.map(type => (
          <div key={type} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
            <h3 className="md:col-span-2 font-medium text-gray-700">{type} Room Details</h3>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Available Rooms *
              </label>
              <input
                type="number"
                min="0"
                value={formData.roomDetails[type].available}
                onChange={(e) => handleRoomDetailChange(type, "available", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Price Per Night ($) *
              </label>
              <input
                type="number"
                min="0"
                value={formData.roomDetails[type].price}
                onChange={(e) => handleRoomDetailChange(type, "price", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
        
        {/* Images Upload */}
        {/* Images Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images (Max 5) *
          </label>
          
          {/* Custom file input wrapper */}
          <div className="flex items-center">
            {/* Hidden file input */}
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/jpeg, image/png, image/webp, image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />
            
            {/* Custom styled button */}
            <label 
              htmlFor="file-upload"
              className="cursor-pointer py-2 px-4 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-sm"
            >
              Select Images
            </label>
            
            {/* File count display */}
            <span className="ml-3 text-sm text-gray-500">
              {formData.images.length > 0 
                ? `${formData.images.length} file${formData.images.length > 1 ? 's' : ''} selected` 
                : "No files chosen"}
            </span>
          </div>
          
          <p className="mt-1 text-xs text-gray-500">
            JPEG, JPG, PNG, or WebP files only (max 5MB each)
          </p>
        </div>
        
        {/* Image Preview */}
        {formData.images.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Selected Images: {formData.images.length} of 5
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                  <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Creating Listing..." : "Create Listing"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListingForm;