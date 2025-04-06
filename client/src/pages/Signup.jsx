import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaUserMd,
  FaHospital,
  FaFlask,
  FaHeadset,
  FaUserInjured,
  FaKey,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const SignupContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background.default};
`;

const SignupImage = styled.div`
  flex: 1;
  background-image: url("/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const SignupFormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing(4)};
`;

const SignupForm = styled(motion.form)`
  width: 100%;
  max-width: 450px;
  padding: ${(props) => props.theme.spacing(4)};
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.large};
  box-shadow: ${(props) => props.theme.shadows.large};
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.primary.main};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border};

  svg {
    margin-right: ${(props) => props.theme.spacing(1.5)};
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

const SelectContainer = styled(InputContainer)`
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

const InfoMessage = styled.div`
  background-color: ${(props) => props.theme.colors.primary.main}20;
  border-left: 4px solid ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.text.primary};
  padding: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.9rem;

  a {
    color: ${(props) => props.theme.colors.primary.main};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LinkContainer = styled.div`
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props) => props.theme.spacing(3)} 0;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }

  span {
    padding: 0 ${(props) => props.theme.spacing(1)};
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

const PatientButton = styled(motion.button)`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  background-color: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.primary.main};
  border: 1px solid ${(props) => props.theme.colors.primary.main};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(3)};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.main}20;
  }
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("doctor");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [needsAdminKey, setNeedsAdminKey] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [staffId, setStaffId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(true);

  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin key is needed based on role
    setNeedsAdminKey(role === "admin");
    // Show additional fields based on the role
    setShowAdditionalFields(role !== "receptionist" && role !== "nurse");
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    // Role-specific validations
    if (role === "doctor" && (!specialty || !licenseNumber)) {
      setError("Doctors must provide specialty and license number");
      setIsLoading(false);
      return;
    }

    if (role === "admin" && !staffId) {
      setError("Administrators must provide a staff ID");
      setIsLoading(false);
      return;
    }

    if (role === "labtechnician" && (!specialization || !licenseNumber)) {
      setError(
        "Lab technicians must provide specialization and license number"
      );
      setIsLoading(false);
      return;
    }

    // Validate admin key if trying to register as admin
    if (role === "admin" && adminKey !== "admin123") {
      // This is just a placeholder, in a real app this would be verified on the server
      setError("Invalid admin key");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Submitting staff signup data:", { name, email, role });

      const userData = {
        name,
        email,
        password,
        role, // Backend will use this as userType
      };

      // Add role-specific fields
      if (role === "doctor") {
        userData.specialty = specialty;
        userData.licenseNumber = licenseNumber;
      } else if (role === "admin") {
        userData.staffId = staffId;
      } else if (role === "labtechnician") {
        userData.specialization = specialization;
        userData.licenseNumber = licenseNumber;
      }

      await signup(userData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Staff signup error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToPatientSignup = () => {
    navigate("/patient-signup");
  };

  return (
    <SignupContainer>
      <SignupImage />
      <SignupFormContainer>
        <SignupForm
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <FormTitle>
            <FaHospital style={{ marginRight: "10px" }} />
            Staff Registration
          </FormTitle>

          <InfoMessage>
            This registration is for hospital staff only. If you are a patient,
            please <Link to="/patient-signup">register here</Link>.
          </InfoMessage>

          <PatientButton
            type="button"
            onClick={redirectToPatientSignup}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUserInjured /> Register as a Patient
          </PatientButton>

          <Divider>
            <span>STAFF REGISTRATION</span>
          </Divider>

          <FormGroup>
            <InputContainer>
              <FaUser />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <InputContainer>
              <FaEnvelope />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <InputContainer>
              <FaLock />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <InputContainer>
              <FaLock />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <SelectContainer>
              <FaUserMd />
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="doctor">Doctor</option>
                <option value="labtechnician">Lab Technician</option>
                <option value="nurse">Nurse</option>
                <option value="receptionist">Receptionist</option>
                <option value="admin">Administrator</option>
              </select>
            </SelectContainer>
          </FormGroup>

          {/* Role-specific additional fields */}
          {showAdditionalFields && role === "doctor" && (
            <>
              <FormGroup>
                <InputContainer>
                  <FaUserMd />
                  <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    placeholder="Medical Specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    required
                  />
                </InputContainer>
              </FormGroup>
              <FormGroup>
                <InputContainer>
                  <FaKey />
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    placeholder="License Number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                  />
                </InputContainer>
              </FormGroup>
            </>
          )}

          {showAdditionalFields && role === "labtechnician" && (
            <>
              <FormGroup>
                <InputContainer>
                  <FaFlask />
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    placeholder="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                  />
                </InputContainer>
              </FormGroup>
              <FormGroup>
                <InputContainer>
                  <FaKey />
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    placeholder="License Number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                  />
                </InputContainer>
              </FormGroup>
            </>
          )}

          {showAdditionalFields && role === "admin" && (
            <FormGroup>
              <InputContainer>
                <FaKey />
                <input
                  type="text"
                  id="staffId"
                  name="staffId"
                  placeholder="Staff ID"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  required
                />
              </InputContainer>
            </FormGroup>
          )}

          {needsAdminKey && (
            <FormGroup>
              <InputContainer>
                <FaKey />
                <input
                  type="password"
                  id="adminKey"
                  name="adminKey"
                  placeholder="Admin Registration Key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  required
                />
              </InputContainer>
            </FormGroup>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Creating Account..." : "Register as Staff"}
          </SubmitButton>

          <LinkContainer>
            Already have an account? <Link to="/login">Login</Link>
          </LinkContainer>
        </SignupForm>
      </SignupFormContainer>
    </SignupContainer>
  );
};

export default Signup;
