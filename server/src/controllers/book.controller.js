import BookModel from "../models/book.model.js";

const addNewBook = async (req, res) => {
  try {
    const { title, author, isbn } = req.body;

    if (!title || !author || !isbn) {
      return res.status(400).json({
        success: false,
        message: "title, author and isbn are required.",
      });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`Adding Book: ${title} by ${author}`);
    }

    const book = await BookModel.create({
      title: title.toLowerCase().trim(),
      author: author.toLowerCase().trim(),
      isbn: isbn.trim(),
    });

    if (!book) {
      if (process.env.NODE_ENV !== "production") {
        console.error("❌ Failed to save book into database.");
      }
      return res.status(500).json({
        success: false,
        message: "Unable to add the book. Please try again later.",
      });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`✅ Book record created: '${title}' by '${author}'`);
    }

    return res.status(201).json({
      success: true,
      message: "Book added to DB successfully 🎉",
      book: book,
    });
  } catch (err) {
    console.error("❌ Failed to Add a NEW BOOK:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to Add new book",
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find({ isAvailable: true }).select(
      "title author isbn isAvailable"
    );

    if (!books || books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No available books found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Books fetched Successfully",
      count: books.length,
      books: books,
    });
  } catch (err) {
    console.error("❌ Error fetching books:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch books.",
    });
  }
};

const borrowBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    if (!book.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Book is already borrowed.",
      });
    }

    // mark as borrowed
    book.isAvailable = false;
    book.borrowedBy = req.user.userId;
    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book borrowed successfully ",
      book: book,
    });
  } catch (err) {
    console.error("❌ Error borrowing book:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to borrow book.",
    });
  }
};

const returnBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    if (book.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Book is not currently borrowed.",
      });
    }

    // check if the user is logged in is the one who borrwed
    if (String(book.borrowedBy) !== String(req.user.userId)) {
      return res.status(403).json({
        success: false,
        message: "You can only return books you borrowed.",
      });
    }

    // mark as returned
    book.isAvailable = true;
    book.borrowedBy = null;
    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      book: book,
    });
  } catch (err) {
    console.error("❌ Error returning book:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to return book.",
    });
  }
};

export { addNewBook, getAllBooks, borrowBook, returnBook };
