import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaHospital } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LoginImage = styled.div`
  flex: 1;
  background-image: url("/login-bg.jpg");
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

  input {
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
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
            <h1>MediCare</h1>
          </LogoContainer>
          <FormTitle>Sign In</FormTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputContainer>
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email"
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

          <SubmitButton
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </SubmitButton>

          <SignupLink>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </SignupLink>
        </LoginForm>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default Login;
