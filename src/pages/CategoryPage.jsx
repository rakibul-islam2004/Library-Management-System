import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [viewMode, setViewMode] = useState("Card View");
  const [showAvailable, setShowAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      try {
        const { data } = await axios.get(
          `https://library-management-server-ochre.vercel.app/books?category=${category}`
        );
        setBooks(data);
        setFilteredBooks(data); // Initialize filtered books
      } catch (error) {
        console.error("Error fetching books by category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [category]);

  const toggleAvailableBooks = () => {
    setShowAvailable((prev) => !prev);
    setFilteredBooks(
      !showAvailable ? books.filter((book) => book.quantity > 0) : books
    );
  };

  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
  };

  const handleUpdateClick = (bookId) => {
    navigate(`/updateBook/${bookId}`);
  };

  const handleViewDetailsClick = (bookId) => {
    navigate(`/bookDetails/${bookId}`);
  };

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Books in "{category}"</h1>
      {books.length === 0 ? (
        <p className="text-gray-600">No books found in this category.</p>
      ) : (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={toggleAvailableBooks}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              {showAvailable ? "Show All Books" : "Show Available Books"}
            </button>

            <div>
              <label htmlFor="viewMode" className="mr-2">
                View Mode:
              </label>
              <select
                id="viewMode"
                value={viewMode}
                onChange={handleViewModeChange}
                className="p-2 border rounded-md"
              >
                <option value="Card View">Card View</option>
                <option value="Table View">Table View</option>
              </select>
            </div>
          </div>

          {viewMode === "Card View" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-56 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {book.name}
                  </h3>
                  <p className="text-gray-600">Author: {book.authorName}</p>
                  <p className="text-gray-600">Category: {book.category}</p>
                  <p className="text-yellow-500">Rating: {book.rating}</p>
                  <p className="text-gray-600">Quantity: {book.quantity}</p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleUpdateClick(book._id)}
                      className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleViewDetailsClick(book._id)}
                      className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table className="table-auto w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Author</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Rating</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">
                      <img
                        src={book.image}
                        alt={book.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2">{book.name}</td>
                    <td className="px-4 py-2">{book.authorName}</td>
                    <td className="px-4 py-2">{book.category}</td>
                    <td className="px-4 py-2">{book.rating}</td>
                    <td className="px-4 py-2">{book.quantity}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleUpdateClick(book._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-all mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleViewDetailsClick(book._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700 transition-all"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
