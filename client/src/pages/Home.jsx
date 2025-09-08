import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import BookCard from "../components/BookCard";

import {
  fetchBooks,
  borrowBook as apiBorrow,
  returnBook as apiReturn,
} from "../lib/bookService.js";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const token = localStorage.getItem("token");

  // Decode userId from token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.userId); 
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [token]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks(token);
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, [token]);

  // Borrow a book
  const handleBorrow = async (id) => {
    try {
      const updatedBook = await apiBorrow(id, token); 
      setBooks(books.map((book) => (book._id === id ? updatedBook : book))); 
    } catch (err) {
      console.error("Failed to borrow book", err);
    }
  };

  // Return a book
  const handleReturn = async (id) => {
    try {
      const updatedBook = await apiReturn(id, token);
      setBooks(books.map((book) => (book._id === id ? updatedBook : book)));
    } catch (err) {
      console.error(
        "Failed to return book",
        err.response?.data?.message || err.message
      );
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Library Books</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            currentUserId={currentUserId}
            handleBorrow={handleBorrow}
            handleReturn={handleReturn}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
