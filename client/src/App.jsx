import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import Layout from "./components/layout/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import GlobalStyles from "./theme/GlobalStyles";
import PrivateRoute, {
  RoleBasedRoute,
} from "./components/routing/PrivateRoute";
import { AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import AdminLayout from "./components/dashboard/AdminLayout";

// Loading animation
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Player
      autoplay
      loop
      src="/loading-animation.json"
      style={{ width: "200px", height: "200px" }}
    />
  </div>
);

// Pages
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Appointments = React.lazy(() => import("./pages/Appointments"));
const Departments = React.lazy(() => import("./pages/Departments"));
const Doctors = React.lazy(() => import("./pages/Doctors"));
const Patients = React.lazy(() => import("./pages/Patients"));
const PatientDetails = React.lazy(() => import("./pages/PatientDetails"));
const BookAppointment = React.lazy(() => import("./pages/BookAppointment"));
const Profile = React.lazy(() => import("./pages/Profile"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Telemedicine = React.lazy(() => import("./pages/Telemedicine"));
const PatientSignup = React.lazy(() => import("./pages/PatientSignup"));
const MedicalRecords = React.lazy(() => import("./pages/MedicalRecords"));
const AIDiagnostics = React.lazy(() => import("./pages/AIDiagnostics"));
const Pharmacy = React.lazy(() => import("./pages/Pharmacy"));

// Doctor Pages
const DoctorTelemedicine = React.lazy(() =>
  import("./pages/doctor/DoctorTelemedicine")
);

// Admin Pages
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const ManageDepartments = React.lazy(() =>
  import("./pages/admin/ManageDepartments")
);
const ManageDoctors = React.lazy(() => import("./pages/admin/ManageDoctors"));
const ManageAppointments = React.lazy(() =>
  import("./pages/admin/ManageAppointments")
);
// Now that we have created these files, we can uncomment them
const ManagePatients = React.lazy(() => import("./pages/admin/ManagePatients"));
const ManageLabTechnicians = React.lazy(() =>
  import("./pages/admin/ManageLabTechnicians")
);

// Lab Technician Pages
const LabReports = React.lazy(() => import("./pages/lab/LabReports"));
const UploadLabResults = React.lazy(() =>
  import("./pages/lab/UploadLabResults")
);
const ViewLabOrders = React.lazy(() => import("./pages/lab/ViewLabOrders"));

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/patient-signup"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientSignup />
            </Suspense>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Common routes for all authenticated users */}
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />

          {/* Patient specific routes */}
          <Route
            path="appointments"
            element={
              <RoleBasedRoute roles={["patient", "doctor", "admin"]}>
                <Appointments />
              </RoleBasedRoute>
            }
          />
          <Route
            path="book-appointment/:doctorId"
            element={
              <RoleBasedRoute roles={["patient"]}>
                <BookAppointment />
              </RoleBasedRoute>
            }
          />
          <Route
            path="telemedicine/:appointmentId"
            element={
              <RoleBasedRoute roles={["patient", "doctor"]}>
                <Telemedicine />
              </RoleBasedRoute>
            }
          />
          <Route
            path="medical-records"
            element={
              <RoleBasedRoute roles={["patient", "doctor", "admin"]}>
                <MedicalRecords />
              </RoleBasedRoute>
            }
          />
          <Route
            path="ai-diagnostics"
            element={
              <RoleBasedRoute roles={["patient", "doctor"]}>
                <AIDiagnostics />
              </RoleBasedRoute>
            }
          />

          {/* Doctor specific routes */}
          <Route
            path="departments"
            element={
              <RoleBasedRoute roles={["doctor", "admin"]}>
                <Departments />
              </RoleBasedRoute>
            }
          />
          <Route
            path="doctors"
            element={
              <RoleBasedRoute roles={["patient", "doctor", "admin"]}>
                <Doctors />
              </RoleBasedRoute>
            }
          />
          <Route
            path="doctor-telemedicine"
            element={
              <RoleBasedRoute roles={["doctor"]}>
                <DoctorTelemedicine />
              </RoleBasedRoute>
            }
          />
          <Route
            path="patients"
            element={
              <RoleBasedRoute roles={["doctor", "admin"]}>
                <Patients />
              </RoleBasedRoute>
            }
          />
          <Route
            path="patients/:id"
            element={
              <RoleBasedRoute roles={["doctor", "admin"]}>
                <PatientDetails />
              </RoleBasedRoute>
            }
          />
          <Route
            path="pharmacy"
            element={
              <RoleBasedRoute roles={["doctor", "admin"]}>
                <Pharmacy />
              </RoleBasedRoute>
            }
          />

          {/* Lab Technician specific routes */}
          <Route
            path="lab-reports"
            element={
              <RoleBasedRoute roles={["labtechnician", "doctor", "admin"]}>
                <LabReports />
              </RoleBasedRoute>
            }
          />
          <Route
            path="upload-lab-results"
            element={
              <RoleBasedRoute roles={["labtechnician"]}>
                <UploadLabResults />
              </RoleBasedRoute>
            }
          />
          <Route
            path="view-lab-orders"
            element={
              <RoleBasedRoute roles={["labtechnician", "doctor"]}>
                <ViewLabOrders />
              </RoleBasedRoute>
            }
          />

          {/* Admin Routes - Only accessible to admin role */}
          <Route
            path="admin"
            element={
              <RoleBasedRoute roles={["admin"]}>
                <AdminLayout />
              </RoleBasedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="departments" element={<ManageDepartments />} />
            <Route path="doctors" element={<ManageDoctors />} />
            <Route path="appointments" element={<ManageAppointments />} />
            <Route path="patients" element={<ManagePatients />} />
            <Route path="lab-technicians" element={<ManageLabTechnicians />} />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
