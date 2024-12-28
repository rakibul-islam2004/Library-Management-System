import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopRatedBooksSection = () => {
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      try {
        const { data } = await axios.get(
          "https://library-management-server-ochre.vercel.app/topRatedBooks"
        );
        setTopRatedBooks(data);
      } catch (error) {
        console.error("Error fetching top-rated books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedBooks();
  }, []);

  if (loading) {
    return <div>Loading Top Rated Books...</div>;
  }

  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Top Rated Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topRatedBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={
                  book.image ||
                  "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={book.name || "Unknown Book"}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{book.name}</h3>
                <p className="text-gray-500">
                  by {book.authorName || "Unknown Author"}
                </p>
                <p className="text-gray-400 text-sm">
                  Category: {book.category || "Uncategorized"}
                </p>
                <p className="text-gray-500">
                  Quantity: {book.quantity || "N/A"}
                </p>
                <p className="text-yellow-500">
                  Rating: {"⭐".repeat(book.rating || 0)}
                </p>
                <Link
                  to={`/bookDetails/${book._id}`}
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
  );
};

export default TopRatedBooksSection;
