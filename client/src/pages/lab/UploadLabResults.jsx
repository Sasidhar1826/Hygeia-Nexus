import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUpload,
  FaUser,
  FaFileMedical,
  FaVial,
  FaCheck,
} from "react-icons/fa";
import PageTransition from "../../components/animations/PageTransition";
import AnimationContainer from "../../components/animations/AnimationContainer";
import { useAuth } from "../../context/AuthContext";
import mockAuthService from "../../services/mockApi";

const PageContainer = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
`;

const Header = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: ${(props) => props.theme.shadows.small};
  max-width: 800px;
  margin: 0 auto;
`;

const FormSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(4)};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.background.default};
  color: ${(props) => props.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.main + "30"};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.background.default};
  color: ${(props) => props.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.main + "30"};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.background.default};
  color: ${(props) => props.theme.colors.text.primary};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.main + "30"};
  }
`;

const Row = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
`;

const ResultItemContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(2)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) => props.theme.colors.background.default};
`;

const ResultRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(1)};

  &:last-child {
    margin-bottom: 0;
  }
`;

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border: 1px dashed ${(props) => props.theme.colors.primary.main};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary.main};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.main + "10"};
  }
`;

const RemoveButton = styled.button`
  padding: ${(props) => props.theme.spacing(0.5)};
  background-color: ${(props) => props.theme.colors.status.error + "10"};
  color: ${(props) => props.theme.colors.status.error};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.status.error + "20"};
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.spacing(4)};
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${(props) => props.theme.spacing(4)};
`;

const SuccessTitle = styled.h2`
  color: ${(props) => props.theme.colors.status.success};
  font-size: 1.3rem;
  margin: ${(props) => props.theme.spacing(2)} 0;
`;

const SuccessText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const UploadLabResults = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [reportType, setReportType] = useState("Blood Test");
  const [notes, setNotes] = useState("");
  const [results, setResults] = useState([
    { parameter: "", value: "", unit: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const addResultItem = () => {
    setResults([...results, { parameter: "", value: "", unit: "" }]);
  };

  const removeResultItem = (index) => {
    const updatedResults = [...results];
    updatedResults.splice(index, 1);
    setResults(updatedResults);
  };

  const handleResultChange = (index, field, value) => {
    const updatedResults = [...results];
    updatedResults[index][field] = value;
    setResults(updatedResults);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert results array to object format for the API
      const resultsObject = {};
      results.forEach((item) => {
        if (item.parameter) {
          resultsObject[item.parameter] = `${item.value} ${item.unit}`;
        }
      });

      // Format data for API
      const reportData = {
        patient: selectedPatient,
        technician: user._id,
        reportType,
        notes,
        results: resultsObject,
        status: "completed",
      };

      // Call the API to upload the report
      await mockAuthService.uploadLabReport(reportData);

      // Show success message
      setSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setSelectedPatient("");
        setReportType("Blood Test");
        setNotes("");
        setResults([{ parameter: "", value: "", unit: "" }]);
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error uploading lab report:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <PageTransition>
        <PageContainer>
          <FormContainer>
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaCheck size={50} color="#4CAF50" />
              <SuccessTitle>Lab Report Uploaded Successfully!</SuccessTitle>
              <SuccessText>
                The lab report has been successfully uploaded and is now
                available in the system.
              </SuccessText>
              <AnimationContainer type="success" height="200px" />
            </SuccessMessage>
          </FormContainer>
        </PageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageContainer>
        <Header>
          <Title>Upload Lab Results</Title>
          <Subtitle>
            Complete the form below to upload new lab test results for a patient
          </Subtitle>
        </Header>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>
                <FaUser />
                Patient Information
              </SectionTitle>
              <FormGroup>
                <Label htmlFor="patient">Select Patient</Label>
                <Select
                  id="patient"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  required
                >
                  <option value="">-- Select Patient --</option>
                  <option value="3">John Smith</option>
                </Select>
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <FaFileMedical />
                Report Details
              </SectionTitle>
              <FormGroup>
                <Label htmlFor="reportType">Test Type</Label>
                <Select
                  id="reportType"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  required
                >
                  <option value="Blood Test">Blood Test</option>
                  <option value="Urine Analysis">Urine Analysis</option>
                  <option value="X-Ray">X-Ray</option>
                  <option value="CT Scan">CT Scan</option>
                  <option value="MRI">MRI</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes about the test..."
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <FaVial />
                Test Results
              </SectionTitle>

              {results.map((item, index) => (
                <ResultItemContainer key={index}>
                  <ResultRow>
                    <Column>
                      <Label>Parameter</Label>
                      <Input
                        type="text"
                        value={item.parameter}
                        onChange={(e) =>
                          handleResultChange(index, "parameter", e.target.value)
                        }
                        placeholder="e.g., Hemoglobin"
                        required
                      />
                    </Column>
                    <Column>
                      <Label>Value</Label>
                      <Input
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                          handleResultChange(index, "value", e.target.value)
                        }
                        placeholder="e.g., 14.5"
                        required
                      />
                    </Column>
                    <Column>
                      <Label>Unit</Label>
                      <Input
                        type="text"
                        value={item.unit}
                        onChange={(e) =>
                          handleResultChange(index, "unit", e.target.value)
                        }
                        placeholder="e.g., g/dL"
                        required
                      />
                    </Column>
                  </ResultRow>

                  {results.length > 1 && (
                    <div style={{ textAlign: "right" }}>
                      <RemoveButton
                        type="button"
                        onClick={() => removeResultItem(index)}
                      >
                        Remove
                      </RemoveButton>
                    </div>
                  )}
                </ResultItemContainer>
              ))}

              <AddButton type="button" onClick={addResultItem}>
                + Add Another Result
              </AddButton>
            </FormSection>

            <ButtonContainer>
              <SubmitButton
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <FaUpload /> Upload Results
                  </>
                )}
              </SubmitButton>
            </ButtonContainer>
          </form>
        </FormContainer>
      </PageContainer>
    </PageTransition>
  );
};

export default UploadLabResults;
