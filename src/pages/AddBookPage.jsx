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
        navigate("/allBooks");
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            placeholder="Enter book title"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Author Name</label>
          <input
            type="text"
            name="authorName"
            value={book.authorName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            placeholder="Enter author's name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={book.quantity}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={book.category}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
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
          <label className="block text-gray-700">Short Description</label>
          <textarea
            name="shortDescription"
            value={book.shortDescription}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            rows="4"
            placeholder="Enter a short description"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            value={book.rating}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            min="1"
            max="5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
