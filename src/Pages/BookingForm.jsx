// src/components/booking/BookingForm.jsx
import React, { useState, useEffect } from 'react';
import { useBooking } from '../contexts/BookingContext';
import { useListing } from '../contexts/ListingContext';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaCreditCard, 
  FaMoneyBillWave, 
  FaBed, 
  FaTrash,
  FaIdCard
} from 'react-icons/fa';

const BookingForm = () => {
  const { createBooking } = useBooking();
  const { getListingById, selectedListing } = useListing();
  const navigate = useNavigate();
  const { listingId } = useParams();
  
  // Form state
  const [formData, setFormData] = useState({
    listingId: listingId,
    numberOfRooms: { Single: 0, Double: 0 },
    checkInDate: '',
    checkOutDate: '',
    guests: [{ name: '', age: '', gender: '', idType: '', idNumber: '' }],
    paymentMethod: 'Card'
  });

  const [errors, setErrors] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [nights, setNights] = useState(0);
  const [loadingListing, setLoadingListing] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch the listing by ID
  useEffect(() => {
    const fetchListing = async () => {
      if (listingId) {
        setLoadingListing(true);
        await getListingById(listingId);
        setLoadingListing(false);
      }
    };
    fetchListing();
  }, [listingId]);

  // Calculate total and nights when dates or rooms change
  useEffect(() => {
    if (!selectedListing) return;

    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diff = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      setNights(diff > 0 ? diff : 0);
    } else {
      setNights(0);
    }

    if (nights > 0 && selectedListing) {
      const singlePrice = selectedListing.pricePerNight.Single || 0;
      const doublePrice = selectedListing.pricePerNight.Double || 0;
      const singleRooms = formData.numberOfRooms.Single || 0;
      const doubleRooms = formData.numberOfRooms.Double || 0;
      
      setTotalAmount((singleRooms * singlePrice + doubleRooms * doublePrice) * nights);
    } else {
      setTotalAmount(0);
    }
  }, [formData.checkInDate, formData.checkOutDate, formData.numberOfRooms, nights, selectedListing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoomChange = (roomType, value) => {
    const intValue = parseInt(value) || 0;
    setFormData({
      ...formData,
      numberOfRooms: {
        ...formData.numberOfRooms,
        [roomType]: intValue
      }
    });
  };

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...formData.guests];
    updatedGuests[index][field] = value;
    setFormData({ ...formData, guests: updatedGuests });
  };

  const addGuest = () => {
    setFormData({
      ...formData,
      guests: [
        ...formData.guests,
        { name: '', age: '', gender: '', idType: '', idNumber: '' }
      ]
    });
  };

  const removeGuest = (index) => {
    if (formData.guests.length <= 1) return;
    const updatedGuests = [...formData.guests];
    updatedGuests.splice(index, 1);
    setFormData({ ...formData, guests: updatedGuests });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Date validation
    if (!formData.checkInDate) newErrors.checkInDate = 'Check-in date is required';
    if (!formData.checkOutDate) newErrors.checkOutDate = 'Check-out date is required';
    
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      
      if (checkOut <= checkIn) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }
    
    // Room validation
    const singleRooms = formData.numberOfRooms.Single || 0;
    const doubleRooms = formData.numberOfRooms.Double || 0;
    
    if (singleRooms + doubleRooms === 0) {
      newErrors.rooms = 'At least one room must be selected';
    }
    
    if (selectedListing) {
      if (singleRooms > selectedListing.availableRooms.Single) {
        newErrors.singleRooms = `Only ${selectedListing.availableRooms.Single} single rooms available`;
      }
      
      if (doubleRooms > selectedListing.availableRooms.Double) {
        newErrors.doubleRooms = `Only ${selectedListing.availableRooms.Double} double rooms available`;
      }
    }
    
    // Guest validation - all fields are required
    formData.guests.forEach((guest, index) => {
      // Validate name
      if (!guest.name.trim()) {
        newErrors[`guest${index}name`] = 'Name is required';
      } else if (guest.name.trim().length < 2) {
        newErrors[`guest${index}name`] = 'Name must be at least 2 characters';
      }
      
      // Validate age
      if (!guest.age) {
        newErrors[`guest${index}age`] = 'Age is required';
      } else if (isNaN(guest.age) || guest.age <= 0) {
        newErrors[`guest${index}age`] = 'Age must be a positive number';
      } else if (guest.age < 1 || guest.age > 120) {
        newErrors[`guest${index}age`] = 'Age must be between 1-120';
      }
      
      // Validate gender
      if (!guest.gender) {
        newErrors[`guest${index}gender`] = 'Gender is required';
      }
      
      // Validate ID type
      if (!guest.idType) {
        newErrors[`guest${index}idType`] = 'ID Type is required';
      }
      
      // Validate ID number
      if (!guest.idNumber.trim()) {
        newErrors[`guest${index}idNumber`] = 'ID Number is required';
      } else if (guest.idNumber.trim().length < 2) {
        newErrors[`guest${index}idNumber`] = 'ID number must be at least 2 characters';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      
      // Prepare guests data - convert age to number
      const guests = formData.guests.map(guest => ({
        ...guest,
        age: Number(guest.age)
      }));
      
      const bookingResponse = await createBooking({
        listingId: formData.listingId,
        numberOfRooms: formData.numberOfRooms,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        guests,
        paymentMethod: formData.paymentMethod
      });
      
      // For cash payments, show success message
      if (formData.paymentMethod === 'Cash') {
        navigate('/booking-success', { state: { booking: bookingResponse } });
      }
      // For card, the createBooking will handle the redirect to Stripe
    } catch (error) {
      console.error('Booking submission error:', error);
      let errorMessage = 'Booking failed. Please try again.';
      
      // Handle specific error messages from backend
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingListing) {
    return <div className="text-center py-10">Loading listing details...</div>;
  }

  if (!selectedListing) {
    return <div className="text-center py-10 text-red-500">Listing not found</div>;
  }

  // Calculate available rooms
  const availableSingle = selectedListing.availableRooms.Single || 0;
  const availableDouble = selectedListing.availableRooms.Double || 0;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-xl">
        <h1 className="text-2xl font-bold mb-2">Book Your Stay</h1>
        <h2 className="text-xl">{selectedListing.title}</h2>
        <p className="opacity-90">{selectedListing.description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {/* Room Selection */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaBed className="mr-2 text-indigo-600" /> Room Selection
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">Single Rooms</label>
                <span className="text-sm text-gray-500">
                  Available: {availableSingle} | ${selectedListing.pricePerNight.Single}/night
                </span>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={() => handleRoomChange('Single', formData.numberOfRooms.Single - 1)}
                  disabled={formData.numberOfRooms.Single <= 0}
                >
                  -
                </button>
                <span className="mx-4 font-medium">{formData.numberOfRooms.Single}</span>
                <button
                  type="button"
                  className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center"
                  onClick={() => handleRoomChange('Single', formData.numberOfRooms.Single + 1)}
                  disabled={formData.numberOfRooms.Single >= availableSingle}
                >
                  +
                </button>
              </div>
              {errors.singleRooms && (
                <p className="text-red-500 text-sm mt-1">{errors.singleRooms}</p>
              )}
            </div>
            
            <div className="border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">Double Rooms</label>
                <span className="text-sm text-gray-500">
                  Available: {availableDouble} | ${selectedListing.pricePerNight.Double}/night
                </span>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={() => handleRoomChange('Double', formData.numberOfRooms.Double - 1)}
                  disabled={formData.numberOfRooms.Double <= 0}
                >
                  -
                </button>
                <span className="mx-4 font-medium">{formData.numberOfRooms.Double}</span>
                <button
                  type="button"
                  className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center"
                  onClick={() => handleRoomChange('Double', formData.numberOfRooms.Double + 1)}
                  disabled={formData.numberOfRooms.Double >= availableDouble}
                >
                  +
                </button>
              </div>
              {errors.doubleRooms && (
                <p className="text-red-500 text-sm mt-1">{errors.doubleRooms}</p>
              )}
            </div>
          </div>
          {errors.rooms && (
            <p className="text-red-500 text-sm mt-2">{errors.rooms}</p>
          )}
        </div>
        
        {/* Dates */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-indigo-600" /> Dates
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Check-in Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-2 border rounded-md"
              />
              {errors.checkInDate && (
                <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Check-out Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleInputChange}
                min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                className="w-full p-2 border rounded-md"
              />
              {errors.checkOutDate && (
                <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Guests */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <FaUser className="mr-2 text-indigo-600" /> Guest Information
            </h3>
            <button
              type="button"
              onClick={addGuest}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              + Add Guest
            </button>
          </div>
          
          {formData.guests.map((guest, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg relative">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeGuest(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
              <h4 className="font-medium mb-3">Guest {index + 1}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={guest.name}
                    onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors[`guest${index}name`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`guest${index}name`]}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={guest.age}
                    onChange={(e) => handleGuestChange(index, 'age', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    min="1"
                  />
                  {errors[`guest${index}age`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`guest${index}age`]}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={guest.gender}
                    onChange={(e) => handleGuestChange(index, 'gender', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors[`guest${index}gender`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`guest${index}gender`]}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ID Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={guest.idType}
                    onChange={(e) => handleGuestChange(index, 'idType', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select ID Type</option>
                    <option value="Passport">Passport</option>
                    <option value="Driver License">Driver License</option>
                    <option value="National ID">National ID</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors[`guest${index}idType`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`guest${index}idType`]}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    ID Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={guest.idNumber}
                    onChange={(e) => handleGuestChange(index, 'idNumber', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors[`guest${index}idNumber`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`guest${index}idNumber`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Payment */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            {formData.paymentMethod === 'Card' ? (
              <FaCreditCard className="mr-2 text-indigo-600" />
            ) : (
              <FaMoneyBillWave className="mr-2 text-indigo-600" />
            )}
            Payment Method
          </h3>
          
          <div className="flex space-x-4 mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={formData.paymentMethod === 'Card'}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Credit/Debit Card</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash"
                checked={formData.paymentMethod === 'Cash'}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Pay at Property</span>
            </label>
          </div>
          
          {formData.paymentMethod === 'Card' && (
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-indigo-700">
                You will be redirected to our secure payment gateway to complete your transaction
              </p>
            </div>
          )}
          
          {formData.paymentMethod === 'Cash' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">
                You will pay the full amount when you arrive at the property
              </p>
            </div>
          )}
        </div>
        
        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600">Listing:</p>
              <p className="font-medium">{selectedListing.title}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Duration:</p>
              <p className="font-medium">{nights} {nights === 1 ? 'Night' : 'Nights'}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Check-in:</p>
              <p className="font-medium">
                {formData.checkInDate ? new Date(formData.checkInDate).toLocaleDateString() : '--'}
              </p>
            </div>
            
            <div>
              <p className="text-gray-600">Check-out:</p>
              <p className="font-medium">
                {formData.checkOutDate ? new Date(formData.checkOutDate).toLocaleDateString() : '--'}
              </p>
            </div>
            
            <div>
              <p className="text-gray-600">Single Rooms:</p>
              <p className="font-medium">{formData.numberOfRooms.Single}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Double Rooms:</p>
              <p className="font-medium">{formData.numberOfRooms.Double}</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Processing...' : (
              formData.paymentMethod === 'Card' ? 'Proceed to Payment' : 'Confirm Booking'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;