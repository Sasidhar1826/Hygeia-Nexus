import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaTimesCircle,
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
  FaArrowRight,
  FaChartBar,
  FaFileAlt,
  FaNotesMedical,
  FaCheckCircle,
  FaPrint,
  FaHistory,
  FaFlask,
  FaFileMedical,
  FaPlus,
  FaComments,
  FaPaperPlane,
  FaInfoCircle,
} from "react-icons/fa";
import mockApi from "../../services/mockApi";

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${(props) => props.theme.spacing(2)};
`;

const ModalContent = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.large};
  width: 90%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(3)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.colors.background.paper};
  z-index: 10;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.text.primary};
  }

  svg {
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;

  svg {
    font-size: 2.5rem;
    color: ${(props) => props.theme.colors.primary.main};
    animation: spin 1.5s linear infinite;
    margin-bottom: ${(props) => props.theme.spacing(2)};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  h3 {
    margin-bottom: ${(props) => props.theme.spacing(2)};
    color: ${(props) => props.theme.colors.text.primary};
  }

  p {
    color: ${(props) => props.theme.colors.text.secondary};
    max-width: 400px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  max-width: 400px;
  height: 8px;
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: 4px;
  margin: ${(props) => props.theme.spacing(2)} 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: ${(props) => props.theme.colors.primary.main};
  transition: width 0.3s ease;
`;

const ModalBody = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(4)};
`;

const SummaryCard = styled.div`
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(3)};
  border-left: 4px solid ${(props) => props.theme.colors.primary.main};
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const DiagnosisList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const DiagnosisItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.border.main};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: ${(props) => props.theme.shadows.small};
  }
`;

const ConfidenceBadge = styled.div`
  background-color: ${(props) =>
    props.confidence >= 70
      ? props.theme.colors.success
      : props.confidence >= 40
      ? props.theme.colors.warning
      : props.theme.colors.status.error};
  color: white;
  border-radius: 20px;
  padding: ${(props) =>
    `${props.theme.spacing(0.5)} ${props.theme.spacing(2)}`};
  font-weight: 500;
  min-width: 65px;
  text-align: center;
`;

const DiagnosisTitle = styled.div`
  flex: 1;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

const DetailSection = styled.div`
  margin: ${(props) => props.theme.spacing(4)} 0;
`;

const FactorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const FactorItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};

  svg {
    min-width: 20px;
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const FactorWeight = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;

  .factor-label {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.text.secondary};
    margin-bottom: ${(props) => props.theme.spacing(0.5)};
  }

  .weight-bar {
    height: 8px;
    background-color: ${(props) => props.theme.colors.background.default};
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .weight-fill {
    position: absolute;
    height: 100%;
    width: ${(props) => props.$weight}%;
    background-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const FactorText = styled.p`
  flex: 1;
  margin: 0;
  color: ${(props) => props.theme.colors.text.primary};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(4)};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.colors.background.paper
      : props.theme.colors.primary.main};
  color: ${(props) =>
    props.variant === "secondary" ? props.theme.colors.text.primary : "white"};
  border: ${(props) =>
    props.variant === "secondary"
      ? `1px solid ${props.theme.colors.border.main}`
      : "none"};

  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary"
        ? props.theme.colors.background.default
        : props.theme.colors.primary.dark};
  }
`;

const Disclaimer = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-style: italic;
  margin-top: ${(props) => props.theme.spacing(4)};
  padding-top: ${(props) => props.theme.spacing(2)};
  border-top: 1px solid ${(props) => props.theme.colors.border.main};
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};
`;

const Tab = styled.button`
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(3)};
  background: none;
  border: none;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary.main
      : props.theme.colors.text.secondary};
  border-bottom: 2px solid
    ${(props) =>
      props.$active ? props.theme.colors.primary.main : "transparent"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const TabPanel = styled.div`
  display: ${(props) => (props.$active ? "block" : "none")};
`;

// Add this styled component for the spinner animation
const SpinnerIcon = styled(FaSpinner)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: spin 1.5s linear infinite;
`;

// Add new styled components for symptom selection
const SymptomSelector = styled.div`
  margin: ${(props) => props.theme.spacing(3)} 0;
`;

const SymptomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const SymptomChip = styled.div`
  background-color: ${(props) =>
    props.$selected
      ? props.theme.colors.primary.main
      : props.theme.colors.background.default};
  color: ${(props) =>
    props.$selected ? "white" : props.theme.colors.text.primary};
  border-radius: 20px;
  padding: ${(props) =>
    `${props.theme.spacing(0.5)} ${props.theme.spacing(2)}`};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid
    ${(props) =>
      props.$selected
        ? props.theme.colors.primary.main
        : props.theme.colors.border.main};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary.main};
    background-color: ${(props) =>
      props.$selected
        ? props.theme.colors.primary.main
        : `${props.theme.colors.primary.main}10`};
  }
