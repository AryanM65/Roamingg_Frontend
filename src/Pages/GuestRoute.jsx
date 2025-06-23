// components/routes/GuestRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const GuestRoute = ({ children }) => {
  const { user } = useUser();

  if (user) {
    // Redirect based on role
    return <Navigate to={user.role === "Admin" ? "/admin/dashboard" : "/home"} replace />;
  }

  return children;
};

export default GuestRoute;
