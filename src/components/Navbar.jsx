import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user, logout } = useAuth();
  const token = Cookies.get("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    // If the click is outside of the menu or button, close the mobile menu
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-400 transition-colors"
          >
            Library Management
          </Link>
        </div>

        {/* Mobile Menu Button with Icon Toggle */}
        <div className="md:hidden flex items-center">
          <button
            ref={buttonRef}
            onClick={toggleMobileMenu}
            className="text-white"
          >
            {/* Toggle between hamburger and close icon */}
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
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
              {/* Hide logout button on mobile */}
              <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all hidden md:block"
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
                className="bg-green-500 hover:bg-green-600 hidden md:block text-white py-2 px-4 rounded-lg transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu with Transparent Background */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden text-white px-4 py-3 space-y-4"
          style={{
            backgroundColor: "rgba(31, 41, 55, 0.9)", // Dark gray with transparency
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 50, // Ensure it appears above other content
          }}
        >
          <Link
            to="/"
            className="block text-lg py-2 hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          {token && (
            <>
              <Link
                to="/all-books"
                className="block text-lg py-2 hover:text-blue-400 transition-colors"
              >
                All Books
              </Link>
              <Link
                to="/add-book"
                className="block text-lg py-2 hover:text-blue-400 transition-colors"
              >
                Add Book
              </Link>
              <Link
                to="/borrowed-books"
                className="block text-lg py-2 hover:text-blue-400 transition-colors"
              >
                Borrowed Books
              </Link>
            </>
          )}
          <div className="flex flex-col items-start">
            {token ? (
              <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all"
              >
                Logout
              </button>
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
                  className="bg-green-500 hover:bg-green-600 my-5 text-white py-2 px-4 rounded-lg transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
