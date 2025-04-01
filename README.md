# Hospital Management System

A comprehensive hospital management system built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Patient Management
- Appointment Scheduling
- Medical Records
- AI Diagnostics
- Telemedicine
- Pharmacy & Inventory
- Billing & Insurance

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/hospital-management-system.git
   cd hospital-management-system
   ```

2. Install dependencies:

   ```
   npm run install-all
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/hospital-management
     JWT_SECRET=your_jwt_secret_key_here
     NODE_ENV=development
     ```
   - Create a `.env` file in the client directory with the following variables:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

## Running the Application

1. Start the development server:

   ```
   npm start
   ```

   This will start both the backend server and the frontend development server.

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## Default Login Credentials

- Email: admin@hospital.com
- Password: admin123

## Project Structure
