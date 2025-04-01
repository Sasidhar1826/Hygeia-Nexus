import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaVenusMars,
  FaTint,
  FaNotesMedical,
  FaHospital,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const SignupContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background.default};
`;

const SignupImage = styled.div`
  flex: 1;
  background-image: url("/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  display: none;

  @media (min-width: 992px) {
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

const SignupForm = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  padding: ${(props) => props.theme.spacing(4)};
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.large};
  box-shadow: ${(props) => props.theme.shadows.large};
  overflow: hidden;
`;

const FormTitle = styled.h1`
  font-size: 1.75rem;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.primary.main};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormSubtitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const Step = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active
      ? props.theme.colors.primary.main
      : props.completed
      ? props.theme.colors.primary.light
      : props.theme.colors.background.default};
  color: ${(props) =>
    props.active || props.completed
      ? "white"
      : props.theme.colors.text.secondary};
  font-weight: bold;
  margin: 0 ${(props) => props.theme.spacing(1)};
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -20px;
    transform: translateY(-50%);
    width: 20px;
    height: 3px;
    background-color: ${(props) =>
      props.completed
        ? props.theme.colors.primary.light
        : props.theme.colors.background.default};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const FormRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(3)};

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  font-weight: 500;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.main}20;
  }

  svg {
    margin-right: ${(props) => props.theme.spacing(1.5)};
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing(4)};
`;

const Button = styled(motion.button)`
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  background-color: ${(props) =>
    props.secondary ? "transparent" : props.theme.colors.primary.main};
  color: ${(props) =>
    props.secondary ? props.theme.colors.text.primary : "white"};
  border: ${(props) =>
    props.secondary ? `1px solid ${props.theme.colors.border}` : "none"};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  &:hover {
    background-color: ${(props) =>
      props.secondary
        ? props.theme.colors.background.default
        : props.theme.colors.primary.light};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.status.error};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  font-size: 0.9rem;
`;

const LoginLink = styled.div`
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

const RequiredField = styled.span`
  color: ${(props) => props.theme.colors.status.error};
  margin-left: ${(props) => props.theme.spacing(0.5)};
`;

