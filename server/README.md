# Hygenia Nexus Backend Server

This is the backend server for the Hygenia Nexus healthcare platform. It provides all the necessary API endpoints for the frontend application, using MongoDB for data storage.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- CORS for cross-origin resource sharing
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed locally or a MongoDB Atlas account
- npm or yarn package manager

### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hygenia-nexus
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Replace `your_jwt_secret` with a strong secret key for JWT token generation.

### Database Setup

If using a local MongoDB instance, ensure MongoDB is running. The server will automatically create the database and collections on first run.

### Running the Server

For development with hot reloading:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will run on http://localhost:5000 by default.

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/profile` - Update user profile

### Doctor Endpoints

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/department/:departmentId` - Get doctors by department
- `PUT /api/doctors/:id` - Update doctor profile
- `POST /api/doctors/:id/reviews` - Add a review for a doctor
- `GET /api/doctors/:id/slots` - Get doctor's available time slots

### Appointment Endpoints

- `POST /api/appointments` - Create a new appointment
- `GET /api/appointments` - Get all appointments (filtered by user role)
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id/status` - Update appointment status
- `PUT /api/appointments/:id/cancel` - Cancel an appointment
- `PUT /api/appointments/:id/notes` - Add notes to an appointment

## License

This project is licensed under the MIT License.
