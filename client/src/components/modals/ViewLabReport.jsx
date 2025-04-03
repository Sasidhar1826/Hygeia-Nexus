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

  // Create date object from report date
  const reportDate = new Date(report.date);

  // Format reportDate as a readable string
  const formattedDate = formatDate(report.date);

  // Check if results is an object and has entries
  const hasResults =
    report.results &&
    typeof report.results === "object" &&
    Object.keys(report.results).length > 0;

  // Try to extract reference ranges for common parameters
  const getReferenceRange = (parameter) => {
    const ranges = {
      Hemoglobin: "Males: 13.5-17.5 g/dL, Females: 12.0-15.5 g/dL",
      "White Blood Cells": "4.5-11.0 thousand/μL",
      Platelets: "150-450 thousand/μL",
      Glucose: "Fasting: 70-99 mg/dL",
      Cholesterol: "<200 mg/dL",
      pH: "4.5-8.0",
    };

    return ranges[parameter] || "Not specified";
  };

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
                <FaVial /> {report.reportType || "Lab Report"}
              </Title>
            </ReportHeader>

            <InfoGrid>
              <InfoCard>
                <InfoTitle>
                  <FaUser /> Patient
                </InfoTitle>
                <InfoValue>
                  {report.patient?.name || "Unknown Patient"}
                </InfoValue>
              </InfoCard>

              <InfoCard>
                <InfoTitle>
                  <FaCalendarAlt /> Date
                </InfoTitle>
                <InfoValue>{formattedDate}</InfoValue>
              </InfoCard>

              <InfoCard>
                <InfoTitle>
                  <FaFileMedical /> Test Type
                </InfoTitle>
                <InfoValue>{report.reportType}</InfoValue>
              </InfoCard>

              <InfoCard>
                <InfoTitle>
                  <FaUser /> Technician
                </InfoTitle>
                <InfoValue>
                  {report.technician?.name || "Unknown Technician"}
                </InfoValue>
              </InfoCard>
            </InfoGrid>

            {hasResults && (
              <ResultsTable>
                <h3>Test Results</h3>

                <ResultsRow>
                  <ResultsCell flex="2">Parameter</ResultsCell>
                  <ResultsCell>Result</ResultsCell>
                  <ResultsCell flex="2">Reference Range</ResultsCell>
                </ResultsRow>

                {Object.entries(report.results).map(([key, value]) => (
                  <ResultsRow key={key}>
                    <ResultsCell flex="2">{key}</ResultsCell>
                    <ResultsCell>{value}</ResultsCell>
                    <ResultsCell flex="2">{getReferenceRange(key)}</ResultsCell>
                  </ResultsRow>
                ))}
              </ResultsTable>
            )}

            {report.notes && (
              <Notes>
                <NotesTitle>Notes</NotesTitle>
                <div>{report.notes}</div>
              </Notes>
            )}

            <ActionButtons>
              <Button variant="secondary" onClick={() => window.print()}>
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
