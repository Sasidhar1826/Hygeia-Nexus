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

## Project Status

This project is currently in **development mode**, using **mock APIs** for frontend development. The backend is structured but not fully integrated yet.

### Development Phases:

1. **Current Phase**: Frontend development with mock data
2. **Next Phase**: Backend API implementation and integration
3. **Final Phase**: Testing, refinement, and deployment

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas) - only needed for real API implementation
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
   npm run dev
   ```

   This will start both the frontend and backend servers.

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API (when implemented): http://localhost:5000/api

## Mock API Implementation

The current implementation uses mock data for development:

- All API calls are intercepted by the mock service
- Login/authentication works with predefined mock users
- Data persistence is in-memory only during runtime

### Default Mock Credentials:

- **Admin**:

  - Email: admin@example.com
  - Password: password123

- **Doctor**:

  - Email: doctor@example.com
  - Password: password123

- **Patient**:

  - Email: patient@example.com
  - Password: password123

- **Lab Technician**:
  - Email: lab@example.com
  - Password: password123

## Transitioning to Real APIs

To switch from mock APIs to real backend:

1. In `AuthContext.jsx`: Change `useMockApi` state to `false`
2. Ensure MongoDB is set up and running
3. Implement any missing API endpoints in the backend
4. Update API service calls if necessary

## Project Structure