`;

const AddSymptomInput = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(2)};

  input {
    flex: 1;
    padding: ${(props) => props.theme.spacing(1)};
    border-radius: ${(props) => props.theme.borderRadius.small};
    border: 1px solid ${(props) => props.theme.colors.border.main};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background-color: ${(props) => props.theme.colors.primary.main};
    color: white;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary.dark};
    }
  }
`;

// List of common symptoms to select from
const commonSymptoms = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Nausea",
  "Shortness of breath",
  "Dizziness",
  "Chest pain",
  "Abdominal pain",
  "Back pain",
  "Joint pain",
  "Sore throat",
  "Runny nose",
  "Muscle ache",
  "Insomnia",
  "Loss of appetite",
  "Weight loss",
  "Swelling",
  "Rash",
  "Vomiting",
  "Diarrhea",
  "Constipation",
  "Blurred vision",
  "Increased thirst",
  "Frequent urination",
];

// Add components for the chat interface
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid ${(props) => props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.default};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spacing(2)};
  border-top: 1px solid ${(props) => props.theme.colors.border.main};
  background-color: ${(props) => props.theme.colors.background.paper};
`;

const ChatInput = styled.input`
  flex: 1;
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin-right: ${(props) => props.theme.spacing(1)};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => `${props.theme.spacing(1)} ${props.theme.spacing(2)}`};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.background.default};
    color: ${(props) => props.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  max-width: 70%;
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) =>
    props.$sender === "user"
      ? props.theme.colors.primary.main
      : props.theme.colors.background.paper};
  color: ${(props) =>
    props.$sender === "user" ? "white" : props.theme.colors.text.primary};
  align-self: ${(props) =>
    props.$sender === "user" ? "flex-end" : "flex-start"};
  box-shadow: ${(props) => props.theme.shadows.small};

  p {
    margin: 0;
    white-space: pre-wrap;
  }
`;

const SmartDiagnosisModal = ({ isOpen, onClose, patientId, onViewHistory }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [diagnosisResults, setDiagnosisResults] = useState(null);
  const [activeTab, setActiveTab] = useState("symptoms");
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    if (isOpen && patientId) {
      // Reset state when modal opens
      setLoading(true);
      setProgress(0);
      setSelectedDiagnosis(null);
      setSelectedSymptoms([]);
      setError(null);

      // Fetch patient basic info
      fetchPatientBasicInfo();
    }
  }, [isOpen, patientId]);

  const fetchPatientBasicInfo = async () => {
    try {
      const patientData = await mockApi.getPatientById(patientId);
      setPatientData(patientData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setError("Failed to load patient information. Please try again.");
      setLoading(false);
    }
  };

  const handleToggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleAddCustomSymptom = () => {
    if (newSymptom.trim() && !selectedSymptoms.includes(newSymptom.trim())) {
      setSelectedSymptoms([...selectedSymptoms, newSymptom.trim()]);
      setNewSymptom("");
    }
  };

  const handleGenerateDiagnosis = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom to generate a diagnosis.");
      return;
    }

    setLoading(true);
    setProgress(0);
    setError(null);

    // Simulate the AI processing time with a progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          fetchDiagnosticResults();
          return 100;
        }
        return newProgress;
      });
    }, 400);

    return () => clearInterval(progressInterval);
  };

  const fetchDiagnosticResults = async () => {
    try {
      // Create request payload with symptoms and patient context
      const diagnosticRequest = {
        symptoms: selectedSymptoms,
        patientId,
        geminiApiKey: "AIzaSyDhRb7fLT6gV0zNUcQaZGDtwmnmYRjmZU0",
      };

      // Use the v2 API that was enhanced with support for Gemini
      const results = await mockApi.getAIDiagnosticSuggestionV2(
        patientId,
        diagnosticRequest
      );

      setDiagnosisResults(results);
      setSelectedDiagnosis(results.diagnoses[0]); // Select the first diagnosis by default
      setLoading(false);
      setActiveTab("overview");
    } catch (error) {
      console.error("Error fetching diagnostic suggestions:", error);
      setError("Failed to generate diagnostic suggestions. Please try again.");
      setLoading(false);
    }
  };

  const handleSaveDiagnosis = async () => {
    if (!diagnosisResults || !selectedDiagnosis) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Create a record containing the selected diagnosis and patient context
      const diagnosisRecord = {
        diagnosis: selectedDiagnosis,
        summary: diagnosisResults.summary,
        patientContext: diagnosisResults.patientContext,
        symptoms: selectedSymptoms,
        timestamp: new Date().toISOString(),
      };

      // Save to patient record using the mockApi
      const result = await mockApi.saveAIDiagnosticSuggestion(
        patientId,
        diagnosisRecord
      );

      console.log("Diagnosis saved successfully:", result);
      setSaveSuccess(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving diagnosis:", error);
      setError("Failed to save diagnosis to patient record.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrintReport = () => {
    // In a real implementation, this would generate a PDF report
    // For now, we'll just show the browser print dialog with the current content
    window.print();
  };

  // Add function to handle chat messages
  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    // Add user message to chat
    const userMessage = chatInput.trim();
    setChatMessages([...chatMessages, { sender: "user", text: userMessage }]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      // Generate context from diagnosis results
      let context = "";
      if (diagnosisResults) {
        context = `Based on the patient's symptoms (${selectedSymptoms.join(
          ", "
        )}), `;
        context += `the top diagnosis is ${diagnosisResults.diagnoses[0].name} `;
        context += `with ${diagnosisResults.diagnoses[0].confidence}% confidence. `;
      } else {
        context = `Based on the patient's symptoms (${selectedSymptoms.join(
          ", "
        )}), `;
      }

      // Generate prompt for Gemini
      const prompt = `
