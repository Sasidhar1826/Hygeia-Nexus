import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import mockAuthService from "../services/mockApi";

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

    initializeAuth();
  }, []);

  const login = async (email, password, role = "") => {
    try {
      setError(null);

      // Always use mock API for development
      const response = await mockAuthService.login(email, password, role);

      if (!response || !response.token) {
        throw new Error("Invalid login response");
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
      const response = await mockAuthService.signup(userData);

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
    mockAuthService.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUserProfile = async (userData) => {
    try {
      setError(null);
      const response = await api.put(`/users/${user._id}`, userData);

      // Update stored user data
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));

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
