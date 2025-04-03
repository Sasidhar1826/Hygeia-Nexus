import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaLock,
  FaEnvelope,
  FaHospital,
  FaUserMd,
  FaUserInjured,
  FaFlask,
  FaUserCog,
  FaInfoCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LoginImage = styled.div`
  flex: 1;
  background-image: url("/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const LoginFormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing(3)};
  background-color: ${(props) => props.theme.colors.background.default};
`;

const LoginForm = styled(motion.form)`
  width: 100%;
  max-width: 400px;
  padding: ${(props) => props.theme.spacing(4)};
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.medium};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.primary.main};

  svg {
    font-size: 2rem;
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.default};

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
    color: ${(props) => props.theme.colors.text.secondary};
  }

  input,
  select {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text.primary};

    &:focus {
      outline: none;
    }
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.light};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.status.error};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  font-size: 0.9rem;
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: ${(props) => props.theme.spacing(3)};
  font-size: 0.9rem;

  a {
    color: ${(props) => props.theme.colors.primary.main};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RoleSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const RoleButton = styled(motion.button)`
  flex: 1;
  padding: ${(props) => props.theme.spacing(1.5)};
  margin: 0 ${(props) => props.theme.spacing(0.5)};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.primary.main
      : props.theme.colors.background.default};
  color: ${(props) =>
    props.selected ? "white" : props.theme.colors.text.primary};
  border: 1px solid
    ${(props) =>
      props.selected
        ? props.theme.colors.primary.main
        : props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(0.5)};

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${(props) =>
      props.selected
        ? props.theme.colors.primary.main
        : props.theme.colors.background.paper};
    transform: translateY(-2px);
  }
`;

const RoleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1.5)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.card};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};

  svg {
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.accent.main};
  }
`;

const DemoCredentials = styled.div`
  text-align: center;
  margin-top: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
  background-color: ${(props) => props.theme.colors.background.card};
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("patient");
  const [showCredentials, setShowCredentials] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  // Redirect based on role if already logged in
  useEffect(() => {
    if (user) {
      redirectBasedOnRole(user.role);
    }
  }, [user]);

  // Set default credentials based on selected role
  useEffect(() => {
    setShowCredentials(true);
    switch (selectedRole) {
      case "admin":
        setEmail("admin@example.com");
        setPassword("password123");
        break;
      case "doctor":
        setEmail("doctor@example.com");
        setPassword("password123");
        break;
      case "labtechnician":
        setEmail("lab@example.com");
        setPassword("password123");
        break;
      case "patient":
        setEmail("patient@example.com");
        setPassword("password123");
        break;
      default:
        setEmail("");
        setPassword("");
    }
  }, [selectedRole]);

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case "admin":
        navigate("/dashboard/admin/dashboard");
        break;
      case "doctor":
        navigate("/dashboard/appointments");
        break;
      case "labtechnician":
        navigate("/dashboard/lab-reports");
        break;
      case "patient":
      default:
        navigate("/dashboard");
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const userData = await login(email, password, selectedRole);
      redirectBasedOnRole(userData.role);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleDescription = () => {
    switch (selectedRole) {
      case "patient":
        return "Access your medical records, appointments, and prescriptions";
      case "doctor":
        return "Manage patient appointments, medical records, and prescriptions";
      case "labtechnician":
        return "Upload and manage lab reports and test results";
      case "admin":
        return "Manage hospital staff, departments, and system settings";
      default:
        return "";
    }
  };

  return (
    <LoginContainer>
      <LoginImage />
      <LoginFormContainer>
        <LoginForm
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <LogoContainer>
            <FaHospital />
            <h1>Hygenia Nexus</h1>
          </LogoContainer>
          <FormTitle>Sign in to your account</FormTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <RoleSelector>
            <RoleButton
              type="button"
              selected={selectedRole === "patient"}
              onClick={() => setSelectedRole("patient")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserInjured />
              Patient
            </RoleButton>
            <RoleButton
              type="button"
              selected={selectedRole === "doctor"}
              onClick={() => setSelectedRole("doctor")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserMd />
              Doctor
            </RoleButton>
            <RoleButton
              type="button"
              selected={selectedRole === "labtechnician"}
              onClick={() => setSelectedRole("labtechnician")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFlask />
              Lab Tech
            </RoleButton>
            <RoleButton
              type="button"
              selected={selectedRole === "admin"}
              onClick={() => setSelectedRole("admin")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserCog />
              Admin
            </RoleButton>
          </RoleSelector>

          {selectedRole && (
            <div style={{ marginBottom: "1rem" }}>
              <RoleInfo>
                <FaInfoCircle />
                <span>{getRoleDescription()}</span>
              </RoleInfo>
            </div>
          )}

          <InputContainer>
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputContainer>

          <InputContainer>
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputContainer>

          <div style={{ marginTop: "1rem" }}>
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </SubmitButton>
          </div>

          <SignupLink>
            Don't have an account? <Link to="/signup">Create an account</Link>
          </SignupLink>
        </LoginForm>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default Login;
