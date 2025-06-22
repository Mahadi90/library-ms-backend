# 📚 Library Management System - Backend (Node.js + Express + TypeScript + Mongoose)

A RESTful API for managing books and borrow records in a library system.

---

## 🚀 Features

- Add, update, delete books
- Borrow books with validation
- Auto-update book availability
- MongoDB Aggregation to get borrowed summary
- Modular code structure (MVC)
- ESLint
- Environment variable support

---

## Live link : https://library-ms-assignment-backend.vercel.app/

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- ESLint + Prettier
- Dotenv


---

## ⚙️ Setup Instructions

### ✅ 1. Clone & Install Dependencies

```bash
git clone https://github.com/mahadi90/library-ms-backend.git
cd library-ms-backend
npm install
```
---
### 📄 .env File Setup
PORT=5000/3000 or your localhoost port

DATABASE_URL=your_mongodb_uri_here

# Development
npm run dev

# Production
## tsc

---
🧪 API Endpoints
📘 Books

➕ Add Book
### POST /api/books

```json
{
  "title": "JavaScript Essentials",
  "isbn": "JS123456",
  "copies": 5
}
```

🧾 Get All Books
### GET /api/books

🗑 Get single book
### GET /api/books/:id

🗑 Update Book
### PUT /api/books/:id

🗑 Delete Book
### DELETE /api/books/:id

📦 Borrow
➕ Borrow Book
### POST /api/borrow

```json
{
  "book": "BOOK_ID_HERE",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
✅ Validates copies
✅ Updates availability
✅ Records borrow info

📊 Get Borrow Summary
### GET /api/borrow

Returns each book with total borrowed quantity:

```json

{
  "book": {
    "title": "JavaScript Essentials",
    "isbn": "JS123456"
  },
  "totalQuantity": 10
}
```
✅ Linting & Formatting

```bash

npm run lint
npm run lint:fix
```

🧑‍💻 Author
Developed by Mahadi Hasan