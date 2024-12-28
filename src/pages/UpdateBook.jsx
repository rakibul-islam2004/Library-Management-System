import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const categories = ["Fiction", "Science", "History", "Technology"];

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState({
    name: "",
    authorName: "",
    image: "",
    category: "",
    shortDescription: "",
    rating: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    setBookDetails({ ...bookDetails, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(bookDetails).forEach((key) => {
        formData.append(key, bookDetails[key]);
      });

      await axios.put(
        `https://library-management-server-ochre.vercel.app/updateBook/${id}`,
        formData
      );
      alert("Book updated successfully!");
      navigate(`/bookDetails/${id}`);
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update the book. Please try again.");
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(
          `https://library-management-server-ochre.vercel.app/books/${id}`
        );
        setBookDetails(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Book Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Book Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Book Name
            </label>
            <input
              type="text"
              name="name"
              value={bookDetails.name}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter book name"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Author
            </label>
            <input
              type="text"
              name="authorName"
              value={bookDetails.authorName}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter author name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={bookDetails.category}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={bookDetails.shortDescription}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Enter a short description"
              required
            ></textarea>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={bookDetails.rating}
              onChange={handleChange}
              min="1"
              max="5"
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
