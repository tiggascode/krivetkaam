
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-blue-50 via-white to-ocean-blue-100">
      <div className="text-center">
        <div className="text-6xl mb-4">🌊</div>
        <h1 className="text-4xl font-playfair font-bold mb-4 text-ocean-blue-800">404</h1>
        <p className="text-xl text-ocean-blue-600 mb-4">Oops! This page seems to have drifted away</p>
        <a href="/" className="text-golden-600 hover:text-golden-700 underline font-medium">
          Return to Ocean Fresh
        </a>
      </div>
    </div>
  );
};

export default NotFound;
