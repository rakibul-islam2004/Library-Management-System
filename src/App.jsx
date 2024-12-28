import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AllBooksPage from "./pages/AllBooksPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddBookPage from "./pages/AddBookPage";
import BorrowedBooksPage from "./pages/BorrowedBooksPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";
import BookDetails from "./pages/BookDetails";
import UpdateBook from "./pages/UpdateBook";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.title =
      location.pathname === "/"
        ? "Home - Library Management"
        : location.pathname.substring(1) + " - Library Management";
  }, [location]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/all-books"
          element={
            <PrivateRoute>
              <AllBooksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookDetails/:id"
          element={
            <PrivateRoute>
              <BookDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <PrivateRoute>
              <AddBookPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:category"
          element={
            <PrivateRoute>
              <CategoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookDetails/:id"
          element={
            <PrivateRoute>
              <BookDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateBook/:id"
          element={
            <PrivateRoute>
              <UpdateBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/borrowed-books"
          element={
            <PrivateRoute>
              <BorrowedBooksPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
