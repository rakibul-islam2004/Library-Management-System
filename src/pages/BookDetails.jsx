import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [borrowDetails, setBorrowDetails] = useState({
    bookId: id,
    returnDate: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = Cookies.get("token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        navigate("/login");
      }
    };

    checkLogin();
  }, [navigate]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const { data } = await axios.get(`/books/${id}`);
      setBook(data);
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrow = async () => {
    try {
      await axios.post("/borrowBook", borrowDetails);
      alert("Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  return (
    <div>
      {book && (
        <>
          <h1>{book.name}</h1>
          <p>Author: {book.author}</p>
          <p>Category: {book.category}</p>
          <p>Rating: {book.rating}</p>
          <p>Quantity: {book.quantity}</p>
          <button onClick={handleBorrow} disabled={book.quantity <= 0}>
            Borrow
          </button>
        </>
      )}
    </div>
  );
};

export default BookDetails;
