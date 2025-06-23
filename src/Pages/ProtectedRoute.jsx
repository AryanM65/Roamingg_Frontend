// src/Pages/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
