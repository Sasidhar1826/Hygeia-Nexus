import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/apiService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // useMockApi is now determined in apiService
  const [useMockApi, setUseMockApi] = useState(
    import.meta.env.VITE_USE_MOCK_API === "true"
  );

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is already logged in
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          try {
            // Validate token with the backend
            const currentUser = await api.getCurrentUser();

            // Ensure role and userType are consistent
            if (currentUser && currentUser.userType && !currentUser.role) {
              currentUser.role = currentUser.userType;
            } else if (
              currentUser &&
              currentUser.role &&
              !currentUser.userType
            ) {
              currentUser.userType = currentUser.role;
            }

            console.log("Current user from API:", {
              ...currentUser,
              password: currentUser.password ? "REDACTED" : undefined,
            });

            setUser(currentUser);
          } catch (err) {
            console.error("Token validation failed:", err);
            // If token validation fails, use stored user as fallback
            const parsedUser = JSON.parse(storedUser);

            // Ensure role and userType consistency in stored user
            if (parsedUser && parsedUser.userType && !parsedUser.role) {
              parsedUser.role = parsedUser.userType;
            } else if (parsedUser && parsedUser.role && !parsedUser.userType) {
              parsedUser.userType = parsedUser.role;
            }

            setUser(parsedUser);
          }
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
      console.log("AuthContext login called with role:", role);

      // Special handling for admin login
      if (role === "admin") {
        console.log("Attempting admin login with:", {
          email,
          passwordLength: password ? password.length : 0,
          role,
        });
      }

      const response = await api.login(email, password, role);

      if (!response || !response.token) {
        throw new Error("Invalid login response");
      }

      // User data will include both user fields and token
      const userData = {
        ...response,
        role: response.userType || response.role, // Ensure role is set from userType
      };

      // Ensure both role and userType are present for compatibility
      if (!userData.userType && userData.role) {
        userData.userType = userData.role;
      }

      console.log("Login successful, normalized user data:", {
        ...userData,
        token: userData.token ? "TOKEN_EXISTS" : "NO_TOKEN",
      });

      // Store token and user in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return userData;
    } catch (err) {
      console.error("Login error:", err);

      // Enhanced error logging for admin login
      if (role === "admin") {
        console.error("Admin login failure details:", {
          message: err.message || "Unknown error",
          status: err.response?.status,
          serverMessage: err.response?.data?.message,
        });
      }

      setError(err.response?.data?.message || err.message || "Login failed");
      throw err;
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);
      console.log("SignUp attempt with data:", {
        ...userData,
        password: "REDACTED",
      });

      // Make sure we have all required fields for a user
      if (!userData.email || !userData.password) {
        const errorMsg = "Email and password are required";
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      // Ensure that if firstName/lastName are provided, we handle them properly
      // This is for compatibility with the backend expecting 'name'
      if ((userData.firstName || userData.lastName) && !userData.name) {
        userData.name = `${userData.firstName || ""} ${
          userData.lastName || ""
        }`.trim();
      }

      // If role exists but userType doesn't, add userType
      if (userData.role && !userData.userType) {
        userData.userType = userData.role;
      }

      // If userType exists but role doesn't, add role
      if (userData.userType && !userData.role) {
        userData.role = userData.userType;
      }

      const response = await api.register(userData);
      console.log("Signup successful:", response);

      // Add role field for backward compatibility if needed
      const userWithRole = {
        ...response,
        role: response.userType || response.role,
      };

      // Ensure both fields exist
      if (!userWithRole.userType) userWithRole.userType = userWithRole.role;
      if (!userWithRole.role) userWithRole.role = userWithRole.userType;

      // Store token and user in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(userWithRole));

      setUser(userWithRole);
      return userWithRole;
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Signup failed";
      setError(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    if (api.logout) {
      api.logout();
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUserProfile = async (userData) => {
    try {
      setError(null);

      const updatedUser = await api.updateUserProfile(userData);

      // Preserve role/userType information
      const updatedUserWithRole = {
        ...updatedUser,
        role: updatedUser.userType || user?.userType || user?.role,
      };

      // Ensure both role and userType are present
      if (!updatedUserWithRole.userType) {
        updatedUserWithRole.userType = updatedUserWithRole.role;
      }

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUserWithRole));

      // Update stored user data
      setUser(updatedUserWithRole);
      return updatedUserWithRole;
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Profile update failed"
      );
      throw err;
    }
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    if (!user) return false;

    // Check userType first, then fall back to role for backward compatibility
    const userRole = user.userType || user.role;

    console.log("Role check:", {
      checking: role,
      userRole,
      userType: user.userType,
      roleField: user.role,
    });

    if (Array.isArray(role)) {
      return role.includes(userRole);
    }
    return userRole === role;
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
