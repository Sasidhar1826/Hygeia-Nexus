import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import mockApi from "../services/mockApi";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // For development, we're always using mock API
  const [useMockApi, setUseMockApi] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is already logged in
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          // Using mock API for development, just set the user without validation
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debug: check if all required API methods exist
    console.log("Checking mock API methods:");
    console.log(
      "- updateUser exists:",
      typeof mockApi.updateUser === "function"
    );
    console.log(
      "- updatePatient exists:",
      typeof mockApi.updatePatient === "function"
    );
    console.log(
      "- updateDoctor exists:",
      typeof mockApi.updateDoctor === "function"
    );
    console.log(
      "- updateLabTechnician exists:",
      typeof mockApi.updateLabTechnician === "function"
    );

    initializeAuth();
  }, []);

  // Helper function to find a mock user by email
  const findMockUserByEmail = (email) => {
    // This function would search the mock users data
    // In a real implementation, you would import the mockUsers array from mockApi.js
    // For now, we'll just create sample mapping for demo
    const emailToIdMap = {
      "admin@example.com": "1",
      "doctor@example.com": "2",
      "patient@example.com": "3",
      "lab@example.com": "4",
      "emily@example.com": "5",
      "david@example.com": "6",
      "jessica@example.com": "7",
    };

    return emailToIdMap[email];
  };

  const login = async (email, password, role = "") => {
    try {
      setError(null);

      // Always use mock API for development
      console.log("Attempting login with:", { email, role });
      const response = await mockApi.login(email, password, role);

      if (!response || !response.token) {
        throw new Error("Invalid login response");
      }

      console.log("Login successful, user data:", response.user);

      // Find corresponding mock user ID if possible
      const mockUserId = findMockUserByEmail(email);
      if (mockUserId) {
        console.log(
          `Found matching mock user ID: ${mockUserId} for email: ${email}`
        );
        // Update the ID to match mock data for easier integration
        response.user._id = mockUserId;
      }

      // Store token and user in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
      return response.user;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);

      // Always use mock API for development
      const response = await mockApi.signup(userData);

      // Store token and user in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    }
  };

  const logout = () => {
    mockApi.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUserProfile = async (userData) => {
    try {
      setError(null);
      let response;

      // Use appropriate mock API based on user role if using mock API
      if (useMockApi) {
        try {
          console.log("Updating profile for user:", user);

          // Instead of using the mock API update functions directly, handle the update manually
          // This is needed because the user IDs in localStorage may not match mock data IDs
          const updatedUserData = { ...user, ...userData };
          console.log("Updated user data:", updatedUserData);

          // Update localStorage regardless of mock API status
          localStorage.setItem("user", JSON.stringify(updatedUserData));

          // Set response format to match API structure
          response = { data: updatedUserData };
          console.log("Profile updated successfully");
        } catch (error) {
          console.error("Error in profile update:", error);
          throw error;
        }
      } else {
        // Use real API if not using mock
        response = await api.put(`/users/${user._id}`, userData);
      }

      // Update stored user data (already done in mock path, but needed for real API)
      const updatedUser = response.data;
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
      throw err;
    }
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  // Check if user is an admin
  const isAdmin = () => {
    return hasRole("admin");
  };

  // Check if user is a doctor
  const isDoctor = () => {
    return hasRole("doctor");
  };

  // Check if user is a patient
  const isPatient = () => {
    return hasRole("patient");
  };

  // Check if user is a lab technician
  const isLabTechnician = () => {
    return hasRole("labtechnician");
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateUserProfile,
    isAuthenticated: !!user,
    hasRole,
    isAdmin,
    isDoctor,
    isPatient,
    isLabTechnician,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
