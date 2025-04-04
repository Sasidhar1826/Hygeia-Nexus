import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaVial,
  FaUser,
  FaCalendarAlt,
  FaFileMedical,
  FaPrint,
  FaDownload,
} from "react-icons/fa";

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
  z-index: 1000;
  padding: ${(props) => props.theme.spacing(3)};
`;

const ModalContent = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(4)};
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${(props) => props.theme.spacing(2)};
  right: ${(props) => props.theme.spacing(2)};
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const ReportHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(4)};
  padding-bottom: ${(props) => props.theme.spacing(3)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(4)};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

const InfoTitle = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(1)};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const InfoValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

const ResultsTable = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const ResultsRow = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }

  &:first-child {
    background-color: ${(props) => props.theme.colors.background.default};
    font-weight: 600;
  }
`;

const ResultsCell = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  flex: ${(props) => props.flex || "1"};
`;

const Notes = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(4)};
  padding: ${(props) => props.theme.spacing(3)};
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

const NotesTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  justify-content: flex-end;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
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
      ? `1px solid ${props.theme.colors.border.main}`
      : "none"};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary"
        ? props.theme.colors.background.paper
        : props.theme.colors.primary.dark};
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

const ViewLabReport = ({ isOpen, onClose, report }) => {
  if (!report) return null;

  // Format reportDate as a readable string
  const formattedDate = formatDate(report.date || new Date().toISOString());

  // Extract results data from the lab report
  const hasResults = report.results && Object.keys(report.results).length > 0;
  const hasComponents = report.components && report.components.length > 0;

  // Choose which data source to use for display
  let displayResults = [];

  if (hasComponents) {
    // If we have components array, use that (preferred format)
    displayResults = report.components;
  } else if (hasResults && typeof report.results === "object") {
    // Otherwise convert the results object to an array
    displayResults = Object.entries(report.results).map(([name, value]) => ({
      name,
      value,
      unit: report.units?.[name] || "",
      flagged: report.flaggedResults?.[name] || false,
    }));
  }

  // Get patient and technician details
  const patientName =
    report.patientName || (report.patient ? report.patient.name : "Unknown");
  const patientId =
    report.patientId || (report.patient ? report.patient._id : "Not specified");
  const technicianName =
    report.technicianName ||
    (report.technician ? report.technician.name : "Unknown");

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalBackdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>

            <ReportHeader>
              <Title>
                <FaVial />{" "}
                {report.testType || report.reportType || "Laboratory Report"}
              </Title>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>
                {formattedDate}
              </div>
            </ReportHeader>

            <InfoGrid>
              <InfoCard>
                <InfoTitle>
                  <FaUser /> Patient Information
                </InfoTitle>
                <InfoValue>{patientName}</InfoValue>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    marginTop: "4px",
                  }}
                >
                  ID: {patientId}
                </div>
              </InfoCard>

              <InfoCard>
                <InfoTitle>
                  <FaCalendarAlt /> Test Details
                </InfoTitle>
                <InfoValue>
                  {report.testType || report.reportType || "Laboratory Test"}
                </InfoValue>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    marginTop: "4px",
                  }}
                >
                  Collected: {formattedDate}
                </div>
              </InfoCard>
            </InfoGrid>

            <ResultsTable>
              <ResultsRow>
                <ResultsCell flex="2">Parameter</ResultsCell>
                <ResultsCell>Result</ResultsCell>
                <ResultsCell>Reference Range</ResultsCell>
                <ResultsCell>Status</ResultsCell>
              </ResultsRow>

              {displayResults.length > 0 ? (
                displayResults.map((item, index) => (
                  <ResultsRow key={index}>
                    <ResultsCell flex="2">{item.name}</ResultsCell>
                    <ResultsCell>
                      {item.value} {item.unit}
                    </ResultsCell>
                    <ResultsCell>
                      {item.referenceRange || "Not specified"}
                    </ResultsCell>
                    <ResultsCell>
                      {item.flagged ? (
                        <span style={{ color: "#e53935", fontWeight: 600 }}>
                          Abnormal
                        </span>
                      ) : (
                        <span style={{ color: "#4caf50" }}>Normal</span>
                      )}
                    </ResultsCell>
                  </ResultsRow>
                ))
              ) : (
                <ResultsRow>
                  <ResultsCell colSpan="4" style={{ textAlign: "center" }}>
                    {typeof report.results === "string" ? (
                      <div
                        style={{ whiteSpace: "pre-wrap", margin: 0 }}
                        dangerouslySetInnerHTML={{ __html: report.results }}
                      />
                    ) : (
                      "No detailed results available"
                    )}
                  </ResultsCell>
                </ResultsRow>
              )}
            </ResultsTable>

            {report.interpretation && (
              <Notes>
                <NotesTitle>Interpretation</NotesTitle>
                <div>{report.interpretation}</div>
              </Notes>
            )}

            {report.notes && (
              <Notes>
                <NotesTitle>Notes</NotesTitle>
                <div>{report.notes}</div>
              </Notes>
            )}

            <ActionButtons>
              <Button variant="secondary">
                <FaPrint /> Print Report
              </Button>
              <Button>
                <FaDownload /> Download PDF
              </Button>
            </ActionButtons>
          </ModalContent>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

export default ViewLabReport;
