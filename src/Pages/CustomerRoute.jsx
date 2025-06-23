// components/routes/CustomerRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const CustomerRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "Customer") return <Navigate to="/unauthorized" replace />;

  return children;
};

export default CustomerRoute;
