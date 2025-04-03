import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaListAlt,
  FaRobot,
  FaPaperPlane,
  FaInfoCircle,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import mockApi from "../services/mockApi";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`;

const MainCardContainer = styled(Card)`
  position: relative;
  padding: ${(props) => props.theme.spacing(3)};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};

  svg {
    font-size: 24px;
    color: ${(props) => props.theme.colors.primary.main};
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
`;

const ResultCard = styled(Card)`
  margin-top: ${(props) => props.theme.spacing(3)};
  border-left: 4px solid
    ${(props) =>
      props.status === "success"
        ? props.theme.colors.status.success
        : props.status === "warning"
        ? props.theme.colors.status.warning
        : props.theme.colors.status.info};
`;

const SymptomsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const SymptomItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  input {
    accent-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const SymptomButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(1)};
  position: absolute;
  top: ${(props) => props.theme.spacing(1)};
  right: ${(props) => props.theme.spacing(1)};
  padding: ${(props) =>
    `${props.theme.spacing(0.75)} ${props.theme.spacing(1.5)}`};
  font-size: 0.85rem;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  max-height: 400px;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing(1)};
`;

const MessageBubble = styled.div`
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  max-width: 80%;
  word-break: break-word;
  white-space: pre-line;

  ${(props) =>
    props.isUser
      ? `
    align-self: flex-end;
    background-color: ${props.theme.colors.primary.main};
    color: white;
  `
      : `
    align-self: flex-start;
    background-color: ${props.theme.colors.background.card};
    border-left: 3px solid ${props.theme.colors.primary.main};
  `}

  p {
    margin: ${(props) => props.theme.spacing(0.5)} 0;
  }

  ul,
  ol {
    margin: ${(props) => props.theme.spacing(0.5)} 0;
    padding-left: ${(props) => props.theme.spacing(2)};
  }

  strong,
  b {
    font-weight: 600;
  }
`;

const ChatInputContainer = styled.div`
  display: flex;
  margin-top: auto;
  gap: ${(props) => props.theme.spacing(1)};
`;

const ChatInput = styled(Input)`
  flex: 1;
`;

const SendButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
`;

const MessageSource = styled.div`
  font-size: 12px;
  margin-top: ${(props) => props.theme.spacing(0.5)};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ApiAlert = styled.div`
  background-color: ${(props) =>
    props.success
      ? props.theme.colors.status.success + "20"
      : props.theme.colors.status.warning + "20"};
  border-left: 3px solid
    ${(props) =>
      props.success
        ? props.theme.colors.status.success
        : props.theme.colors.status.warning};
  padding: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  display: ${(props) => (props.visible ? "flex" : "none")};
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  svg {
    color: ${(props) =>
      props.success
        ? props.theme.colors.status.success
        : props.theme.colors.status.warning};
    font-size: 18px;
  }
`;

// Add a spinning animation
const SpinningIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const AIDiagnostics = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [showSymptomSelector, setShowSymptomSelector] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      isUser: false,
      text: "Hello! I'm your medical assistant. How can I help you today? You can ask me about symptoms, general health questions, or medical information. You can also click the symptom selector button to analyze specific symptoms.",
      source: "AI Medical Assistant",
    },
  ]);
  const [chatMessage, setChatMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({
    checked: false,
    working: false,
    message: "",
  });
  const messagesEndRef = useRef(null);

  const symptoms = [
    "Fever",
    "Cough",
    "Headache",
    "Fatigue",
    "Nausea",
    "Dizziness",
    "Shortness of breath",
    "Chest pain",
    "Abdominal pain",
    "Joint pain",
    "Rash",
    "Sore throat",
  ];

  // API check on component mount
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        console.log(
          "Environment API key check:",
          apiKey ? "Found key" : "No key found"
        );

        if (!apiKey) {
          setApiStatus({
            checked: true,
            working: false,
            message: "No Gemini API key found in environment variables",
          });
          return;
        }

        // Simple validation - make sure it has the correct format
        if (!apiKey.startsWith("AIza")) {
          setApiStatus({
            checked: true,
            working: false,
            message:
              "Invalid Gemini API key format. Keys should start with 'AIza'",
          });
          return;
        }

        console.log(
          "Testing Gemini API connection with key:",
          apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 5)
        );

        // Send a simple test message to the Gemini API
        const testResult = await mockApi.getMedicalChatResponse(
          "Hello, this is a test message to verify the API connection is working correctly.",
          []
        );

        if (testResult && !testResult.error) {
          console.log("API test successful");
          setApiStatus({
            checked: true,
            working: true,
            message: "Gemini API connection successful",
          });
        } else {
          console.log("API test failed with error");
          setApiStatus({
            checked: true,
            working: false,
            message: "Gemini API returned an error. Check console for details",
          });
        }
      } catch (error) {
        console.error("API key validation error:", error);
        setApiStatus({
          checked: true,
          working: false,
          message: `Gemini API key issue: ${error.message}`,
        });
      }
    };

    checkApiKey();
  }, []);

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleSymptomChange = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsAnalyzing(true);

    try {
      // Add the symptom list to chat as user message
      const symptomsText = selectedSymptoms.join(", ");
      const userMessage = {
        isUser: true,
        text: `I'm experiencing these symptoms: ${symptomsText}`,
      };

      setChatHistory((prev) => [...prev, userMessage]);

      // Get analysis from mockApi
      const analysisResults = await mockApi.analyzeSymptomsAI(selectedSymptoms);

      // Save the results
      setResults(analysisResults);

      // Format analysis as assistant response
      const formattedDetails = analysisResults.details.join("\n• ");
      const formattedRecommendations =
        analysisResults.recommendations.join("\n• ");

      const analysisResponse = {
        isUser: false,
        text: `Based on the symptoms you reported (${symptomsText}), here's my analysis:\n\n**${analysisResults.title}** (confidence: ${analysisResults.confidence}%)\n\n**Analysis:**\n• ${formattedDetails}\n\n**Recommendations:**\n• ${formattedRecommendations}\n\nThis is an automated analysis and not a medical diagnosis. Please consult a healthcare professional for proper evaluation.`,
        source: "AI Medical Assistant",
      };

      setChatHistory((prev) => [...prev, analysisResponse]);

      // Reset symptom selector
      setShowSymptomSelector(false);

      // Clear selected symptoms after analysis
      setSelectedSymptoms([]);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);

      // Add error message to chat
      setChatHistory((prev) => [
        ...prev,
        {
          isUser: false,
          text: "I'm sorry, I encountered an error analyzing your symptoms. Please try again later.",
          source: "AI Medical Assistant",
          error: true,
        },
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleSymptomSelector = () => {
    setShowSymptomSelector(!showSymptomSelector);
  };

  // Process text to handle markdown-like formatting
  const formatMessageText = (text) => {
    // Replace ** with <strong> tags for bold text
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Replace bullet points
      .replace(/^•\s(.+)$/gm, "<li>$1</li>")
      // Replace numbered lists
      .replace(/^\d+\.\s(.+)$/gm, "<li>$1</li>");

    // Wrap lists in <ul> tags when there are list items
    if (formattedText.includes("<li>")) {
      formattedText = formattedText.replace(
        /(<li>.*?<\/li>)\s*(<li>.*?<\/li>)/gs,
        "<ul>$1$2</ul>"
      );
    }

    // Replace newlines with <br>
    formattedText = formattedText
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");

    return formattedText;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    // Add user message to chat
    const userMessage = { isUser: true, text: chatMessage };
    setChatHistory((prev) => [...prev, userMessage]);
    setChatMessage("");
    setIsLoading(true);

    try {
      // Get response from mockApi - this will use Gemini API if available
      const response = await mockApi.getMedicalChatResponse(
        chatMessage,
        chatHistory
      );

      // Add AI response to chat
      setChatHistory((prev) => [...prev, response]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          isUser: false,
          text: "I'm sorry, I encountered an error processing your request. Please try again later.",
          source: "AI Medical Assistant",
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <h2>AI Medical Assistant</h2>
      <p>
        Chat with our AI assistant about health concerns and receive
        personalized insights.
      </p>

      {apiStatus.checked && (
        <ApiAlert visible success={apiStatus.working}>
          {apiStatus.working ? (
            <>
              <FaCheckCircle /> {apiStatus.message}
            </>
          ) : (
            <>
              <FaInfoCircle /> {apiStatus.message} Falling back to mock
              responses.
            </>
          )}
        </ApiAlert>
      )}

      <MainCardContainer>
        <SymptomButton variant="outlined" onClick={toggleSymptomSelector}>
          <FaListAlt />{" "}
          {showSymptomSelector
            ? "Hide Symptom Selector"
            : "Show Symptom Selector"}
        </SymptomButton>

        <CardHeader>
          <FaRobot />
          <h3>Medical Chat Assistant</h3>
        </CardHeader>

        {showSymptomSelector && (
          <div>
            <p>Select symptoms for analysis:</p>

            <SymptomsList>
              {symptoms.map((symptom) => (
                <SymptomItem key={symptom}>
                  <input
                    type="checkbox"
                    id={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomChange(symptom)}
                  />
                  <label htmlFor={symptom}>{symptom}</label>
                </SymptomItem>
              ))}
            </SymptomsList>

            <Button
              variant="primary"
              onClick={handleAnalyze}
              disabled={selectedSymptoms.length === 0 || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <SpinningIcon /> Analyzing...
                </>
              ) : (
                "Analyze Symptoms"
              )}
            </Button>
          </div>
        )}

        <ChatContainer>
          <MessagesContainer>
            {chatHistory.map((message, index) => (
              <MessageBubble key={index} isUser={message.isUser}>
                {message.isUser ? (
                  message.text
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatMessageText(message.text),
                    }}
                  />
                )}
                {!message.isUser && message.source && (
                  <MessageSource>{message.source}</MessageSource>
                )}
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <ChatInputContainer>
            <ChatInput
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your health question..."
              disabled={isLoading}
            />
            <SendButton
              variant="primary"
              onClick={handleSendMessage}
              disabled={isLoading || !chatMessage.trim()}
            >
              {isLoading ? <SpinningIcon /> : <FaPaperPlane />}
            </SendButton>
          </ChatInputContainer>

          <p
            style={{
              fontStyle: "italic",
              fontSize: "12px",
              marginTop: "16px",
            }}
          >
            Note: This AI assistant provides general information only and is not
            a substitute for professional medical advice, diagnosis, or
            treatment.
          </p>
        </ChatContainer>
      </MainCardContainer>
    </PageContainer>
  );
};

export default AIDiagnostics;
