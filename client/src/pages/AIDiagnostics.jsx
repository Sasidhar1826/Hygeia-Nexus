import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaUpload,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`;

const DiagnosticsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing(3)};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const DiagnosticCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
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

const UploadArea = styled.div`
  border: 2px dashed ${(props) => props.theme.colors.background.card};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(4)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};
  margin-bottom: ${(props) => props.theme.spacing(2)};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary.main};
    background-color: ${(props) => props.theme.colors.background.card}30;
  }

  svg {
    font-size: 32px;
    color: ${(props) => props.theme.colors.primary.main};
    margin-bottom: ${(props) => props.theme.spacing(2)};
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

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};

  svg {
    font-size: 24px;
    color: ${(props) =>
      props.status === "success"
        ? props.theme.colors.status.success
        : props.status === "warning"
        ? props.theme.colors.status.warning
        : props.theme.colors.status.info};
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }
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

const AIDiagnostics = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSymptomChange = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);

      // Mock results
      setResults({
        status: "warning",
        title: "Possible Respiratory Infection",
        confidence: 78,
        details: [
          "Symptoms suggest possible upper respiratory infection",
          "Recommend further examination",
          "Consider chest X-ray to rule out pneumonia",
        ],
        recommendations: [
          "Rest and hydration",
          "Monitor temperature",
          "Schedule follow-up in 3 days if symptoms persist",
        ],
      });
    }, 2000);
  };

  return (
    <PageContainer>
      <h2>AI Diagnostic Tools</h2>
      <p>Use our AI-powered tools to get preliminary diagnostic insights.</p>

      <DiagnosticsGrid>
        <DiagnosticCard>
          <CardHeader>
            <FaBrain />
            <h3>Symptom Analyzer</h3>
          </CardHeader>

          <p>Select your symptoms for AI analysis:</p>

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
                <FaSpinner /> Analyzing...
              </>
            ) : (
              "Analyze Symptoms"
            )}
          </Button>

          {results && (
            <ResultCard
              status={results.status}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ResultHeader status={results.status}>
                {results.status === "success" ? (
                  <FaCheckCircle />
                ) : results.status === "warning" ? (
                  <FaExclamationTriangle />
                ) : (
                  <FaBrain />
                )}
                <h4>{results.title}</h4>
              </ResultHeader>

              <p>Confidence: {results.confidence}%</p>

              <div>
                <h5>Analysis:</h5>
                <ul>
                  {results.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5>Recommendations:</h5>
                <ul>
                  {results.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              <p style={{ fontStyle: "italic", marginTop: "16px" }}>
                Note: This is an AI-generated preliminary assessment and not a
                medical diagnosis. Please consult with a healthcare
                professional.
              </p>
            </ResultCard>
          )}
        </DiagnosticCard>

        <DiagnosticCard>
          <CardHeader>
            <FaUpload />
            <h3>Medical Image Analysis</h3>
          </CardHeader>

          <p>Upload a medical image for AI analysis:</p>

          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          <label htmlFor="image-upload">
            <UploadArea>
              <FaUpload />
              <p>Click or drag to upload an image</p>
              <span>Supports JPG, PNG, DICOM formats up to 10MB</span>
            </UploadArea>
          </label>

          {uploadedImage && (
            <div style={{ marginBottom: "16px", textAlign: "center" }}>
              <img
                src={uploadedImage}
                alt="Uploaded medical image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleAnalyze}
            disabled={!uploadedImage || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <FaSpinner /> Analyzing...
              </>
            ) : (
              "Analyze Image"
            )}
          </Button>
        </DiagnosticCard>
      </DiagnosticsGrid>
    </PageContainer>
  );
};

export default AIDiagnostics;