const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const PatientSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Account information
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2: Personal information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");

  // Step 3: Medical information
  const [bloodGroup, setBloodGroup] = useState("");
  const [allergies, setAllergies] = useState("");
  const [existingConditions, setExistingConditions] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const nextStep = () => {
    if (validateCurrentStep()) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep(currentStep - 1);
  };

  const validateCurrentStep = () => {
    setError("");

    if (currentStep === 1) {
      if (!email || !password || !confirmPassword) {
        setError("All fields are required");
        return false;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address");
        return false;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return false;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    } else if (currentStep === 2) {
      if (
        !firstName ||
        !lastName ||
        !gender ||
        !dateOfBirth ||
        !phoneNumber ||
        !aadhaarNumber
      ) {
        setError("All fields are required");
        return false;
      }

      if (!/^\d{10}$/.test(phoneNumber)) {
        setError("Please enter a valid 10-digit phone number");
        return false;
      }

      if (!/^\d{12}$/.test(aadhaarNumber)) {
        setError("Please enter a valid 12-digit Aadhaar number");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateCurrentStep()) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        email,
        password,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        phoneNumber,
        aadhaarNumber,
        bloodGroup,
        allergies,
        existingConditions,
        address: {
          street: address,
          city,
          state,
          pincode,
        },
        role: "patient",
      };

      await signup(userData);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FormSubtitle>Account Information</FormSubtitle>

            <FormGroup>
              <InputLabel>
                Email Address <RequiredField>*</RequiredField>
              </InputLabel>
              <InputContainer>
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <InputLabel>
                Password <RequiredField>*</RequiredField>
              </InputLabel>
              <InputContainer>
                <FaLock />
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <InputLabel>
                Confirm Password <RequiredField>*</RequiredField>
              </InputLabel>
              <InputContainer>
                <FaLock />
                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </InputContainer>
            </FormGroup>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FormSubtitle>Personal Information</FormSubtitle>

            <FormRow>
              <FormGroup>
                <InputLabel>
                  First Name <RequiredField>*</RequiredField>
                </InputLabel>
                <InputContainer>
                  <FaUser />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <InputLabel>
                  Last Name <RequiredField>*</RequiredField>
                </InputLabel>
                <InputContainer>
                  <FaUser />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </InputContainer>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <InputLabel>
                  Gender <RequiredField>*</RequiredField>
                </InputLabel>
                <InputContainer>
                  <FaVenusMars />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <InputLabel>
                  Date of Birth <RequiredField>*</RequiredField>
                </InputLabel>
                <InputContainer>
                  <FaCalendarAlt />
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </InputContainer>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <InputLabel>
                Phone Number <RequiredField>*</RequiredField>
              </InputLabel>
              <InputContainer>
                <FaPhone />
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <InputLabel>
                Aadhaar Number <RequiredField>*</RequiredField>
              </InputLabel>
              <InputContainer>
                <FaIdCard />
                <input
                  type="text"
                  placeholder="12-digit Aadhaar number"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  required
                />
              </InputContainer>
            </FormGroup>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FormSubtitle>Medical & Address Information</FormSubtitle>

            <FormGroup>
              <InputLabel>Blood Group</InputLabel>
              <InputContainer>
                <FaTint />
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <InputLabel>Allergies (if any)</InputLabel>
              <InputContainer>
                <FaNotesMedical />
                <input
                  type="text"
                  placeholder="Separate with commas"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <InputLabel>Existing Medical Conditions (if any)</InputLabel>
              <InputContainer>
                <FaNotesMedical />
                <input
                  type="text"
                  placeholder="Separate with commas"
                  value={existingConditions}
                  onChange={(e) => setExistingConditions(e.target.value)}
                />
              </InputContainer>
            </FormGroup>

            <FormGroup>
              <InputLabel>Address</InputLabel>
              <InputContainer>
                <FaMapMarkerAlt />
                <input
                  type="text"
                  placeholder="Street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </InputContainer>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <InputLabel>City</InputLabel>
                <InputContainer>
                  <FaMapMarkerAlt />
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <InputLabel>State</InputLabel>
                <InputContainer>
                  <FaMapMarkerAlt />
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </InputContainer>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <InputLabel>Pincode</InputLabel>
              <InputContainer>
                <FaMapMarkerAlt />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </InputContainer>
            </FormGroup>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <SignupContainer>
      <SignupImage />
      <SignupFormContainer>
        <SignupForm
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FormTitle>
            <FaHospital style={{ marginRight: "10px" }} />
            Patient Registration
          </FormTitle>

          <StepIndicator>
            <Step active={currentStep === 1} completed={currentStep > 1}>
              1
            </Step>
            <Step active={currentStep === 2} completed={currentStep > 2}>
              2
            </Step>
            <Step active={currentStep === 3} completed={currentStep > 3}>
              3
            </Step>
          </StepIndicator>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form
            onSubmit={
              currentStep === 3 ? handleSubmit : (e) => e.preventDefault()
            }
          >
            <AnimatePresence mode="wait" custom={direction}>
              {renderStep()}
            </AnimatePresence>

            <ButtonGroup>
              {currentStep > 1 && (
                <Button
                  type="button"
                  secondary
                  onClick={prevStep}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaArrowLeft />
                  Back
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  style={{ marginLeft: currentStep > 1 ? "0" : "auto" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                  <FaArrowRight />
                </Button>
              ) : (
                <SubmitButton
                  type="submit"
                  disabled={isLoading}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? "Creating Account..." : "Complete Registration"}
                </SubmitButton>
              )}
            </ButtonGroup>
          </form>

          <LoginLink>
            Already have an account? <Link to="/login">Login</Link>
          </LoginLink>
        </SignupForm>
      </SignupFormContainer>
    </SignupContainer>
  );
};

export default PatientSignup;
