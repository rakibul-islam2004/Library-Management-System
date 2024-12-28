import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [book, setBook] = useState({
    name: "",
    authorName: "",
    quantity: 0,
    category: "",
    shortDescription: "",
    rating: 1,
    image: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookData = {
        ...book,
        quantity: parseInt(book.quantity, 10),
        rating: parseInt(book.rating, 10),
      };

      const response = await fetch(
        "https://library-management-server-ochre.vercel.app/addBook",
        {
          method: "POST",
          credentials: "include", // Include credentials like cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (response.ok) {
        alert("Book added successfully!");
        navigate("/all-books");
      } else {
        const errorData = await response.json();
        alert(`Error adding book: ${errorData.message || response.status}`);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add the book. Please try again.");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Add New Book
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full mt-2 p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter book title"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Author Name
          </label>
          <input
            type="text"
            name="authorName"
            value={book.authorName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter author's name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={book.quantity}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            value={book.category}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Technology">Technology</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={book.shortDescription}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            rows="4"
            placeholder="Enter a short description"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            value={book.rating}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            min="1"
            max="5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
