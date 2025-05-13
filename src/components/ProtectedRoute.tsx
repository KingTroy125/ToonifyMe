import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

// This is a simple auth check - in a real app, this would use a proper auth system
// For this demo, we're just checking if a user token exists in localStorage
const isAuthenticated = () => {
  return localStorage.getItem("toonifyMe_userToken") !== null;
};

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const authStatus = isAuthenticated();
    setAuthenticated(authStatus);
    setLoading(false);
  }, []);

  if (loading) {
    // You could show a loading spinner here
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-t-black border-gray-200 animate-spin"></div>
      </div>
    );
  }

  if (!authenticated) {
    // Redirect to login page with a return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 