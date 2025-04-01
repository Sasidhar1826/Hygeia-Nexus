import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import Layout from "./components/layout/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme } from "./styles/theme";
import PrivateRoute from "./components/routing/PrivateRoute";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Departments from "./pages/Departments";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Telemedicine from "./pages/Telemedicine";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageDepartments from "./pages/admin/ManageDepartments";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManageAppointments from "./pages/admin/ManageAppointments";

const ProtectedRoute = ({ children, title }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Layout title={title}>{children}</Layout>;
};

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="departments" element={<Departments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route
            path="book-appointment/:doctorId"
            element={<BookAppointment />}
          />
          <Route path="profile" element={<Profile />} />
          <Route
            path="telemedicine/:appointmentId"
            element={<Telemedicine />}
          />

          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/departments" element={<ManageDepartments />} />
          <Route path="admin/doctors" element={<ManageDoctors />} />
          <Route path="admin/appointments" element={<ManageAppointments />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
