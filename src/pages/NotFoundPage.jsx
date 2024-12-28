import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-6xl font-extrabold text-red-600">404</h1>
        <p className="text-xl text-gray-800 mt-2">Page Not Found</p>
        <p className="text-gray-600 mt-4">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
