import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaLock, FaExclamationTriangle } from "react-icons/fa";

// Styled components for unauthorized access
const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: ${(props) => props.theme.spacing(3)};
`;

const Icon = styled.div`
  font-size: 3rem;
  color: ${(props) => props.theme.colors.status.error};
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const Message = styled.p`
  font-size: 1rem;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 500px;
`;

const UnauthorizedAccess = () => (
  <UnauthorizedContainer>
    <Icon>
      <FaExclamationTriangle />
    </Icon>
    <Title>Access Denied</Title>
    <Message>
      You don't have the required permissions to access this page. Please
      contact your administrator if you believe this is an error.
    </Message>
  </UnauthorizedContainer>
);

// Loading component
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid ${(props) => props.theme.colors.background.default};
  border-top: 5px solid ${(props) => props.theme.colors.primary.main};
`;

const Loading = () => (
  <LoadingContainer>
    <LoadingSpinner
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </LoadingContainer>
);

/**
 * PrivateRoute component to protect routes requiring authentication
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

/**
 * RoleBasedRoute component to protect routes requiring specific roles
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string|string[]} props.roles - Required role(s) to access the route
 */
export const RoleBasedRoute = ({ children, roles }) => {
  const { hasRole, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (!hasRole(roles)) {
    return <UnauthorizedAccess />;
  }

  return children;
};

export default PrivateRoute;
