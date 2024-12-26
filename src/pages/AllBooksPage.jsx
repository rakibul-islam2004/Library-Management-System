import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://library-management-server-ochre.vercel.app/books",
          {
            withCredentials: true,
          }
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleUpdateClick = (bookId) => {
    navigate(`/updateBook/${bookId}`);
  };

  const handleViewDetailsClick = (bookId) => {
    navigate(`/bookDetails/${bookId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{book.name}</h3>
            <p className="text-gray-600">Author: {book.authorName}</p>
            <p className="text-gray-600">Category: {book.category}</p>
            <p className="text-yellow-500">Rating: {book.rating}</p>
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
    </div>
  );
};

export default AllBooksPage;
