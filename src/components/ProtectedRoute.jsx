import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  // Belum login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Route butuh role tertentu (misal admin)
  if (role && storedRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
