import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaFlask,
  FaCalendarAlt,
  FaUser,
  FaDownload,
  FaPrint,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaCheck,
  FaVial,
  FaMicroscope,
  FaChartBar,
  FaStethoscope,
} from "react-icons/fa";

const ReportCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
  overflow: hidden;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  border: 1px solid ${(props) => props.theme.colors.border.main};
`;

const ReportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.default};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};
  cursor: pointer;
`;

const ReportTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const ReportBadge = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) =>
    `${props.theme.spacing(0.5)} ${props.theme.spacing(1)}`};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) =>
    props.$abnormal
      ? `${props.theme.colors.status.error}20`
      : `${props.theme.colors.success}20`};
  color: ${(props) =>
    props.$abnormal
      ? props.theme.colors.status.error
      : props.theme.colors.success};
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: ${(props) => props.theme.spacing(2)};
`;

const ReportDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ReportContent = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
  display: ${(props) => (props.$isExpanded ? "block" : "none")};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const InfoSection = styled.div`
  background-color: ${(props) => props.theme.colors.background.default};
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  height: fit-content;
`;

const SectionTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.primary};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const ResultsTable = styled.div`
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.small};
  overflow: hidden;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  border: 1px solid ${(props) => props.theme.colors.border.main};
`;

const ResultsRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.background.default};
  }

  &:first-child {
    background-color: ${(props) => props.theme.colors.background.default};
    font-weight: 600;
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const ResultsHeaderRow = styled(ResultsRow)`
  background-color: ${(props) => props.theme.colors.primary.main}10 !important;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(2)};
`;

const ResultsCell = styled.div`
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;

  ${(props) =>
    props.$abnormal &&
    `
    color: ${props.theme.colors.status.error};
    font-weight: 600;
  `}
`;

const NotesSection = styled.div`
  margin-top: ${(props) => props.theme.spacing(3)};
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.small};
  white-space: pre-line;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(3)};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => `${props.theme.spacing(1)} ${props.theme.spacing(2)}`};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.colors.background.default
      : props.theme.colors.primary.main};
  color: ${(props) =>
    props.variant === "secondary" ? props.theme.colors.text.primary : "white"};
  border: 1px solid
    ${(props) =>
      props.variant === "secondary"
        ? props.theme.colors.border.main
        : props.theme.colors.primary.main};
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary"
        ? props.theme.colors.background.paper
        : props.theme.colors.primary.dark};
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: ${(props) => props.theme.spacing(0.5)};
  color: ${(props) =>
    props.$abnormal
      ? props.theme.colors.status.error
      : props.theme.colors.success};
`;

const SummaryCard = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary.main}10`};
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  color: ${(props) =>
    props.$abnormal
      ? props.theme.colors.status.error
      : props.theme.colors.text.primary};
  font-weight: ${(props) => (props.$abnormal ? "600" : "normal")};
  padding: ${(props) => props.theme.spacing(0.5)} 0;

  svg {
    color: ${(props) =>
      props.$abnormal
        ? props.theme.colors.status.error
        : props.theme.colors.primary.main};
  }
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Reference ranges for common lab tests
const referenceRanges = {
  // Complete Blood Count
  "White Blood Cells": { min: 4.5, max: 11.0, unit: "thousand/μL" },
  "Red Blood Cells": { min: 4.5, max: 5.9, unit: "million/μL" },
  Hemoglobin: { min: 13.5, max: 17.5, unit: "g/dL" },
  Hematocrit: { min: 41, max: 50, unit: "%" },
  Platelets: { min: 150, max: 450, unit: "thousand/μL" },
  // Metabolic Panel
  Glucose: { min: 70, max: 99, unit: "mg/dL" },
  BUN: { min: 7, max: 20, unit: "mg/dL" },
  Creatinine: { min: 0.6, max: 1.2, unit: "mg/dL" },
  Sodium: { min: 135, max: 145, unit: "mmol/L" },
  Potassium: { min: 3.5, max: 5.0, unit: "mmol/L" },
  Calcium: { min: 8.5, max: 10.2, unit: "mg/dL" },
  Albumin: { min: 3.5, max: 5.0, unit: "g/dL" },
  "Total Bilirubin": { min: 0.1, max: 1.2, unit: "mg/dL" },
  ALT: { min: 7, max: 55, unit: "U/L" },
  AST: { min: 8, max: 48, unit: "U/L" },
  // Lipid Panel
  "Total Cholesterol": { min: 0, max: 200, unit: "mg/dL" },
  "HDL Cholesterol": { min: 40, max: 60, unit: "mg/dL" },
  "LDL Cholesterol": { min: 0, max: 100, unit: "mg/dL" },
  Triglycerides: { min: 0, max: 150, unit: "mg/dL" },
  // Urinalysis
  pH: { min: 4.5, max: 8.0, unit: "" },
  "Specific Gravity": { min: 1.005, max: 1.03, unit: "" },
  "Glucose (Urine)": { min: 0, max: 0, unit: "mg/dL" },
  "Protein (Urine)": { min: 0, max: 0, unit: "mg/dL" },
  // HbA1c
  HbA1c: { min: 4.0, max: 5.6, unit: "%" },
};

