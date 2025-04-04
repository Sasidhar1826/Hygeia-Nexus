import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaFlask,
  FaRegClipboard,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import mockAuthService from "../../services/mockApi";
import mockApi from "../../services/mockApi";
import { useAuth } from "../../context/AuthContext";

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${(props) => props.theme.shadows.large};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(3)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(0.5)};
  border-radius: 50%;

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const ModalBody = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const Select = styled.select`
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.paper};
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const Textarea = styled.textarea`
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.paper};
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.primary};
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const Button = styled(motion.button)`
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  background-color: ${(props) =>
    props.variant === "primary"
      ? props.theme.colors.primary.main
      : props.theme.colors.background.default};

  color: ${(props) =>
    props.variant === "primary" ? "white" : props.theme.colors.text.primary};

  border: ${(props) =>
    props.variant === "primary"
      ? "none"
      : `1px solid ${props.theme.colors.border}`};

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary"
        ? props.theme.colors.primary.dark
        : props.theme.colors.background.card};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const UrgencyOption = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(1)};
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  cursor: pointer;
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
  }

  input {
    margin: 0;
  }

  span {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const UrgentBadge = styled.span`
  color: ${(props) => props.theme.colors.status.error};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: ${(props) => props.theme.spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};

  h3 {
    color: ${(props) => props.theme.colors.status.success};
    margin: 0;
  }

  p {
    color: ${(props) => props.theme.colors.text.secondary};
    margin: 0;
  }
`;

const RequestLabTest = ({
  isOpen,
  onClose,
  patient,
  patientId,
  departmentId,
  doctorId,
}) => {
  const { user } = useAuth();
  const [testType, setTestType] = useState("Blood Test");
  const [notes, setNotes] = useState("");
  const [urgency, setUrgency] = useState("Normal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fetchedPatient, setFetchedPatient] = useState(patient || null);
  const [loading, setLoading] = useState(!patient && !!patientId);

  // Fetch patient data if needed
  useEffect(() => {
    const getPatientData = async () => {
      if (!patient && patientId) {
        setLoading(true);
        try {
          const data = await mockApi.getPatientById(patientId);
          setFetchedPatient(data);
        } catch (error) {
          console.error("Error fetching patient data:", error);
        } finally {
          setLoading(false);
        }
      } else if (patient) {
        setFetchedPatient(patient);
      }
    };

    if (isOpen) {
      getPatientData();
    }
  }, [patient, patientId, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const currentPatient = fetchedPatient || patient;
      if (!currentPatient) {
        throw new Error("Patient data not available");
      }

      const patientName =
        currentPatient.firstName && currentPatient.lastName
          ? `${currentPatient.firstName} ${currentPatient.lastName}`
          : currentPatient.name || "Unknown Patient";

      await mockAuthService.createLabOrder({
        patient: currentPatient._id,
        patientName: patientName,
        doctor: doctorId || user?._id,
        testType: testType,
        status: "pending",
        urgency: urgency,
        notes: notes,
        department: departmentId || user?.department || "1",
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setTestType("Blood Test");
        setNotes("");
        setUrgency("Normal");
        setIsSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error creating lab order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <ModalContent
        variants={contentVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>
            <FaFlask />
            Request Lab Test
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>Loading patient data...</p>
            </div>
          ) : isSubmitted ? (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaRegClipboard size={40} color="#4CAF50" />
              <h3>Lab Test Requested Successfully</h3>
              <p>The lab technician will be notified of the request.</p>
            </SuccessMessage>
          ) : !fetchedPatient ? (
            <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
              <p>Error: Could not retrieve patient data</p>
              <Button
                type="button"
                onClick={onClose}
                style={{ marginTop: "10px" }}
              >
                Close
              </Button>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="patient-name">Patient</Label>
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {fetchedPatient.firstName && fetchedPatient.lastName
                    ? `${fetchedPatient.firstName} ${fetchedPatient.lastName}`
                    : fetchedPatient.name || "Unknown Patient"}
                </div>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="test-type">Test Type</Label>
                <Select
                  id="test-type"
                  value={testType}
                  onChange={(e) => setTestType(e.target.value)}
                  required
                >
                  <option value="Blood Test">Blood Test</option>
                  <option value="Urine Analysis">Urine Analysis</option>
                  <option value="X-Ray">X-Ray</option>
                  <option value="CT Scan">CT Scan</option>
                  <option value="MRI">MRI</option>
                  <option value="Ultrasound">Ultrasound</option>
                  <option value="ECG">ECG</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Urgency</Label>
                <UrgencyOption>
                  <RadioOption>
                    <input
                      type="radio"
                      id="normal"
                      name="urgency"
                      value="Normal"
                      checked={urgency === "Normal"}
                      onChange={(e) => setUrgency(e.target.value)}
                    />
                    <span>Normal</span>
                  </RadioOption>

                  <RadioOption>
                    <input
                      type="radio"
                      id="urgent"
                      name="urgency"
                      value="Urgent"
                      checked={urgency === "Urgent"}
                      onChange={(e) => setUrgency(e.target.value)}
                    />
                    <span>
                      Urgent
                      {urgency === "Urgent" && (
                        <UrgentBadge>
                          <FaExclamationTriangle />
                          Priority Processing
                        </UrgentBadge>
                      )}
                    </span>
                  </RadioOption>
                </UrgencyOption>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="notes">Notes & Instructions</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any specific instructions or details for the lab technician..."
                />
              </FormGroup>

              <ButtonGroup>
                <Button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </ModalBody>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default RequestLabTest;
