import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user, logout } = useAuth();
  const token = Cookies.get("token");

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-400 transition-colors"
          >
            Library Management
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-blue-400 transition-colors text-lg"
          >
            Home
          </Link>
          {token && (
            <>
              <Link
                to="/all-books"
                className="hover:text-blue-400 transition-colors text-lg"
              >
                All Books
              </Link>
              <Link
                to="/add-book"
                className="hover:text-blue-400 transition-colors text-lg"
              >
                Add Book
              </Link>
              <Link
                to="/borrowed-books"
                className="hover:text-blue-400 transition-colors text-lg"
              >
                Borrowed Books
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <div className="relative group">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt={user?.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer"
                />
                <span className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded-lg px-2 py-1 -bottom-10 left-1/2 transform -translate-x-1/2 shadow-md">
                  {user?.displayName || "Anonymous"}
                </span>
              </div>
              <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
