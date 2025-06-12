# Task Manager - Full Stack Application

## Overview

This is a full-stack Task Manager web application that allows users to manage their tasks efficiently. The application includes **user authentication, profile management, and task management** functionalities. The frontend is built with **React**, while the backend is powered by **Node.js with Express.js**. The app provides a seamless user experience with state management using Redux Toolkit and API integration for task CRUD operations.

## Frontend URL

- https://task-management-frontend-liard.vercel.app

## Backend URL

- https://task-management-server-liard-ten.vercel.app

## Features

### User Authentication

- Register new users
- Login with JWT-based authentication
- Forgot and reset password functionality
- Secure API endpoints for user profile management

### User Profile Management

- View and update profile details

### Task Management

- Create, read, update, and delete tasks
- Display a list of user-specific tasks

### Security Features

- Password hashing using **bcrypt**
- JWT-based authentication and authorization
- Input validation to prevent malicious requests
- Error handling for common HTTP status codes
- Middleware-based authentication guard
- CORS support for cross-origin requests
- Logging with **morgan**

### State Management

- Uses **Redux Toolkit** for managing global state

### UI & Styling

- Built with **Tailwind CSS** for responsive design

## Tech Stack

### Frontend

- **React** (Create React App / Vite)
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API requests
- **Tailwind CSS** for styling

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT for authentication**
- **bcrypt for password hashing**

## Installation

### Prerequisites

- Node.js installed
- MongoDB running

### Steps to Run Locally

#### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com:muhammadranju/task-management.git
   cd task-manager/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the development server:
   ```bash
   npm start
   ```

#### Backend

1. Clone the repository:
   ```bash
   cd task-management/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
   PORT=5000
   JWT_SECRET=your_secret_key
   MONGO_URL="mongodb://127.0.0.1:27017/task-manager"
   NODE_ENV="development"
   FRONTEND_URL="http://localhost:5173"
   EMAIL_USER="USER_EMAIL"
   EMAIL_PASS="YOUR_EMAIL_PASSWORD"
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Project Structure

```
/task-manager
│── frontend/
│   │── src/
│   │   │── components/     # Reusable UI components
│   │   │── pages/          # Application pages (Login, Register, Dashboard)
│   │   │── store/         # Redux store and slices
│   │   │── utils/         # Helper functions
│   │   │── App.js         # Main app component
│   │   │── index.js       # Entry point
│── backend/
│   │── routes/            # API route handlers
│   │── controllers/       # Business logic for API endpoints
│   │── models/            # MongoDB data models
│   │── middleware/        # Authentication and validation middleware
│   │── config/            # Environment and database configurations
│   │── server.js          # Entry point
```

## API Endpoints

### Authentication & User Management

| Method | Endpoint                | Description                       |
| ------ | ----------------------- | --------------------------------- |
| POST   | `/auth/register`        | Register a new user               |
| POST   | `/auth/login`           | Authenticate user and return JWT  |
| GET    | `/auth/profile`         | Get authenticated user profile    |
| PUT    | `/auth/profile`         | Update authenticated user profile |
| POST   | `/auth/forgot-password` | Send reset password link          |
| POST   | `/auth/reset-password`  | Reset password using token        |

### Task Management (Protected Routes)

| Method | Endpoint     | Description                              |
| ------ | ------------ | ---------------------------------------- |
| GET    | `/tasks`     | Get all tasks for the authenticated user |
| GET    | `/tasks/:id` | Get a specific task by ID                |
| POST   | `/tasks`     | Create a new task                        |
| PUT    | `/tasks/:id` | Update an existing task                  |
| DELETE | `/tasks/:id` | Delete a task                            |

## Deployment

- **Frontend:** Deploy on **Vercel, Netlify, or Firebase Hosting**
- **Backend:** Deploy on **Vercel**
- **Database:** Use **MongoDB Atlas**
Updated!!