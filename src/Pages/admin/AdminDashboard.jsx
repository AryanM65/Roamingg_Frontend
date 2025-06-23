// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useListing } from "../../contexts/ListingContext";
import { useBooking } from "../../contexts/BookingContext";
import { BarChart } from "../../Components/Charts/BarChart";
import { PieChart } from "../../Components/Charts/PieChart";
import { formatDate } from "../../utils/formatDate";
import { ListingCard } from "../../Components/ListingCard";
import { FiUsers, FiHome, FiDollarSign, FiCalendar } from "react-icons/fi";

const AdminDashboard = () => {
  const { user, getAllUsers, loading: userLoading } = useUser(); // Added userLoading
  const { getAllListings } = useListing();
  const { getAllBookings } = useBooking();
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    activeListings: 0,
    recentSignups: [],
    totalBookings: 0,
    revenueByListing: [],
    bookingStatusCounts: {},
    loading: true,
  });
  
  const [timeFilter, setTimeFilter] = useState("all"); // "all", "month", "week"

  useEffect(() => {
    if (user?.role === "Admin") {
      fetchDashboardData();
    }
  }, [user, timeFilter]);
  
  useEffect(() => {
    if (user?.role === "Admin" && dashboardData.loading && !userLoading) {
      fetchDashboardData();
    }
  }, [user, userLoading]); // Added userLoading dependency
  
  const fetchDashboardData = async () => {
    try {
      // Fetch all necessary data
      const reslistings = await getAllListings();
      setListings(reslistings);
      console.log("listings", listings);
      const bookings = await getAllBookings();
      console.log("bookings", bookings);
      const res = await getAllUsers();
      setUsers(res);
      // Calculate metrics
      const totalRevenue = reslistings.reduce(
        (sum, listing) => sum + (listing.totalRevenue || 0), 0
      );
      
      const activeListings = reslistings.filter(listing => listing.isActive).length;
      
      const recentSignups = [...users]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      
      const totalBookings = bookings.length;
      
      // Calculate revenue by listing for the chart
      const revenueByListing = reslistings
        .filter(listing => listing.totalRevenue > 0)
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .slice(0, 5)
        .map(listing => ({
          name: listing.title,
          value: listing.totalRevenue,
        }));
      
      // Calculate booking status counts
      const bookingStatusCounts = bookings.reduce((acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        return acc;
      }, {});
      
      setDashboardData({
        totalRevenue,
        activeListings,
        recentSignups,
        totalBookings,
        revenueByListing,
        bookingStatusCounts,
        loading: false,
      });
      
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setDashboardData(prev => ({ ...prev, loading: false }));
    }
  };
  
  // Show loading spinner while user is being authenticated
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (user?.role !== "Admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">
            You don't have permission to view the admin dashboard.
          </p>
        </div>
      </div>
    );
  }
  
  if (dashboardData.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <br></br>
      <br></br>
      <br></br>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
        {/* Time Filter */}
        <div className="mb-6 flex justify-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                timeFilter === "week" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setTimeFilter("week")}
            >
              Last 7 Days
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                timeFilter === "month" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setTimeFilter("month")}
            >
              Last 30 Days
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                timeFilter === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setTimeFilter("all")}
            >
              All Time
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Revenue" 
            value={`$${dashboardData.totalRevenue.toLocaleString()}`} 
            icon={<FiDollarSign className="h-6 w-6" />}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard 
            title="Active Listings" 
            value={dashboardData.activeListings} 
            icon={<FiHome className="h-6 w-6" />}
            color="bg-green-100 text-green-600"
          />
          <StatCard 
            title="Total Bookings" 
            value={dashboardData.totalBookings} 
            icon={<FiCalendar className="h-6 w-6" />}
            color="bg-purple-100 text-purple-600"
          />
          <StatCard 
            title="Total Users" 
            value={users.length}
            icon={<FiUsers className="h-6 w-6" />}
            color="bg-yellow-100 text-yellow-600"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue by Listing</h2>
            <div className="h-80">
              <BarChart data={dashboardData.revenueByListing} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Status Distribution</h2>
            <div className="h-80">
              <PieChart data={Object.entries(dashboardData.bookingStatusCounts).map(([name, value]) => ({ name, value }))} />
            </div>
          </div>
        </div>
        
        {/* Recent Signups */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Signups</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.profilePicture ? (
                            <img className="h-10 w-10 rounded-full" src={user.profilePicture} alt={user.name} />
                          ) : (
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "Admin" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Active Listings */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Active Listings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {console.log("l2",listings)}
            {listings
              .filter(listing => listing.isActive)
              .slice(0, 6)
              .map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// Listing Card Component
// const ListingCard = ({ listing }) => (
//   <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
//     {listing.images && listing.images.length > 0 ? (
//       <img 
//         className="w-full h-48 object-cover" 
//         src={listing.images[0]} 
//         alt={listing.title} 
//       />
//     ) : (
//       <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
//     )}
//     <div className="p-4">
//       <div className="flex justify-between items-start">
//         <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
//         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//           listing.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//         }`}>
//           {listing.isActive ? "Active" : "Inactive"}
//         </span>
//       </div>
//       <p className="mt-2 text-sm text-gray-600 line-clamp-2">{listing.description}</p>
//       <div className="mt-4 flex justify-between items-center">
//         <div>
//           <p className="text-sm font-medium text-gray-900">${listing.pricePerNight?.Single || 0}</p>
//           <p className="text-xs text-gray-500">Per night (Single)</p>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-900">${listing.pricePerNight?.Double || 0}</p>
//           <p className="text-xs text-gray-500">Per night (Double)</p>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-900">${listing.totalRevenue?.toLocaleString() || 0}</p>
//           <p className="text-xs text-gray-500">Total Revenue</p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

export default AdminDashboard;