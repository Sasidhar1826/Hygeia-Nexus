import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUpload,
  FaUser,
  FaFileMedical,
  FaVial,
  FaCheck,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import PageTransition from "../../components/animations/PageTransition";
import AnimationContainer from "../../components/animations/AnimationContainer";
import { useAuth } from "../../context/AuthContext";
import mockAuthService from "../../services/mockApi";
import { useLocation, useNavigate } from "react-router-dom";

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

const ResultItem = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(2)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) => props.theme.colors.background.default};
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  align-items: flex-end;
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

const Button = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  background-color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.colors.background.default
      : props.theme.colors.primary.main};
  color: ${(props) =>
    props.variant === "secondary" ? props.theme.colors.text.primary : "white"};
  border: ${(props) =>
    props.variant === "secondary"
      ? `1px solid ${props.theme.colors.border}`
      : "none"};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary"
        ? props.theme.colors.background.card
        : props.theme.colors.primary.light};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.text.disabled};
    cursor: not-allowed;
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
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  const [patients, setPatients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [reportType, setReportType] = useState("Blood Test");
  const [notes, setNotes] = useState("");
  const [results, setResults] = useState([
    { parameter: "", value: "", unit: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch patients and lab orders
    const fetchData = async () => {
      try {
        setInitialLoading(true);

        // Get the list of patients for the dropdown
        const patientsData = await mockAuthService.getPatients();
        setPatients(patientsData);

        // Get lab orders for the current technician
        const ordersData = await mockAuthService.getLabOrders({
          technician: user._id,
          status: "in_progress",
        });
        setOrders(ordersData);

        // If an orderId is provided in the URL, select it
        if (orderId) {
          const order = ordersData.find((o) => o._id === orderId);
          if (order) {
            setSelectedOrder(order);
            setSelectedPatient(order.patient._id);
            setReportType(order.testType);
            setNotes(order.notes || "");

            // Use the updateResultsForTestType function to set appropriate fields
            updateResultsForTestType(order.testType);
          }
        } else {
          // If no order is selected, initialize form fields based on default test type
          updateResultsForTestType("Blood Test"); // Default to Blood Test
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [orderId, user._id]);

  const addResultItem = () => {
    setResults([...results, { parameter: "", value: "", unit: "" }]);
  };

  const removeResultItem = (index) => {
    const updatedResults = [...results];
    updatedResults.splice(index, 1);
    setResults(updatedResults);
  };

  // Function to get suggested parameters based on test type
  const getSuggestedParameters = () => {
    if (reportType === "Blood Test") {
      return [
        "Hemoglobin",
        "White Blood Cells",
        "Red Blood Cells",
        "Platelets",
        "Glucose",
        "Cholesterol",
        "Triglycerides",
        "HDL",
        "LDL",
        "Sodium",
        "Potassium",
        "Chloride",
      ];
    } else if (reportType === "Urine Analysis") {
      return [
        "pH",
        "Specific Gravity",
        "Glucose",
        "Protein",
        "Ketones",
        "Nitrites",
        "Leukocytes",
        "Blood",
      ];
    } else if (
      reportType === "X-Ray" ||
      reportType === "CT Scan" ||
      reportType === "MRI"
    ) {
      return ["Region", "Findings", "Impression", "Recommendations"];
    }
    return [];
  };

  // Function to get suggested units based on parameter
  const getSuggestedUnit = (parameter) => {
    const unitMap = {
      // Blood Test units
      Hemoglobin: "g/dL",
      "White Blood Cells": "thousand/μL",
      "Red Blood Cells": "million/μL",
      Platelets: "thousand/μL",
      Glucose: "mg/dL",
      Cholesterol: "mg/dL",
      Triglycerides: "mg/dL",
      HDL: "mg/dL",
      LDL: "mg/dL",
      Sodium: "mEq/L",
      Potassium: "mEq/L",
      Chloride: "mEq/L",

      // Urine Analysis units
      "Specific Gravity": "",
      Glucose: "mg/dL",
      Protein: "mg/dL",
      Ketones: "mg/dL",
    };

    return unitMap[parameter] || "";
  };

  // Modify handleResultChange to auto-suggest unit when parameter changes
  const handleResultChange = (index, field, value) => {
    const updatedResults = [...results];
    updatedResults[index][field] = value;

    // If the parameter field changed, suggest a unit
    if (field === "parameter") {
      updatedResults[index].unit = getSuggestedUnit(value);
    }

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
        // Link to the order if one was selected
        orderId: selectedOrder ? selectedOrder._id : null,
        // Include doctor information from the selected order if available
        doctor: selectedOrder?.doctor?._id || null,
      };

      console.log("Uploading lab report with data:", reportData);

      // Call the API to upload the report
      const uploadedReport = await mockAuthService.uploadLabReport(reportData);

      // If this is linked to an order, update the order status and link the report
      if (selectedOrder) {
        console.log(
          `Updating lab order ${selectedOrder._id} with report ID ${uploadedReport._id}`
        );
        await mockAuthService.updateLabOrder(selectedOrder._id, {
          status: "completed",
          reportId: uploadedReport._id,
          completedDate: new Date().toISOString(),
        });
      }

      // Show success message
      setSuccess(true);

      // Reset form after success
      setTimeout(() => {
        navigate("/dashboard/view-lab-orders");
      }, 3000);
    } catch (error) {
      console.error("Error uploading lab report:", error);
      alert(`Failed to upload report: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const updateResultsForTestType = (testType) => {
    console.log("Updating results for test type:", testType);

    // Set default parameters based on test type
    if (testType === "Blood Test") {
      setResults([
        { parameter: "Hemoglobin", value: "", unit: "g/dL" },
        { parameter: "White Blood Cells", value: "", unit: "thousand/μL" },
        { parameter: "Platelets", value: "", unit: "thousand/μL" },
        { parameter: "Glucose", value: "", unit: "mg/dL" },
      ]);
    } else if (testType === "Urine Analysis") {
      setResults([
        { parameter: "pH", value: "", unit: "" },
        { parameter: "Specific Gravity", value: "", unit: "" },
        { parameter: "Glucose", value: "", unit: "mg/dL" },
        { parameter: "Protein", value: "", unit: "mg/dL" },
      ]);
    } else if (testType === "X-Ray") {
      setResults([
        { parameter: "Findings", value: "", unit: "" },
        { parameter: "Impression", value: "", unit: "" },
      ]);
    } else if (testType === "CT Scan") {
      setResults([
        { parameter: "Region", value: "", unit: "" },
        { parameter: "Findings", value: "", unit: "" },
        { parameter: "Impression", value: "", unit: "" },
      ]);
    } else if (testType === "MRI") {
      setResults([
        { parameter: "Region", value: "", unit: "" },
        { parameter: "Findings", value: "", unit: "" },
        { parameter: "Impression", value: "", unit: "" },
      ]);
    } else {
      // Default to empty result if test type is not recognized
      setResults([{ parameter: "", value: "", unit: "" }]);
    }
  };

  if (initialLoading) {
    return (
      <PageTransition>
        <AnimationContainer type="loading" height="300px" />
      </PageTransition>
    );
  }

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
            Complete the form below to upload new lab test results. These
            results will be accessible to the patient and their doctor through
            the patient records.
          </Subtitle>
        </Header>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>
                <FaUser />
                Patient Information
              </SectionTitle>

              {selectedOrder ? (
                // When we have a selected order, show patient and doctor info directly
                <>
                  <div style={{ marginBottom: "1rem" }}>
                    <Label>Patient</Label>
                    <div
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {selectedOrder.patient?.name || "Unknown Patient"}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <Label>Requested By</Label>
                    <div
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {selectedOrder.doctor?.name || "Unknown Doctor"}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <Label>Date Requested</Label>
                    <div
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {new Date(selectedOrder.requestedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </>
              ) : (
                // When no order is selected, show the dropdown for manual selection
                <>
                  <FormGroup>
                    <Label htmlFor="patient">Patient</Label>
                    <Select
                      id="patient"
                      value={selectedPatient}
                      onChange={(e) => setSelectedPatient(e.target.value)}
                      required
                    >
                      <option value="">-- Select Patient --</option>
                      {patients.map((patient) => (
                        <option key={patient._id} value={patient._id}>
                          {patient.name}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>

                  {orders.length > 0 && (
                    <FormGroup>
                      <Label htmlFor="order">Lab Order (Optional)</Label>
                      <Select
                        id="order"
                        value={selectedOrder?._id || ""}
                        onChange={(e) => {
                          const order = orders.find(
                            (o) => o._id === e.target.value
                          );
                          setSelectedOrder(order || null);
                          if (order) {
                            setSelectedPatient(order.patient._id);
                            setReportType(order.testType);
                            setNotes(order.notes || "");

                            // Use the updateResultsForTestType function to set appropriate fields
                            updateResultsForTestType(order.testType);
                          }
                        }}
                      >
                        <option value="">-- Select Order --</option>
                        {orders.map((order) => (
                          <option key={order._id} value={order._id}>
                            {order.testType} for{" "}
                            {order.patient?.name || "Unknown Patient"}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>
                  )}
                </>
              )}
            </FormSection>

            <FormSection>
              <SectionTitle>
                <FaFileMedical />
                Report Details
              </SectionTitle>

              {selectedOrder ? (
                // When we have a selected order, show test type directly
                <div style={{ marginBottom: "1rem" }}>
                  <Label>Test Type</Label>
                  <div
                    style={{
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {reportType}
                  </div>
                </div>
              ) : (
                // When no order is selected, show the dropdown for selection
                <FormGroup>
                  <Label htmlFor="reportType">Test Type</Label>
                  <Select
                    id="reportType"
                    value={reportType}
                    onChange={(e) => {
                      const newTestType = e.target.value;
                      setReportType(newTestType);

                      // Update the results fields based on the selected test type
                      updateResultsForTestType(newTestType);
                    }}
                    required
                  >
                    <option value="Blood Test">Blood Test</option>
                    <option value="Urine Analysis">Urine Analysis</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="MRI">MRI</option>
                  </Select>
                </FormGroup>
              )}

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

              <div
                style={{
                  marginBottom: "16px",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                <p>
                  Enter test parameters and values based on the selected test
                  type. The system suggests commonly used parameters for{" "}
                  {reportType}. You can select from the suggestions or enter
                  custom parameters.
                </p>
              </div>

              {results.map((result, index) => (
                <ResultItem key={index}>
                  <FormGroup style={{ flex: 2 }}>
                    <Label htmlFor={`parameter-${index}`}>Parameter</Label>
                    <div style={{ position: "relative" }}>
                      <Input
                        id={`parameter-${index}`}
                        value={result.parameter}
                        onChange={(e) =>
                          handleResultChange(index, "parameter", e.target.value)
                        }
                        placeholder="e.g. Hemoglobin"
                        list={`parameters-list-${index}`}
                        required
                      />
                      <datalist id={`parameters-list-${index}`}>
                        {getSuggestedParameters().map((param, i) => (
                          <option key={i} value={param} />
                        ))}
                      </datalist>
                    </div>
                  </FormGroup>
                  <FormGroup style={{ flex: 1 }}>
                    <Label htmlFor={`value-${index}`}>Value</Label>
                    <Input
                      id={`value-${index}`}
                      value={result.value}
                      onChange={(e) =>
                        handleResultChange(index, "value", e.target.value)
                      }
                      placeholder="14.5"
                      required
                    />
                  </FormGroup>
                  <FormGroup style={{ flex: 1 }}>
                    <Label htmlFor={`unit-${index}`}>Unit</Label>
                    <Input
                      id={`unit-${index}`}
                      value={result.unit}
                      onChange={(e) =>
                        handleResultChange(index, "unit", e.target.value)
                      }
                      placeholder="g/dL"
                    />
                  </FormGroup>
                  {results.length > 1 && (
                    <RemoveButton
                      type="button"
                      onClick={() => removeResultItem(index)}
                    >
                      <FaTimes />
                    </RemoveButton>
                  )}
                </ResultItem>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={addResultItem}
                style={{ marginTop: "1rem" }}
              >
                <FaPlus /> Add Parameter
              </Button>
            </FormSection>

            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "#e3f2fd",
                borderRadius: "4px",
                fontSize: "0.9rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <FaUser style={{ marginRight: "0.5rem", color: "#2196f3" }} />
                <strong>Important:</strong>
              </div>
              <p style={{ margin: "0" }}>
                Lab results will be immediately accessible to the patient and
                their doctor in their medical records. Make sure all information
                is accurate before submission.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              style={{ marginTop: "2rem" }}
            >
              {loading ? "Uploading..." : "Upload Lab Results"}
            </Button>
          </form>
        </FormContainer>
      </PageContainer>
    </PageTransition>
  );
};

export default UploadLabResults;
