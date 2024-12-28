import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from the URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      try {
        const { data } = await axios.get(
          `https://library-management-server-ochre.vercel.app/books?category=${category}`
        );
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books by category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [category]);

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Books in "{category}"</h1>
      {books.length === 0 ? (
        <p className="text-gray-600">No books found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={book.image || "/default-book.png"}
                alt={book.name || "Book Image"}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-bold">{book.name}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Category: {book.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
