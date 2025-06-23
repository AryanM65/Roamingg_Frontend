// components/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const AdminRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "Admin") return <Navigate to="/unauthorized" replace />;

  return children;
};

export default AdminRoute;
