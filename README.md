# Hygenia Nexus - Healthcare Management System

A comprehensive healthcare management system built with the MERN stack.

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Node.js/Express application

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local installation or MongoDB Atlas)
- NPM or Yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd hygenia-nexus
```

2. Install dependencies for the entire project

```bash
npm run install-all
```

This will install dependencies for:

- Root project
- Client (React frontend)
- Server (Node.js backend)

### Environment Setup

1. Create a `.env` file in the server directory:

```bash
cd server
```

```
MONGODB_URI=mongodb://localhost:27017/hygenia-nexus
PORT=5000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

2. Create a `.env` file in the client directory:

```bash
cd ../client
```

```
VITE_API_URL=http://localhost:5000/api
```

## Seeding the Database

To populate the database with initial data (departments, doctors, patients, and appointments):

```bash
npm run seed
```

This will:

1. Clear existing data (use with caution in production)
2. Create sample departments
3. Create an admin user
4. Create sample doctors
5. Create sample patients
6. Create sample appointments with valid references
7. Create sample lab technicians

### Sample Login Credentials

After seeding, you can login with:

**Admin:**

- Email: admin@example.com
- Password: admin123

**Doctor:**

- Email: jane.smith@example.com
- Password: doctor123

**Patient:**

- Email: amit.sharma@example.com
- Password: patient123

**Lab Technician:**

- Email: rahul.singh@example.com
- Password: labtech123

## Running the Application

### Development Mode

To run both the client and server in development mode:

```bash
npm run dev
```

The frontend will be available at: http://localhost:5173
The backend API will be available at: http://localhost:5000/api

### Production Mode

To run in production mode:

```bash
npm start
```

## Features

- User authentication with role-based access control
- Patient management
- Doctor management
- Appointment scheduling and management
- Department organization
- Lab test ordering and results management

## Resolving Common Issues

### Unknown Doctor/Patient in Appointments

If you see "Unknown Doctor" or "Unknown Patient" in appointments, it means:

1. There are broken references in your database
2. The referenced doctor or patient IDs exist but can't be populated

Solutions:

- Run the seeder script to create fresh appointments with valid references
- Use the "Fix References" button in the Admin Dashboard to repair broken references
- Ensure that when doctors or patients are deleted, their related appointments are properly handled

## License

This project is licensed under the ISC License.

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
