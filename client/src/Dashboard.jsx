import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import AnimationContainer from "./components/animations/AnimationContainer";
import PatientDashboard from "./pages/patient/PatientDashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user, isPatient, isDoctor, isAdmin, isLabTechnician } = useAuth();

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <AnimationContainer type="loading" height="400px" />;
  }

  // Render appropriate dashboard based on user role
  if (isPatient()) {
    return <PatientDashboard />;
  }

  if (isAdmin()) {
    return <AdminDashboard />;
  }

  if (isLabTechnician()) {
    // Return the LabTechnicianDashboard component when created
    return <div>Lab Technician Dashboard will be implemented here</div>;
  }

  // Doctor dashboard
  if (isDoctor()) {
    return <DoctorDashboard />;
  }

  // Default fallback
  return <div>Please select a role to continue</div>;
};

export default Dashboard;