// Improved results display components
const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(1.5)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.background.default};
  }
`;

const ResultName = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

const ResultValue = styled.div`
  font-weight: ${(props) => (props.$abnormal ? "600" : "normal")};
  color: ${(props) =>
    props.$abnormal
      ? props.theme.colors.status.error
      : props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  svg {
    font-size: 14px;
  }
`;

const LabReportCard = ({ report, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasAbnormalResults = report.hasAbnormalResults || false;

  // Toggle expansion state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle click on the view button or when the card is clicked directly
  const handleViewClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(report);
  };

  if (!report) return null;

  // Check if this lab report contains any test details
  const hasComponents = report.components && report.components.length > 0;

  // Check for abnormal results in the components
  const abnormalResults = hasComponents
    ? report.components.filter(
        (comp) => comp.flagged || isAbnormal(comp.name, comp.value)
      )
    : [];

  // Helper function to check if a value is outside reference range
  function isAbnormal(name, value) {
    if (typeof value !== "string" && typeof value !== "number") return false;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return false;

    const range = referenceRanges[name];
    if (!range) return false;

    return numValue < range.min || numValue > range.max;
  }

  // Get appropriate reference range text
  function getReferenceRange(name) {
    const range = referenceRanges[name];
    if (!range) return "Not specified";

    if (range.min === 0 && range.max === 0) {
      return `Negative ${range.unit ? `(${range.unit})` : ""}`;
    }

    return `${range.min}-${range.max} ${range.unit}`;
  }

  // Generate summary items for the lab report
  function generateSummaryItems() {
    if (!hasComponents) return null;

    const safeRender = (value) => {
      if (value === null || value === undefined) return "N/A";
      if (typeof value === "object") {
        try {
          return JSON.stringify(value);
        } catch (e) {
          return "Complex data";
        }
      }
      return String(value);
    };

    return (
      <SummaryCard>
        <SectionTitle>
          <FaChartBar /> Lab Report Summary
        </SectionTitle>

        <SummaryItem>
          <FaVial />{" "}
          {report.testName || report.reportType || "Laboratory Tests"}
        </SummaryItem>

        <SummaryItem>
          <FaCalendarAlt /> Collected: {formatDate(report.date)}
        </SummaryItem>

        <SummaryItem $abnormal={abnormalResults.length > 0}>
          <FaChartBar />{" "}
          {abnormalResults.length === 0
            ? "All results within normal range"
            : `${abnormalResults.length} abnormal ${
                abnormalResults.length === 1 ? "result" : "results"
              }`}
        </SummaryItem>

        {abnormalResults.length > 0 &&
          abnormalResults.map((result, index) => (
            <SummaryItem key={index} $abnormal={true}>
              <FaExclamationTriangle /> {safeRender(result.name)}:{" "}
              {safeRender(result.value)} {result.unit || ""} (Reference:{" "}
              {getReferenceRange(result.name)})
            </SummaryItem>
          ))}
      </SummaryCard>
    );
  }

  // Get patient, technician and doctor names
  const patientName =
    report.patientName || (report.patient ? report.patient.name : "Unknown");
  const patientId =
    report.patientId || (report.patient ? report.patient._id : "Unknown");
  const technicianName =
    report.technicianName ||
    (report.technician ? report.technician.name : "Unknown");
  const doctorName =
    report.doctorName || (report.doctor ? report.doctor.name : "Unknown");

  // Improved function to format and display lab results
  function formatResultsDisplay(report) {
    // Ensure safe rendering of any value by converting objects to strings
    const safeRender = (value) => {
      if (value === null || value === undefined) return "N/A";
      if (typeof value === "object") {
        try {
          return JSON.stringify(value);
        } catch (e) {
          return "Complex data";
        }
      }
      return String(value); // Convert to string to be safe
    };

    // Case 1: Report has components array - use the structured table
    if (report.components && report.components.length > 0) {
      return (
        <ResultsTable>
          <ResultsHeaderRow>
            <ResultsCell>Parameter</ResultsCell>
            <ResultsCell>Result</ResultsCell>
            <ResultsCell>Reference Range</ResultsCell>
            <ResultsCell>Status</ResultsCell>
          </ResultsHeaderRow>

          {report.components.map((comp, index) => {
            const abnormal =
              comp.flagged || isAbnormal(comp.name, safeRender(comp.value));
            return (
              <ResultsRow key={index}>
                <ResultsCell>{safeRender(comp.name)}</ResultsCell>
                <ResultsCell $abnormal={abnormal}>
                  {safeRender(comp.value)} {comp.unit || ""}
                </ResultsCell>
                <ResultsCell>{getReferenceRange(comp.name)}</ResultsCell>
                <ResultsCell>
                  <StatusIndicator $abnormal={abnormal}>
                    {abnormal ? (
                      <>
                        <FaExclamationTriangle />
                        <span>Abnormal</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span>Normal</span>
                      </>
                    )}
                  </StatusIndicator>
                </ResultsCell>
              </ResultsRow>
            );
          })}
        </ResultsTable>
      );
    }

    // Case 2: Report has results as object - display as name-value pairs
    if (report.results && typeof report.results === "object") {
      return (
        <NotesSection>
          <SectionTitle>
            <FaChartBar /> Results Summary
          </SectionTitle>
          <ResultsGrid>
            {Object.entries(report.results).map(([key, value], index) => {
              // Always convert value to a safe display string
              const displayValue = safeRender(value);

              // Try to determine if value is abnormal based on key name
              const numValue = parseFloat(displayValue);
              const isNum = !isNaN(numValue);
              const range = referenceRanges[key];
              const abnormal =
                isNum && range
                  ? numValue < range.min || numValue > range.max
                  : false;

              return (
                <ResultItem key={index}>
                  <ResultName>{key}:</ResultName>
                  <ResultValue $abnormal={abnormal}>
                    {displayValue}
                    {abnormal && <FaExclamationTriangle />}
                  </ResultValue>
                </ResultItem>
              );
            })}
          </ResultsGrid>
        </NotesSection>
      );
    }

    // Case 3: Report has results as string - display as formatted text
    if (report.results && typeof report.results === "string") {
      return (
        <NotesSection>
          <SectionTitle>
            <FaChartBar /> Results Summary
          </SectionTitle>
          <div
            style={{
              margin: "8px 0",
              whiteSpace: "pre-wrap",
              lineHeight: "1.5",
            }}
            dangerouslySetInnerHTML={{ __html: report.results }}
          />
        </NotesSection>
      );
    }

    // Fallback for no results
    return (
      <NotesSection>
        <SectionTitle>Results Summary</SectionTitle>
        <div style={{ margin: "8px 0" }}>No detailed results available.</div>
      </NotesSection>
    );
  }

  return (
    <ReportCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <ReportHeader onClick={toggleExpand}>
        <ReportTitle>
          <FaFlask /> {report.testType || report.reportType || "Lab Test"}
          <ReportBadge $abnormal={hasAbnormalResults}>
            {hasAbnormalResults ? (
              <>
                <FaExclamationTriangle /> Abnormal
              </>
            ) : (
              <>
                <FaCheck /> Normal
              </>
            )}
          </ReportBadge>
        </ReportTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ReportDate>
            <FaCalendarAlt /> {formatDate(report.date)}
          </ReportDate>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </ReportHeader>

      <ReportContent $isExpanded={isExpanded}>
        {generateSummaryItems()}

        <InfoGrid>
          <InfoSection>
            <SectionTitle>
              <FaUser /> Patient Information
            </SectionTitle>
            <div style={{ margin: "8px 0" }}>
              <strong>Name:</strong>{" "}
              {typeof patientName === "object"
                ? JSON.stringify(patientName)
                : patientName}
            </div>
            <div style={{ margin: "8px 0" }}>
              <strong>ID:</strong>{" "}
              {typeof patientId === "object"
                ? JSON.stringify(patientId)
                : patientId}
            </div>
          </InfoSection>

          <InfoSection>
            <SectionTitle>
              <FaStethoscope /> Provider Information
            </SectionTitle>
            <div style={{ margin: "8px 0" }}>
              <strong>Ordered By:</strong>{" "}
              {typeof doctorName === "object"
                ? JSON.stringify(doctorName)
                : doctorName}
            </div>
            <div style={{ margin: "8px 0" }}>
              <strong>Lab Technician:</strong>{" "}
              {typeof technicianName === "object"
                ? JSON.stringify(technicianName)
                : technicianName}
            </div>
          </InfoSection>

          <InfoSection>
            <SectionTitle>
              <FaVial /> Test Information
            </SectionTitle>
            <div style={{ margin: "8px 0" }}>
              <strong>Test Type:</strong>{" "}
              {typeof report.testType === "object"
                ? JSON.stringify(report.testType)
                : typeof report.reportType === "object"
                ? JSON.stringify(report.reportType)
                : report.testType || report.reportType || "Blood Test"}
            </div>
            <div style={{ margin: "8px 0" }}>
              <strong>Status:</strong>{" "}
              {typeof report.status === "object"
                ? JSON.stringify(report.status)
                : report.status || "completed"}
            </div>
            <div style={{ margin: "8px 0" }}>
              <strong>Sample:</strong>{" "}
              {typeof report.sample === "object"
                ? JSON.stringify(report.sample)
                : report.sample || "Blood"}
            </div>
          </InfoSection>
        </InfoGrid>

        {/* Use the improved results display formatter */}
        {formatResultsDisplay(report)}

        {report.interpretation && (
          <NotesSection>
            <SectionTitle>Interpretation</SectionTitle>
            <div style={{ margin: "8px 0" }}>
              {typeof report.interpretation === "object"
                ? JSON.stringify(report.interpretation)
                : report.interpretation}
            </div>
          </NotesSection>
        )}

        {report.notes && (
          <NotesSection>
            <SectionTitle>Notes</SectionTitle>
            <div style={{ margin: "8px 0" }}>
              {typeof report.notes === "object"
                ? JSON.stringify(report.notes)
                : report.notes}
            </div>
          </NotesSection>
        )}

        <ActionButtons>
          <Button variant="secondary" onClick={(e) => handleViewClick(e)}>
            <FaPrint /> Print Report
          </Button>
          <Button onClick={(e) => handleViewClick(e)}>
            <FaDownload /> Download PDF
          </Button>
        </ActionButtons>
      </ReportContent>
    </ReportCard>
  );
};

export default LabReportCard;
