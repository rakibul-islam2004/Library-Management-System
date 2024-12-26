import React from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import { FaBook } from "react-icons/fa";

const HomePage = () => {
  return (
    <div>
      {/* Banner/Slider Section */}
      <section className="relative bg-gray-900 text-white">
        <Slider />
      </section>

      {/* Book Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Explore Our Book Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Category Cards */}
            {["Fiction", "Science", "History", "Technology"].map(
              (category, index) => (
                <Link
                  to={`/category/${category.toLowerCase()}`}
                  key={index}
                  className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                >
                  <div className="p-6">
                    <FaBook className="text-4xl text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold">{category}</h3>
                    <p className="text-gray-500">
                      Explore books related to {category}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Extra Section 1 */}
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Library's Mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our mission is to provide a diverse range of books that encourage
            lifelong learning and foster a love of reading for all ages. Whether
            you're looking for fiction, educational resources, or the latest
            research in science and technology, we have something for you!
          </p>
        </div>
      </section>

      {/* Extra Section 2 */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Featured Books */}
            {["The Great Gatsby", "Sapiens", "Educated"].map((book, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <img
                  src={`https://via.placeholder.com/200x300?text=${book}`}
                  alt={book}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{book}</h3>
                  <p className="text-gray-500">by Author Name</p>
                  <p className="text-gray-400 text-sm">Category: Fiction</p>
                  <p className="text-gray-500">Quantity: 5</p>
                  <p className="text-yellow-500">Rating: ⭐⭐⭐⭐</p>
                  <Link
                    to={`/book-details/${book.toLowerCase().replace(" ", "-")}`}
                    className="inline-block mt-4 text-blue-600 hover:underline"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
