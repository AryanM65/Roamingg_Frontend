import { Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Pages
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AllListings from './Pages/AllListings';
import ListingDetails from './Pages/ListingDetails';
import UserHome from './Pages/UserHome';
import UserProfile from './Pages/UserProfile';
import BookingForm from './Pages/BookingForm';
import BookingSuccess from './Pages/BookingSuccess';
import BookingCancel from './Pages/BookingCancel';
import AddListingForm from './Pages/admin/AddListingForm';
import AdminDashboard from './Pages/admin/AdminDashboard';
import NotFoundPage from './Pages/NotFoundPage';
import UnauthorizedPage from './Pages/UnauthorizedPage';

// Route Guards
import AdminRoute from './Pages/AdminRoute';
import CustomerRoute from './Pages/CustomerRoute';
import GuestRoute from './Pages/GuestRoute';
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hideNavbarRoutes = [
    "/booking-success",
    "/booking-cancel"
  ];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <div className="min-h-screen">
        <Routes>
          {/* Guest-only Routes */}
          <Route path="/" element={<GuestRoute><LandingPage /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

          {/* Public Routes */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/alllistings" element={<AllListings />} />

          {/* Protected Routes (any logged-in user) */}
          <Route path="/listing/:id" element={<ProtectedRoute><ListingDetails /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

          {/* Customer-only Routes */}
          <Route path="/home" element={<CustomerRoute><UserHome /></CustomerRoute>} />
          <Route path="/book/:listingId" element={<CustomerRoute><BookingForm /></CustomerRoute>} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/booking-cancel" element={<BookingCancel />} />

          {/* Admin-only Routes */}
          <Route path="/add-listing" element={<AdminRoute><AddListingForm /></AdminRoute>} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          {/* Error Pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
