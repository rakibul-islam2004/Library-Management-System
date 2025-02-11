import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners"; // Import ClipLoader

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [isAlreadyBorrowed, setIsAlreadyBorrowed] = useState(false);

  const loggedInUser = {
    name: user?.displayName || "Guest User",
    email: user?.email || "guest@example.com",
  };

  useEffect(() => {
    const checkLogin = () => {
      if (!user) navigate("/login");
    };
    checkLogin();
  }, [navigate, user]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://library-management-server-ochre.vercel.app/books/${id}`
        );
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    const checkIfAlreadyBorrowed = async () => {
      if (!user?.email) return;

      try {
        const { data } = await axios.get(
          `https://library-management-server-ochre.vercel.app/borrowedBooks?email=${user.email}`
        );
        const isBookBorrowed = data.some(
          (borrowedBook) => borrowedBook.bookId === id
        );
        setIsAlreadyBorrowed(isBookBorrowed);
      } catch (error) {
        console.error("Error checking borrowed books:", error);
      }
    };

    fetchBookDetails();
    checkIfAlreadyBorrowed();
  }, [id, user]);

  const handleBorrow = async () => {
    if (isAlreadyBorrowed) {
      toast.error("You have already borrowed this book.");
      return;
    }

    if (!returnDate) {
      toast.error("Please select a return date.");
      return;
    }

    try {
      await axios.post(
        "https://library-management-server-ochre.vercel.app/borrowBook",
        {
          bookId: id,
          borrowerName: loggedInUser.name,
          borrowerEmail: loggedInUser.email,
          returnDate,
          name: book.name,
          category: book.category,
          authorName: book.authorName,
          rating: book.rating,
          image: book.image,
        }
      );
      await axios.put(
        `https://library-management-server-ochre.vercel.app/updateQuantity/${id}`,
        { quantity: -1 }
      );
      setBook((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
      setIsModalOpen(false);
      toast.success("Book borrowed successfully!");
      setTimeout(() => {
        navigate("/borrowed-books");
      }, 1500);
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("An error occurred while borrowing the book.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex justify-center items-center p-4">
      <ToastContainer position="top-center" />
      {book ? (
        <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md border">
          <img
            src={book.image || "/default-book.png"}
            alt={book.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-blue-700 mb-3">{book.name}</h1>
          <p className="text-gray-600 mb-2">
            <strong>Author:</strong> {book.authorName}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Category:</strong> {book.category}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Rating:</strong> {book.rating}/5
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Available Quantity:</strong> {book.quantity}
          </p>
          <button
            className={`w-full py-3 text-lg font-medium rounded-lg ${
              isAlreadyBorrowed || book.quantity <= 0
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={isAlreadyBorrowed || book.quantity <= 0}
            onClick={() => setIsModalOpen(true)}
          >
            {isAlreadyBorrowed
              ? "You Already Borrowed This Book"
              : book.quantity > 0
              ? "Borrow Book"
              : "Out of Stock"}
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-bold mb-4 text-blue-600">
                  Borrow Book
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleBorrow();
                  }}
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={loggedInUser.name}
                      disabled
                      className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loggedInUser.email}
                      disabled
                      className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Borrow
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color="#3498db" loading={true} />
        </div>
      )}
    </div>
  );
};

export default BookDetails;