${context}

Previous conversation:
${chatMessages
  .map((msg) => `${msg.sender === "user" ? "Doctor" : "AI"}: ${msg.text}`)
  .join("\n")}

Doctor: ${userMessage}

Please respond to the doctor's question as a medical AI assistant. Keep your response professional, evidence-based, and concise. Only respond to the specific question or follow-up, without unnecessary explanations about your role or excessive medical disclaimers.
`;

      // Call Gemini API
      const response = await mockApi.callGeminiAPI(
        prompt,
        "AIzaSyDhRb7fLT6gV0zNUcQaZGDtwmnmYRjmZU0"
      );

      // Add AI response to chat
      setChatMessages([
        ...chatMessages,
        { sender: "user", text: userMessage },
        { sender: "ai", text: response },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add error message
      setChatMessages([
        ...chatMessages,
        { sender: "user", text: userMessage },
        {
          sender: "ai",
          text: "I apologize, but I'm unable to process your request at the moment. Please try again later.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Add function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={modalVariants}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <ModalContent variants={contentVariants}>
          <ModalHeader>
            <HeaderTitle>
              <FaBrain />
              <h2>Smart Diagnosis Assistant</h2>
            </HeaderTitle>
            <CloseButton onClick={onClose}>
              <FaTimesCircle />
            </CloseButton>
          </ModalHeader>

          {loading ? (
            <LoadingState>
              <SpinnerIcon />
              <h3>Analyzing Patient Data</h3>
              <p>
                AI is analyzing patient history, symptoms, lab results, and
                relevant medical knowledge to generate diagnostic suggestions.
              </p>
              <ProgressBar>
                <ProgressFill progress={progress} />
              </ProgressBar>
            </LoadingState>
          ) : error ? (
            <LoadingState>
              <FaExclamationTriangle style={{ color: "#EF4444" }} />
              <h3>Error</h3>
              <p>{error}</p>
              <Button
                onClick={() => {
                  setError(null);
                  if (diagnosisResults) {
                    setActiveTab("symptoms");
                  }
                }}
                style={{ marginTop: "16px" }}
              >
                Try Again
              </Button>
            </LoadingState>
          ) : (
            <ModalBody>
              <TabsContainer>
                <Tab
                  $active={activeTab === "symptoms"}
                  onClick={() => setActiveTab("symptoms")}
                >
                  <FaNotesMedical /> Symptoms
                </Tab>
                {diagnosisResults && (
                  <>
                    <Tab
                      $active={activeTab === "overview"}
                      onClick={() => setActiveTab("overview")}
                    >
                      <FaFileMedical /> Overview
                    </Tab>
                    <Tab
                      $active={activeTab === "context"}
                      onClick={() => setActiveTab("context")}
                    >
                      <FaInfoCircle /> Context
                    </Tab>
                    <Tab
                      $active={activeTab === "chat"}
                      onClick={() => setActiveTab("chat")}
                    >
                      <FaComments /> Ask AI
                    </Tab>
                  </>
                )}
              </TabsContainer>

              <ResultsContainer>
                <TabPanel $active={activeTab === "symptoms"}>
                  {patientData && (
                    <SummaryCard>
                      <SectionTitle>
                        <FaFileAlt /> Patient Information
                      </SectionTitle>
                      <p>
                        <strong>Name:</strong>{" "}
                        {patientData?.firstName ||
                          patientData?.name ||
                          "Unknown"}
                        {patientData?.lastName
                          ? ` ${patientData.lastName}`
                          : ""}
                        <br />
                        <strong>Age:</strong>{" "}
                        {patientData?.dateOfBirth || patientData?.birthDate
                          ? new Date().getFullYear() -
                            new Date(
                              patientData?.dateOfBirth || patientData?.birthDate
                            ).getFullYear()
                          : "Unknown"}
                        <br />
                        <strong>Gender:</strong>{" "}
                        {patientData?.gender || "Unknown"}
                        <br />
                        <strong>Blood Group:</strong>{" "}
                        {patientData?.bloodGroup || "Unknown"}
                      </p>
                    </SummaryCard>
                  )}

                  <SymptomSelector>
                    <SectionTitle>
                      <FaNotesMedical /> Select Symptoms
                    </SectionTitle>
                    <p>Select all symptoms the patient is experiencing:</p>

                    <SymptomList>
                      {commonSymptoms.map((symptom) => (
                        <SymptomChip
                          key={symptom}
                          $selected={selectedSymptoms.includes(symptom)}
                          onClick={() => handleToggleSymptom(symptom)}
                        >
                          {symptom}
                        </SymptomChip>
                      ))}
                    </SymptomList>

                    <AddSymptomInput>
                      <input
                        type="text"
                        placeholder="Add custom symptom"
                        value={newSymptom}
                        onChange={(e) => setNewSymptom(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAddCustomSymptom()
                        }
                      />
                      <button onClick={handleAddCustomSymptom}>
                        <FaPlus />
                      </button>
                    </AddSymptomInput>

                    {selectedSymptoms.length > 0 && (
                      <div style={{ marginTop: "20px" }}>
                        <SectionTitle>Selected Symptoms</SectionTitle>
                        <ul>
                          {selectedSymptoms.map((symptom) => (
                            <li key={symptom}>{symptom}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      onClick={handleGenerateDiagnosis}
                      style={{ marginTop: "20px" }}
                      disabled={selectedSymptoms.length === 0}
                    >
                      Generate Diagnosis
                    </Button>
                  </SymptomSelector>
                </TabPanel>

                {diagnosisResults && (
                  <>
                    <TabPanel $active={activeTab === "overview"}>
                      <SummaryCard>
                        <SectionTitle>
                          <FaFileAlt /> Summary
                        </SectionTitle>
                        <p>{diagnosisResults.summary}</p>
                      </SummaryCard>

                      <SectionTitle>
                        <FaChartBar /> Potential Diagnoses
                      </SectionTitle>
                      <DiagnosisList>
                        {diagnosisResults.diagnoses.map((diagnosis) => (
                          <DiagnosisItem
                            key={diagnosis.id}
                            onClick={() => setSelectedDiagnosis(diagnosis)}
                            style={{
                              borderColor:
                                selectedDiagnosis?.id === diagnosis.id
                                  ? "currentColor"
                                  : undefined,
                              borderLeftWidth:
                                selectedDiagnosis?.id === diagnosis.id
                                  ? "4px"
                                  : "1px",
                            }}
                          >
                            <ConfidenceBadge confidence={diagnosis.confidence}>
                              {diagnosis.confidence}%
                            </ConfidenceBadge>
                            <DiagnosisTitle>{diagnosis.name}</DiagnosisTitle>
                            <FaArrowRight />
                          </DiagnosisItem>
                        ))}
                      </DiagnosisList>
                    </TabPanel>

                    <TabPanel $active={activeTab === "context"}>
                      <DetailSection>
                        <SectionTitle>
                          <FaNotesMedical /> Selected Symptoms
                        </SectionTitle>
                        <ul>
                          {selectedSymptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                          ))}
                        </ul>
                      </DetailSection>

                      <DetailSection>
                        <SectionTitle>
                          <FaFileAlt /> Relevant Medical History
                        </SectionTitle>
                        {diagnosisResults?.patientContext?.relevantHistory &&
                        diagnosisResults.patientContext.relevantHistory.length >
                          0 ? (
                          <ul>
                            {diagnosisResults.patientContext.relevantHistory.map(
                              (history, index) => (
                                <li key={index}>{history}</li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p>No relevant medical history found</p>
                        )}
                      </DetailSection>

                      <DetailSection>
                        <SectionTitle>
                          <FaFlask /> Recent Lab Results
                        </SectionTitle>
                        {diagnosisResults?.patientContext?.recentLabResults &&
                        diagnosisResults.patientContext.recentLabResults
                          .length > 0 ? (
                          <ul>
                            {diagnosisResults.patientContext.recentLabResults.map(
                              (result, index) => (
                                <li key={index}>{result}</li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p>No recent lab results found</p>
                        )}
                      </DetailSection>

                      <DetailSection>
                        <SectionTitle>
                          <FaFileMedical /> Current Medications
                        </SectionTitle>
                        {diagnosisResults?.patientContext?.currentMedications &&
                        diagnosisResults.patientContext.currentMedications
                          .length > 0 ? (
                          <ul>
                            {diagnosisResults.patientContext.currentMedications.map(
                              (med, index) => (
                                <li key={index}>{med}</li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p>No current medications found</p>
                        )}
                      </DetailSection>
                    </TabPanel>
                  </>
                )}

                {/* New Chat Tab Panel */}
                {diagnosisResults && (
                  <TabPanel $active={activeTab === "chat"}>
                    <SummaryCard>
                      <SectionTitle>
                        <FaComments /> AI Medical Assistant
                      </SectionTitle>
                      <p>
                        Ask follow-up questions or seek clarification about the
                        diagnosis, treatment options, or medical information.
                        The AI assistant will respond based on the diagnostic
                        context.
                      </p>
                    </SummaryCard>

                    <ChatContainer>
                      <ChatMessages>
                        {chatMessages.length === 0 ? (
                          <Message $sender="ai">
                            <p>
                              Hello, I'm your AI medical assistant. I can help
                              answer questions about the diagnosis, symptoms,
                              potential treatments, or provide additional
                              medical information. What would you like to know?
                            </p>
                          </Message>
                        ) : (
                          chatMessages.map((message, index) => (
                            <Message key={index} $sender={message.sender}>
                              <p>{message.text}</p>
                            </Message>
                          ))
                        )}
                        {isChatLoading && (
                          <Message $sender="ai">
                            <p>
                              <SpinnerIcon
                                style={{ fontSize: "1rem", marginRight: "8px" }}
                              />
                              Thinking...
                            </p>
                          </Message>
                        )}
                      </ChatMessages>
                      <ChatInputContainer>
                        <ChatInput
                          type="text"
                          placeholder="Type your medical question here..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          disabled={isChatLoading}
                        />
                        <SendButton
                          onClick={handleSendMessage}
                          disabled={!chatInput.trim() || isChatLoading}
                        >
                          {isChatLoading ? <SpinnerIcon /> : <FaPaperPlane />}
                        </SendButton>
                      </ChatInputContainer>
                    </ChatContainer>
                  </TabPanel>
                )}

                <ActionButtons>
                  <Button variant="secondary" onClick={onClose}>
                    Close
                  </Button>
                  {onViewHistory && (
                    <Button
                      variant="secondary"
                      onClick={onViewHistory}
                      style={{ marginRight: "auto" }}
                    >
                      <FaHistory /> View History
                    </Button>
                  )}
                  {diagnosisResults && (
                    <>
                      <Button
                        onClick={handleSaveDiagnosis}
                        disabled={isSaving || !diagnosisResults}
                      >
                        {isSaving ? (
                          <>
                            <SpinnerIcon /> Saving...
                          </>
                        ) : saveSuccess ? (
                          <>
                            <FaCheckCircle style={{ color: "#10B981" }} />{" "}
                            Saved!
                          </>
                        ) : (
                          <>Save to Patient Record</>
                        )}
                      </Button>
                      <Button onClick={handlePrintReport}>
                        <FaPrint /> Print Report
                      </Button>
                    </>
                  )}
                </ActionButtons>

                <Disclaimer>
                  Note: This AI-generated diagnostic suggestion is meant to
                  assist healthcare professionals and should not replace
                  clinical judgment. Always consider the full clinical context
                  and use your professional expertise when making diagnoses.
                </Disclaimer>
              </ResultsContainer>
            </ModalBody>
          )}
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default SmartDiagnosisModal;
