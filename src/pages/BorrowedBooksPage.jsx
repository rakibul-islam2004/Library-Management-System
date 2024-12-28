import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const BorrowedBooksPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const { user } = useAuth(); // Accessing the user object from AuthContext

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (!user?.email) {
        toast.error("User email not available.");
        return;
      }

      try {
        const { data } = await axios.get(
          `https://library-management-server-ochre.vercel.app/borrowedBooks?email=${user.email}`
        );
        setBorrowedBooks(data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
        toast.error("Failed to load borrowed books. Please try again later.");
      }
    };

    fetchBorrowedBooks();
  }, [user]);

  const handleReturn = async (bookId, borrowId) => {
    try {
      const returnResponse = await axios.post(
        `https://library-management-server-ochre.vercel.app/returnBook`,
        { bookId, borrowId }
      );

      if (returnResponse.status === 200) {
        await axios.put(
          `https://library-management-server-ochre.vercel.app/updateQuantity/${bookId}`,
          { quantity: 1 }
        );

        // Remove the returned book from the UI
        setBorrowedBooks((prev) =>
          prev.filter((book) => book._id !== borrowId)
        );
        toast.success("Book returned successfully!");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      toast.error("Failed to return the book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Borrowed Books</h1>
      {borrowedBooks.length === 0 ? (
        <p className="text-gray-600">You have not borrowed any books.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowedBooks.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={book.image || "/default-book.png"}
                alt={book.name || "Book Image"}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-bold">
                {book.name || "Unknown Book"}
              </h2>
              <p className="text-gray-600">
                Category: {book.category || "Uncategorized"}
              </p>
              <p className="text-gray-600">
                Borrowed Date: {new Date(book.borrowedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Return Date: {book.returnDate}</p>
              <button
                onClick={() => handleReturn(book.bookId, book._id)}
                className="mt-4 w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooksPage;
