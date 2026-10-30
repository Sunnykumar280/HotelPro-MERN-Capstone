# 🏨 HotelPro – Hotel Booking & Management System

A full-stack hotel booking and management application built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. HotelPro provides a user-friendly platform for discovering hotels, exploring available rooms, and managing hotel reservations.

The project aims to simplify the hotel booking experience while providing administrators with tools to manage hotel operations efficiently.

---

## 🚀 Features

### 👤 User Features
- User registration and login.
- Secure authentication using JSON Web Tokens (JWT).
- Browse available hotels and rooms.
- View hotel and room details.
- Search and explore accommodation options.
- Book rooms through the application.
- Manage booking information.

### 🔐 Admin Features
- Secure admin authentication.
- Manage hotel and room listings.
- Add, update, and delete hotel information.
- Manage room availability.
- View and manage customer bookings.

### ⚙️ General Features
- Responsive user interface.
- RESTful API architecture.
- MongoDB database integration.
- Password hashing using bcryptjs.
- Environment-based configuration.
- Image and file upload support using Multer.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Node.js | Backend runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | Database modeling |
| JWT | User authentication |
| bcryptjs | Password encryption |
| Multer | File uploads |
| Axios | API communication |
| CSS / Tailwind CSS | UI styling |
| dotenv | Environment configuration |
| Nodemon | Development server |

---

## 📁 Project Structure

```text
HotelPro/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

*Note: The folder structure may vary depending on the actual implementation.*

---

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd HotelPro
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

```bash
cd ../server
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the server directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any additional environment variables required by your implementation.

### 6. Start the backend server

```bash
npm run server
```

### 7. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The application will be available at the local URL provided by Vite, usually:

```text
http://localhost:5173
```

---

## 🔒 Security

- Passwords are hashed before storing them in the database.
- JWT-based authentication protects authorized routes.
- Sensitive credentials are stored in environment variables.
- Environment files are excluded from version control.

---

## 🎯 Project Objectives

- Develop a full-stack hotel booking platform.
- Implement secure user authentication.
- Build RESTful APIs using Express.js and Node.js.
- Integrate MongoDB for data management.
- Create a responsive and interactive frontend.
- Understand real-world MERN stack development workflows.

---

## 🔮 Future Enhancements

- Online payment gateway integration.
- Advanced hotel search and filtering.
- Real-time room availability.
- Booking confirmation emails.
- Customer reviews and ratings.
- Hotel location integration using maps.
- Booking cancellation and refund management.

---

## 👨‍💻 Project Information

**Project Name:** HotelPro – Hotel Booking & Management System

**Domain:** Full Stack Web Development

**Technology:** MERN Stack

**Project Type:** Capstone Project

**Repository:** YOUR_GITHUB_REPOSITORY_URL

---

## 📄 License

This project is developed for educational and academic purposes.

---

⭐ If you find this project useful, consider giving the repository a star!
