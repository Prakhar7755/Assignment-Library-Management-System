import express from "express";
import {
  addNewBook,
  getAllBooks,
  borrowBook,
  returnBook,
} from "../controllers/book.controller.js";
import checkRole from "../middlewares/role.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticateToken, checkRole("admin"), addNewBook)
  .get(authenticateToken, getAllBooks);

router
  .route("/:id/borrow")
  .put(authenticateToken, checkRole("admin", "member"), borrowBook);

router
  .route("/:id/return")
  .put(authenticateToken, checkRole("admin", "member"), returnBook);

export default router;
