import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaTimesCircle,
  FaSpinner,
  FaHistory,
  FaCalendarAlt,
  FaChevronRight,
  FaChevronDown,
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
  max-width: 800px;
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

const ModalBody = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
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

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;

  svg {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.text.secondary};
    margin-bottom: ${(props) => props.theme.spacing(2)};
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

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`;

const HistoryItem = styled.div`
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.border.main};
`;

const HistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing(2)};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.background.hover ||
      props.theme.colors.background.card};
  }
`;

const HistoryItemDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const ToggleIcon = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HistoryItemContent = styled(motion.div)`
  padding: ${(props) => props.theme.spacing(2)};
  border-top: 1px solid ${(props) => props.theme.colors.border.main};
  background-color: ${(props) => props.theme.colors.background.paper};
`;

const SummaryText = styled.p`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Diagnoses = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(3)};
`;

const DiagnosisChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) =>
    props.confidence >= 70
      ? `${props.theme.colors.success}20`
      : props.confidence >= 40
      ? `${props.theme.colors.warning}20`
      : `${props.theme.colors.status.error}20`};
  border: 1px solid
    ${(props) =>
      props.confidence >= 70
        ? props.theme.colors.success
        : props.confidence >= 40
        ? props.theme.colors.warning
        : props.theme.colors.status.error};
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) =>
    `${props.theme.spacing(0.5)} ${props.theme.spacing(2)}`};
  margin-right: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};

  span {
    font-weight: 500;
  }
`;

const AIDiagnosticHistoryModal = ({ isOpen, onClose, patientId }) => {
  const [loading, setLoading] = useState(true);
  const [diagnosticHistory, setDiagnosticHistory] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && patientId) {
      fetchDiagnosticHistory();
    }
  }, [isOpen, patientId]);

  const fetchDiagnosticHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const history = await mockApi.getAIDiagnosticHistory(patientId);
      setDiagnosticHistory(history);
      setLoading(false);

      // Initialize expanded state for all items
      const initialExpandedState = {};
      history.forEach((item) => {
        initialExpandedState[item._id] = false;
      });
      setExpandedItems(initialExpandedState);
    } catch (error) {
      console.error("Error fetching AI diagnostic history:", error);
      setError("Failed to load diagnostic history");
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
              <FaHistory />
              <h2>AI Diagnostic History</h2>
            </HeaderTitle>
            <CloseButton onClick={onClose}>
              <FaTimesCircle />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            {loading ? (
              <LoadingState>
                <FaSpinner />
                <h3>Loading Diagnostic History</h3>
                <p>
                  Please wait while we fetch the patient's AI diagnostic
                  history.
                </p>
              </LoadingState>
            ) : error ? (
              <EmptyState>
                <FaTimesCircle />
                <h3>Error</h3>
                <p>{error}</p>
              </EmptyState>
            ) : diagnosticHistory.length === 0 ? (
              <EmptyState>
                <FaBrain />
                <h3>No Diagnostic History</h3>
                <p>
                  No AI diagnostic suggestions have been saved for this patient
                  yet.
                </p>
              </EmptyState>
            ) : (
              <HistoryList>
                {diagnosticHistory.map((item) => (
                  <HistoryItem key={item._id}>
                    <HistoryItemHeader onClick={() => toggleExpand(item._id)}>
                      <HistoryItemDate>
                        <FaCalendarAlt />
                        {formatDate(item.timestamp)}
                      </HistoryItemDate>
                      <ToggleIcon>
                        {expandedItems[item._id] ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </ToggleIcon>
                    </HistoryItemHeader>

                    <AnimatePresence>
                      {expandedItems[item._id] && (
                        <HistoryItemContent
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <SummaryText>
                            {item.diagnosisData.summary}
                          </SummaryText>

                          <h4>Primary Diagnoses</h4>
                          <Diagnoses>
                            {item.diagnosisData.diagnoses.map((diagnosis) => (
                              <DiagnosisChip
                                key={diagnosis.id}
                                confidence={diagnosis.confidence}
                              >
                                <span>{diagnosis.name}</span> -{" "}
                                {diagnosis.confidence}% confidence
                              </DiagnosisChip>
                            ))}
                          </Diagnoses>
                        </HistoryItemContent>
                      )}
                    </AnimatePresence>
                  </HistoryItem>
                ))}
              </HistoryList>
            )}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default AIDiagnosticHistoryModal;
