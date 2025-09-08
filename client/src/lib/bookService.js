import api from "./axios";

// Fetch all available books
export const fetchBooks = async (token) => {
  const res = await api.get("/books", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.books;
};

// Borrow a book
export const borrowBook = async (id, token) => {
  const res = await api.put(
    `/books/${id}/borrow`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.book;
};

// Return a book
export const returnBook = async (id, token) => {
  const res = await api.put(
    `/books/${id}/return`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.book;
};
