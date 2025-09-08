# 📚 Library Management System – Full Stack Assignment

A full-stack web application built as part of a take-home assignment for a **Full Stack Development Assignment**. The app provides a simple and secure **Library Management System**, allowing users to browse, borrow, and return books, with **JWT authentication** and **role-based access control**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access (Admin & Member)

### 📘 Book Management
- Add new books (Admin only)
- View all available books
- Borrow and return books (Admin & Member)

### 🌐 Web Interface
- Responsive design (mobile + desktop)
- Seamless API integration
- Book search by title or author
- Protected routes for logged-in users

---

## 🛠️ Tech Stack

### Backend
- **Node.js**, **Express**
- **MongoDB** with **Mongoose**
- **JWT**, **bcryptjs** for authentication
- **CORS**, **cookie-parser**, **dotenv**

### Frontend
- **React 19**, **React Router**
- **Vite** for fast builds
- **Tailwind CSS** + **DaisyUI**
- **React Toastify** for notifications
- **Axios** for API requests

---

## 📁 Project Structure

```bash
library-management-system-assignment/
│
├── client/              # Frontend (React + Tailwind)
│   └── src/
│       ├── components/
│       ├── pages/
│       └── lib/
│
├── server/              # Backend (Node.js + Express)
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       └── routes/
│
├── README.md
├── package.json         # Root scripts for build/start
└── .gitignore
````

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Prakhar7755/Assignment-Library-Management-System.git

```

---

### 2. Setup the Backend

```bash
cd server
cp .env.sample .env
# Fill in the values in `.env`, especially MONGO_URI and JWT_SECRET

yarn install
yarn dev     # For development (nodemon)
# or
yarn start   # For production
```

---

### 3. Setup the Frontend

```bash
cd ../client
cp .env.sample .env
yarn install
yarn dev     # Runs on http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend `.env` (server/.env)

```env
MONGO_URI="mongodb://localhost:27017/bookLib"
PORT=5001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
JWT_SECRET="your_secret_key_here"
```

### Frontend `.env` (client/.env)

```env
VITE_MODE=development
```

---

## 🔗 API Endpoints

### Base URL: `/api`

#### 🔐 Auth

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/user/register` | Register a new user    |
| POST   | `/user/login`    | Log in and receive JWT |

#### 📘 Books

| Method | Endpoint            | Description             | Access        |
| ------ | ------------------- | ----------------------- | ------------- |
| POST   | `/books/`           | Add a new book          | Admin         |
| GET    | `/books/`           | Get all available books | Authenticated |
| PUT    | `/books/:id/borrow` | Borrow a book           | Admin, Member |
| PUT    | `/books/:id/return` | Return a borrowed book  | Admin, Member |

---

## 🧪 Testing the API

You can test the API using:

* [Postman Collection](#) – *https://red-comet-239266.postman.co/workspace/My-Workspace~a24ce7ed-e84d-4909-8973-0fa05b10c6e4/collection/32178770-cd6de0f1-a696-4c91-b8fa-751fbad3605e?action=share&creator=32178770*



---

## 🧠 Future Improvements (Bonus Ideas)

* ✅ State management via React Context
* ⏳ Persistent login (Refresh token strategy)
* 📊 Admin dashboard
* ✅ Search & Filter by genre or author
* 📚 Pagination for large book lists

---

## 👨‍💻 Author

**Prakhar**
[LinkedIn](https://www.linkedin.com/in/prakhar-tech/) | [GitHub](https://github.com/Prakhar7755)

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 📝 Assignment Context

This application was built as part of a **Full Stack Web App Assignment** to demonstrate skills in:

* Backend API Design
* Database Modeling
* Secure Authentication
* Frontend Development (UI/UX)
* Modular and maintainable code structure
