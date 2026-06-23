# 🛒 E-Commerce Product Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) E-Commerce Product Application developed with modern web technologies. The application provides secure user authentication, product management, shopping cart functionality, and an admin dashboard for managing products.

---

## 🚀 Live Project

### Frontend (Vercel)

https://ecommerce-product-app-nu.vercel.app/

### Backend (Render)

https://ecommerce-product-app.onrender.com

### GitHub Repository

https://github.com/zenku663-svg/Taskly-mern.git

---

# 📖 Project Overview

This application allows users to browse products, search and filter items, view product details, add products to a shopping cart, and manage their accounts securely.

Administrators can manage products through a protected admin dashboard with full CRUD (Create, Read, Update, Delete) functionality.

---

# ✨ Features

## 👤 User Features

* User Registration
* User Login
* User Logout
* JWT Authentication
* Protected User Profile
* Product Listing
* Product Search
* Product Filtering by Category
* Product Details Page
* Add Products to Cart
* Update Cart Quantity
* Remove Products from Cart
* Secure Checkout Validation

---

## 🛠️ Admin Features

* Admin Login
* Protected Admin Dashboard
* Add New Products
* Edit Existing Products
* Delete Products
* Manage Product Inventory
* View Product Catalog

---

# 🔐 Authentication & Security

The application implements:

* JWT (JSON Web Token) Authentication
* Protected Routes
* Admin Authorization
* Password Hashing using bcryptjs
* Secure API Communication
* MongoDB Database Integration

---

# 🏗️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Framer Motion
* Context API

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* CORS

---

# 📂 Project Structure

```text
Ecommerce-App
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   └── assets
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/zenku663-svg/Taskly-mern.git
cd Taskly-mern
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

# 🌐 Deployment

## Backend Deployment

Platform: Render

Backend URL:

https://ecommerce-product-app.onrender.com

---

## Frontend Deployment

Platform: Vercel

Frontend URL:

https://ecommerce-product-app-nu.vercel.app/

---

# 📌 API Endpoints

## User Routes

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/users/register | Register User    |
| POST   | /api/users/login    | Login User       |
| GET    | /api/users/profile  | Get User Profile |

---

## Product Routes

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | /api/products     | Get All Products    |
| GET    | /api/products/:id | Get Product Details |
| POST   | /api/products     | Add Product         |
| PUT    | /api/products/:id | Update Product      |
| DELETE | /api/products/:id | Delete Product      |

---

# 🛒 Shopping Cart Functionalities

* Add Product to Cart
* Remove Product from Cart
* Update Product Quantity
* Calculate Total Price
* Cart Persistence using Local Storage

---

# 📊 Core Functionalities

## Customer

✔ Register Account

✔ Login

✔ Logout

✔ Browse Products

✔ Search Products

✔ Filter Products

✔ View Product Details

✔ Add to Cart

✔ Update Cart

✔ Remove from Cart

✔ Access Protected Profile

---

## Administrator

✔ Login as Admin

✔ Access Admin Dashboard

✔ Add Products

✔ Edit Products

✔ Delete Products

✔ Manage Product Inventory

---

# 🎯 Learning Outcomes

This project demonstrates:

* Full-Stack MERN Development
* REST API Development
* JWT Authentication
* MongoDB Database Integration
* React State Management
* Context API Usage
* Route Protection
* Admin Authorization
* Deployment using Render and Vercel

---

# 👨‍💻 Author

Zenku

Developed as a Full Stack MERN E-Commerce Application.

Technologies Used:

* MongoDB
* Express.js
* React.js
* Node.js

---

# ⭐ Project Status

✅ Completed

✅ Frontend Deployed

✅ Backend Deployed

✅ Authentication Implemented

✅ Admin CRUD Implemented

✅ Shopping Cart Implemented

✅ MongoDB Connected

✅ Production Ready
