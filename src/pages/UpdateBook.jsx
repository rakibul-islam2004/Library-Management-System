import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState({
    name: "",
    author: "",
    image: "",
    category: "",
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

      await axios.put(`/updateBook/${id}`, formData);
      navigate(`/bookDetails/${id}`);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await axios.get(`/books/${id}`);
      setBookDetails(data);
    };
    fetchBook();
  }, [id]);

  return (
    <div>
      <h1>Update Book</h1>
      <form onSubmit={handleSubmit}>
        <label>Image</label>
        <input type="file" onChange={handleImageChange} />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={bookDetails.name}
          onChange={handleChange}
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          value={bookDetails.author}
          onChange={handleChange}
        />

        <label>Category</label>
        <select
          name="category"
          value={bookDetails.category}
          onChange={handleChange}
        >
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
          <option value="science">Science</option>
        </select>

        <label>Rating</label>
        <input
          type="number"
          name="rating"
          value={bookDetails.rating}
          onChange={handleChange}
          min="1"
          max="5"
        />

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
