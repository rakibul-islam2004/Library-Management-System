import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Project Name and Description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Library Management System</h2>
            <p className="text-gray-400 text-sm mt-2 max-w-sm">
              Streamlining library operations for efficient management of book
              collections, borrowings, and returns. A user-friendly platform
              designed for accessibility and ease of use.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <a
              href="/about"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Contact
            </a>
            <a
              href="/faq"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              FAQs
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <p className="text-sm text-gray-400">
            &copy; 2024 Library Management System. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-4 md:mt-0">
            Designed for Excellence in Education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
