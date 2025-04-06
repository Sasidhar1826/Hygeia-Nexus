import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/animations/PageTransition";
import { childVariants } from "../components/animations/PageTransition";
import AnimationContainer from "../components/animations/AnimationContainer";
import {
  FaArrowLeft,
  FaEdit,
  FaCalendarPlus,
  FaFileMedical,
  FaFilePrescription,
  FaPrint,
  FaTrashAlt,
  FaUser,
  FaFlask,
  FaVial,
  FaBrain,
  FaHistory,
  FaHeartbeat,
  FaChartLine,
  FaFileAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import RequestLabTest from "../components/modals/RequestLabTest";
import ViewLabReport from "../components/modals/ViewLabReport";
import SmartDiagnosisModal from "../components/modals/SmartDiagnosisModal";
import AIDiagnosticHistoryModal from "../components/modals/AIDiagnosticHistoryModal";
import PrescriptionModal from "../components/modals/PrescriptionModal";
import MedicalReportCard from "../components/medical/MedicalReportCard";
import LabReportCard from "../components/medical/LabReportCard";
import api from "../services/apiService";
import {
  getFormattedLabReports,
  getFormattedMedicalRecords,
} from "../services/medicalDataFormatters";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin-right: ${(props) => props.theme.spacing(2)};

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  flex: 1;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${(props) => props.theme.spacing(4)};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const PatientProfileCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
  padding: ${(props) => props.theme.spacing(3)};
  height: fit-content;
`;

const PatientAvatar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const AvatarCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.background.default};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 3rem;
`;

const PatientName = styled.h2`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.4rem;
`;

const PatientBasicDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(3)};
  text-align: center;
`;

const PatientBasicInfo = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(1)};
  font-size: 0.95rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.border.main};
  margin: ${(props) => props.theme.spacing(3)} 0;
`;

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const DetailValue = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
`;

const TabsWrapper = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const TabButton = styled.button`
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(4)};
  background: none;
  border: none;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: ${(props) => (props.$isActive ? "600" : "400")};
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.primary.main
      : props.theme.colors.text.secondary};
  border-bottom: 3px solid
    ${(props) =>
      props.$isActive ? props.theme.colors.primary.main : "transparent"};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
    background-color: ${(props) => props.theme.colors.background.hover};
  }

  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.background.hover};
  }

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
    vertical-align: middle;
  }
`;

const TabContent = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.default};
  padding-top: ${(props) => props.theme.spacing(3)};
`;

const MedicalInfoCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
  padding: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const SectionTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.1rem;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const AppointmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const AppointmentItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) => props.theme.colors.background.default};
  gap: ${(props) => props.theme.spacing(2)};
`;

const AppointmentDate = styled.div`
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border-radius: ${(props) => props.theme.borderRadius.small};
  padding: ${(props) => props.theme.spacing(1)};
  min-width: 60px;
  text-align: center;
`;

const AppointmentDay = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const AppointmentMonth = styled.div`
  font-size: 0.8rem;
`;

const AppointmentInfo = styled.div`
  flex: 1;
`;

const AppointmentTitle = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

const AppointmentDetails = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const AppointmentStatus = styled.div`
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.$status) {
      case "scheduled":
        return props.theme.colors.status.infoLight;
      case "completed":
        return props.theme.colors.status.successLight;
      case "cancelled":
        return props.theme.colors.status.errorLight;
      default:
        return props.theme.colors.status.warningLight;
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case "scheduled":
        return props.theme.colors.status.info;
      case "completed":
        return props.theme.colors.status.success;
      case "cancelled":
        return props.theme.colors.status.error;
      default:
        return props.theme.colors.status.warning;
    }
  }};
`;

// New styled components for the summary card
const SummaryCard = styled.div`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
  padding: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  border-left: 4px solid ${(props) => props.theme.colors.primary.main};
`;

const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
    font-size: 1.5rem;
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  h3 {
    margin: 0;
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }

  span {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`;

// Implement the Tabs system
const Tabs = ({ children, activeTab, setActiveTab }) => {
  // Extract tabs from children
  const tabs = React.Children.toArray(children).filter(
    (child) => child.type === Tab
  );

  return (
    <TabsWrapper>
      <TabsHeader>
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.props.id || index}
            $isActive={activeTab === (tab.props.id || index)}
            onClick={() => setActiveTab(tab.props.id || index)}
          >
            {tab.props.icon && (
              <span className="tab-icon">{tab.props.icon}</span>
            )}
            {tab.props.label}
          </TabButton>
        ))}
      </TabsHeader>
      <TabContent
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tabs.find(
          (tab) => tab.props.id === activeTab || tabs.indexOf(tab) === activeTab
        )}
      </TabContent>
    </TabsWrapper>
  );
};

const Tab = ({ children, id, label, icon }) => {
  return (
    <div role="tabpanel" id={`tabpanel-${id}`}>
      {children}
    </div>
  );
};

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");
  const [showLabTestModal, setShowLabTestModal] = useState(false);
  const [selectedLabReport, setSelectedLabReport] = useState(null);
  const [showLabReportModal, setShowLabReportModal] = useState(false);
  const [showSmartDiagnosisModal, setShowSmartDiagnosisModal] = useState(false);
  const [showAIDiagnosticHistoryModal, setShowAIDiagnosticHistoryModal] =
    useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [patientSummary, setPatientSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Extract fetchData function outside of useEffect so it can be reused
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("Fetching patient with ID:", id);

      // Fetch patient data from api
      try {
        const patientData = await api.getPatientById(id);
        console.log("Fetched patient data:", patientData);

        if (patientData) {
          // Calculate age from birthDate
          if (patientData.birthDate) {
            patientData.age = calculateAge(patientData.birthDate);
          }

          // Initialize empty arrays for properties that should be arrays
          patientData.medicalRecords = patientData.medicalRecords || [];
          patientData.prescriptions = patientData.prescriptions || [];
          patientData.allergies = patientData.allergies || [];
          patientData.chronicConditions = patientData.chronicConditions || [];

          setPatient(patientData);

          // Fetch patient summary data
          try {
            setSummaryLoading(true);
            const summary = await api.getPatientSummary(id);
            if (summary) {
              setPatientSummary(summary);
            } else {
              console.log("No patient summary data returned");
            }
            setSummaryLoading(false);
          } catch (error) {
            console.error("Error fetching patient summary:", error);
            setSummaryLoading(false);
          }
        } else {
          throw new Error("Patient not found");
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
        setLoading(false);
        // handle error - redirect or show error message
        return;
      }

      // Fetch appointments from api
      try {
        const appointmentsResponse = await api.getAppointments({
          patient: id,
        });
        console.log("Fetched appointments:", appointmentsResponse);

        if (Array.isArray(appointmentsResponse)) {
          // Format the appointments for display
          const formattedAppointments = appointmentsResponse.map(
            (appointment) => ({
              id: appointment._id || `app-${Math.random()}`,
              date: appointment.appointmentDate || new Date().toISOString(),
              time: appointment.startTime || "Not specified",
              reason: appointment.reason || "Consultation",
              doctor: appointment.doctor?.name || "Unknown Doctor",
              department: appointment.department?.name || "General Medicine",
              status: appointment.status || "scheduled",
            })
          );

          setAppointments(formattedAppointments);
        } else {
          console.error(
            "Appointments response is not an array:",
            appointmentsResponse
          );
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      }

      // Fetch medical records using the new formatter
      try {
        const medicalRecordsResponse = await getFormattedMedicalRecords(id);
        console.log("Fetched medical records:", medicalRecordsResponse);

        if (Array.isArray(medicalRecordsResponse)) {
          // Update the patient object with the formatted medical records
          setPatient((prevPatient) => {
            if (!prevPatient) return null;
            return {
              ...prevPatient,
              medicalRecords: medicalRecordsResponse,
            };
          });
        } else {
          console.error(
            "Medical records response is not an array:",
            medicalRecordsResponse
          );
          // Ensure patient has empty medicalRecords array as fallback
          setPatient((prevPatient) => {
            if (!prevPatient) return null;
            return {
              ...prevPatient,
              medicalRecords: [],
            };
          });
        }
      } catch (error) {
        console.error("Error fetching medical records:", error);
        // Ensure patient has empty medicalRecords array as fallback
        setPatient((prevPatient) => {
          if (!prevPatient) return null;
          return {
            ...prevPatient,
            medicalRecords: [],
          };
        });
      }

      // Fetch lab reports using the new formatter
      try {
        const labReportsResponse = await getFormattedLabReports(id);
        console.log("Fetched lab reports:", labReportsResponse);

        if (Array.isArray(labReportsResponse)) {
          // Make sure each lab report has required fields for the LabReportCard component
          const processedLabReports = labReportsResponse.map((report) => {
            // Ensure results is properly formatted - convert object to string if needed
            let formattedResults = report.results;

            // If results is an object and we don't have components, convert to a string summary
            if (
              typeof report.results === "object" &&
              report.results !== null &&
              (!report.components || report.components.length === 0)
            ) {
              // If we have a string interpretation, use that instead of the object
              if (
                typeof report.interpretation === "string" &&
                report.interpretation
              ) {
                formattedResults = report.interpretation;
              }
            }

            return {
              ...report,
              id: report.id || report._id || `report-${Math.random()}`,
              testType: report.testType || report.type || "Blood Test",
              date: report.date || report.testDate || new Date().toISOString(),
              patientId: report.patientId || id,
              doctorId: report.doctorId || user?._id,
              status: report.status || "completed",
              components: report.components || [],
              results: formattedResults,
              hasAbnormalResults:
                report.hasAbnormalResults === true ||
                (Array.isArray(report.components) &&
                  report.components.some((comp) => comp.flagged === true)) ||
                false,
            };
          });

          setLabReports(processedLabReports);
        } else {
          console.error(
            "Lab reports response is not an array:",
            labReportsResponse
          );
          setLabReports([]);
        }
      } catch (error) {
        console.error("Error fetching lab reports:", error);
        setLabReports([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, user?._id]);

  const calculateAge = (birthDate) => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date error";
    }
  };

  const getMonthAbbreviation = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString("en-US", { month: "short" });
    } catch (error) {
      console.error("Error getting month abbreviation:", error);
      return "N/A";
    }
  };

  const getDay = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.getDate();
    } catch (error) {
      console.error("Error getting day:", error);
      return "N/A";
    }
  };

  // Add a function to handle viewing a lab report
  const handleViewLabReport = (report) => {
    setSelectedLabReport(report);
    setShowLabReportModal(true);
  };

  const handleAddPrescription = () => {
    console.log("Opening prescription modal");
    setShowPrescriptionModal(true);
  };

  const handlePrescriptionModalClose = (wasSuccessful) => {
    console.log("Closing prescription modal, success:", wasSuccessful);
    setShowPrescriptionModal(false);

    // If a prescription was successfully added, refresh patient data
    if (wasSuccessful) {
      fetchData();
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <AnimationContainer type="loading" height="400px" />
      </PageTransition>
    );
  }

  if (!patient) {
    return (
      <PageTransition>
        <div>
          <PageHeader>
            <BackButton
              onClick={() => navigate(-1)}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft /> Back to Patients
            </BackButton>
            <Title>Patient Not Found</Title>
          </PageHeader>
          <AnimationContainer type="emptyState" height="300px" />
          <p style={{ textAlign: "center" }}>
            The requested patient could not be found.
          </p>
        </div>
      </PageTransition>
    );
  }

  // Make sure medical records is always an array
  const medicalRecords = patient.medicalRecords || [];

  return (
    <PageTransition>
      <PageHeader>
        <BackButton
          onClick={() => navigate(-1)}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Patients
        </BackButton>
        <Title>{`${patient.firstName || ""} ${patient.lastName || ""}`}</Title>
        <ActionButtons>
          {/* Temporary debug button for prescription */}
          <Button
            variant="primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log("Debug: Opening prescription modal directly");
              console.log("Current user:", user);
              setShowPrescriptionModal(true);
            }}
            style={{ marginRight: "8px", background: "orange" }}
          >
            Add Prescription
          </Button>

          {user?.role === "doctor" && (
            <>
              <Button
                variant="primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSmartDiagnosisModal(true)}
                style={{
                  backgroundColor: "#10B981",
                  marginRight: "8px",
                }}
              >
                <FaBrain /> Smart Diagnosis
              </Button>
              <Button
                variant="secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAIDiagnosticHistoryModal(true)}
                style={{ marginRight: "8px" }}
              >
                <FaHistory /> AI History
              </Button>
            </>
          )}
          <Button
            variant="secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPrint /> Print
          </Button>
          <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FaEdit /> Edit
          </Button>
          <Button
            variant="danger"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTrashAlt /> Delete
          </Button>
        </ActionButtons>
      </PageHeader>

      {/* New Patient Summary Card */}
      {patientSummary ? (
        <SummaryCard>
          <SummaryHeader>
            <FaChartLine />
            <h3>Patient Summary</h3>
          </SummaryHeader>
          <SummaryContent>
            {patientSummary.diagnosisSummary && (
              <SummaryItem>
                <FaBrain />
                <span>{patientSummary.diagnosisSummary}</span>
              </SummaryItem>
            )}
            {patientSummary.vitalTrends &&
              patientSummary.vitalTrends.bloodPressure &&
              patientSummary.vitalTrends.bloodPressure.length > 0 && (
                <SummaryItem>
                  <FaHeartbeat />
                  <span>
                    Latest BP:{" "}
                    {
                      patientSummary.vitalTrends.bloodPressure[
                        patientSummary.vitalTrends.bloodPressure.length - 1
                      ].systolic
                    }
                    /
                    {
                      patientSummary.vitalTrends.bloodPressure[
                        patientSummary.vitalTrends.bloodPressure.length - 1
                      ].diastolic
                    }{" "}
                    mmHg
                  </span>
                </SummaryItem>
              )}
            <SummaryItem>
              <FaCalendarPlus />
              <span>
                {patientSummary?.appointments?.filter(
                  (a) => a.status === "upcoming" || a.status === "confirmed"
                ).length || 0}{" "}
                upcoming appointments
              </span>
            </SummaryItem>
            <SummaryItem>
              <FaFlask />
              <span>
                {patientSummary?.labResults?.length || 0} lab reports available,
                {patientSummary?.labResults?.reduce(
                  (count, lab) => count + (lab.abnormalFindings || 0),
                  0
                ) || 0}{" "}
                abnormal findings
              </span>
            </SummaryItem>
          </SummaryContent>
        </SummaryCard>
      ) : summaryLoading ? (
        <SummaryCard>Loading patient summary...</SummaryCard>
      ) : null}

      <ContentContainer>
        <motion.div variants={childVariants}>
          <PatientProfileCard>
            <PatientAvatar>
              <AvatarCircle>
                <FaUser />
              </AvatarCircle>
            </PatientAvatar>
            <PatientName>{`${patient.firstName || ""} ${
              patient.lastName || ""
            }`}</PatientName>
            <PatientBasicDetails>
              <PatientBasicInfo>{`${patient.age || "Unknown"} years | ${
                patient.gender || "Unknown"
              }`}</PatientBasicInfo>
              <PatientBasicInfo>{`Blood Group: ${
                patient.bloodGroup || "Unknown"
              }`}</PatientBasicInfo>
            </PatientBasicDetails>

            <Button
              style={{ width: "100%", marginBottom: "10px" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCalendarPlus /> Schedule Appointment
            </Button>

            {user?.role === "doctor" && (
              <Button
                style={{ width: "100%" }}
                variant="secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLabTestModal(true)}
              >
                <FaFlask /> Request Lab Test
              </Button>
            )}

            <Divider />

            <DetailsList>
              <DetailItem>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{patient.email || "Not provided"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>
                  {patient.contactNumber || "Not provided"}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Address</DetailLabel>
                <DetailValue>
                  {patient.address
                    ? `${patient.address.street || ""}, ${
                        patient.address.city || ""
                      }, ${patient.address.state || ""} ${
                        patient.address.zip || ""
                      }`
                    : "Address not provided"}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Birth Date</DetailLabel>
                <DetailValue>
                  {patient.birthDate
                    ? formatDate(patient.birthDate)
                    : "Not provided"}
                </DetailValue>
              </DetailItem>
            </DetailsList>

            <Divider />

            <SectionTitle>Emergency Contact</SectionTitle>
            <DetailsList>
              <DetailItem>
                <DetailLabel>Name</DetailLabel>
                <DetailValue>
                  {patient.emergencyContact?.name || "Not provided"}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Relationship</DetailLabel>
                <DetailValue>
                  {patient.emergencyContact?.relationship || "Not provided"}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>
                  {patient.emergencyContact?.contactNumber || "Not provided"}
                </DetailValue>
              </DetailItem>
            </DetailsList>

            <Divider />

            <SectionTitle>Insurance Information</SectionTitle>
            <DetailsList>
              <DetailItem>
                <DetailLabel>Provider</DetailLabel>
                <DetailValue>
                  {patient.insurance?.provider || "Not provided"}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Policy Number</DetailLabel>
                <DetailValue>
                  {patient.insurance?.policyNumber || "Not provided"}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Expiry Date</DetailLabel>
                <DetailValue>
                  {patient.insurance?.expiryDate
                    ? formatDate(patient.insurance.expiryDate)
                    : "Not provided"}
                </DetailValue>
              </DetailItem>
            </DetailsList>
          </PatientProfileCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%" }}
        >
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
            <Tab
              id="appointments"
              label="Appointments"
              icon={<FaCalendarPlus />}
            >
              <MedicalInfoCard variants={childVariants}>
                <SectionTitle>
                  <FaCalendarPlus /> Upcoming Appointments
                </SectionTitle>
                <AppointmentList>
                  {appointments
                    .filter(
                      (app) =>
                        app.status === "scheduled" ||
                        app.status === "pending" ||
                        app.status === "confirmed"
                    )
                    .map((appointment) => (
                      <AppointmentItem
                        key={appointment.id || `app-${Math.random()}`}
                      >
                        <AppointmentDate>
                          <AppointmentDay>
                            {getDay(appointment.date)}
                          </AppointmentDay>
                          <AppointmentMonth>
                            {getMonthAbbreviation(appointment.date)}
                          </AppointmentMonth>
                        </AppointmentDate>
                        <AppointmentInfo>
                          <AppointmentTitle>
                            {appointment.reason}
                          </AppointmentTitle>
                          <AppointmentDetails>
                            {`${appointment.time || "Not specified"} | ${
                              appointment.doctor || "Not assigned"
                            } | ${appointment.department || "General"}`}
                          </AppointmentDetails>
                        </AppointmentInfo>
                        <AppointmentStatus
                          $status={appointment.status || "scheduled"}
                        >
                          {appointment.status
                            ? appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)
                            : "Scheduled"}
                        </AppointmentStatus>
                      </AppointmentItem>
                    ))}
                  {appointments.filter(
                    (app) =>
                      app.status === "scheduled" ||
                      app.status === "pending" ||
                      app.status === "confirmed"
                  ).length === 0 && <p>No upcoming appointments</p>}
                </AppointmentList>
              </MedicalInfoCard>

              <MedicalInfoCard variants={childVariants}>
                <SectionTitle>
                  <FaCalendarPlus /> Past Appointments
                </SectionTitle>
                <AppointmentList>
                  {appointments
                    .filter(
                      (app) =>
                        app.status === "completed" || app.status === "cancelled"
                    )
                    .map((appointment) => (
                      <AppointmentItem
                        key={appointment.id || `app-${Math.random()}`}
                      >
                        <AppointmentDate>
                          <AppointmentDay>
                            {getDay(appointment.date)}
                          </AppointmentDay>
                          <AppointmentMonth>
                            {getMonthAbbreviation(appointment.date)}
                          </AppointmentMonth>
                        </AppointmentDate>
                        <AppointmentInfo>
                          <AppointmentTitle>
                            {appointment.reason}
                          </AppointmentTitle>
                          <AppointmentDetails>
                            {`${appointment.time || "Not specified"} | ${
                              appointment.doctor || "Not assigned"
                            } | ${appointment.department || "General"}`}
                          </AppointmentDetails>
                        </AppointmentInfo>
                        <AppointmentStatus
                          $status={appointment.status || "completed"}
                        >
                          {appointment.status
                            ? appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)
                            : "Completed"}
                        </AppointmentStatus>
                      </AppointmentItem>
                    ))}
                  {appointments.filter(
                    (app) =>
                      app.status === "completed" || app.status === "cancelled"
                  ).length === 0 && <p>No past appointments</p>}
                </AppointmentList>
              </MedicalInfoCard>
            </Tab>

            <Tab
              id="medicalRecords"
              label="Medical Records"
              icon={<FaFileAlt />}
            >
              <MedicalInfoCard variants={childVariants}>
                <SectionTitle>
                  <FaFileAlt /> Medical Records
                </SectionTitle>
                {patient.medicalRecords && patient.medicalRecords.length > 0 ? (
                  patient.medicalRecords.map((record) => (
                    <MedicalReportCard
                      key={record.id || record._id}
                      report={record}
                    />
                  ))
                ) : (
                  <div
                    style={{
                      padding: "20px 0",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    No medical records available
                  </div>
                )}
              </MedicalInfoCard>
            </Tab>

            <Tab id="labReports" label="Lab Reports" icon={<FaFlask />}>
              <MedicalInfoCard variants={childVariants}>
                <SectionTitle>
                  <FaFlask /> Laboratory Reports
                </SectionTitle>
                {labReports && labReports.length > 0 ? (
                  labReports.map((report) => (
                    <LabReportCard
                      key={report.id || report._id}
                      report={report}
                      onClick={handleViewLabReport}
                    />
                  ))
                ) : (
                  <div
                    style={{
                      padding: "20px 0",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    No lab reports available
                  </div>
                )}

                {user?.role === "doctor" && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowLabTestModal(true)}
                    >
                      <FaFlask /> Request New Lab Test
                    </Button>
                  </div>
                )}
              </MedicalInfoCard>
            </Tab>

            <Tab
              id="prescriptions"
              label="Prescriptions"
              icon={<FaFilePrescription />}
            >
              <MedicalInfoCard variants={childVariants}>
                <SectionTitle>
                  <FaFilePrescription /> Prescriptions
                </SectionTitle>
                {console.log("Current user in prescriptions tab:", user)}
                {Array.isArray(patient?.prescriptions) &&
                patient.prescriptions.length > 0 ? (
                  patient.prescriptions.map((prescription) => (
                    <div
                      key={
                        prescription.id ||
                        prescription._id ||
                        `prescription-${Math.random()}`
                      }
                      style={{ marginBottom: "20px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <h4 style={{ margin: 0 }}>
                          {prescription.medicine || "Unnamed Medication"}
                        </h4>
                        <span style={{ fontSize: "0.85rem", color: "#666" }}>
                          {prescription.date
                            ? formatDate(prescription.date)
                            : "No date"}
                        </span>
                      </div>
                      <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                        Dosage: {prescription.dosage || "Not specified"} |
                        Frequency: {prescription.frequency || "Not specified"} |
                        Duration: {prescription.duration || "Not specified"}
                      </p>
                      <div style={{ fontSize: "0.85rem", color: "#666" }}>
                        Prescribed by: {prescription.doctor || "Unknown doctor"}
                      </div>
                      {prescription.instructions && (
                        <div
                          style={{
                            fontSize: "0.9rem",
                            marginTop: "8px",
                            padding: "8px",
                            backgroundColor: "#f8f9fa",
                            borderRadius: "4px",
                          }}
                        >
                          <strong>Instructions:</strong>{" "}
                          {prescription.instructions}
                        </div>
                      )}
                      <Divider />
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: "20px 0",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    No prescriptions available
                  </div>
                )}

                {console.log("User role for prescription button:", user?.role)}
                {console.log("Is doctor check:", user?.role === "doctor")}
                {user?.role === "doctor" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddPrescription}
                      variant="primary"
                    >
                      <FaFilePrescription /> Add Prescription
                    </Button>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      color: "#666",
                    }}
                  >
                    Only doctors can add prescriptions
                  </div>
                )}
              </MedicalInfoCard>
            </Tab>

            <Tab id="medicalInfo" label="Medical Info" icon={<FaFileMedical />}>
              <MedicalInfoCard variants={childVariants}>
                <SectionTitle>Allergies</SectionTitle>
                {Array.isArray(patient?.allergies) &&
                patient.allergies.length > 0 ? (
                  <ul>
                    {patient.allergies.map((allergy, index) => (
                      <li key={index}>{allergy}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No known allergies</p>
                )}
              </MedicalInfoCard>

              <MedicalInfoCard variants={childVariants}>
                <SectionTitle>Chronic Conditions</SectionTitle>
                {Array.isArray(patient?.chronicConditions) &&
                patient.chronicConditions.length > 0 ? (
                  <ul>
                    {patient.chronicConditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No chronic conditions</p>
                )}
              </MedicalInfoCard>
            </Tab>
          </Tabs>
        </motion.div>
      </ContentContainer>

      {/* RequestLabTest Modal */}
      <RequestLabTest
        isOpen={showLabTestModal}
        onClose={() => setShowLabTestModal(false)}
        patientId={id}
        doctorId={user?._id}
      />

      {/* ViewLabReport Modal */}
      <ViewLabReport
        isOpen={showLabReportModal}
        onClose={() => setShowLabReportModal(false)}
        report={selectedLabReport}
      />

      {/* SmartDiagnosisModal */}
      {showSmartDiagnosisModal && (
        <SmartDiagnosisModal
          isOpen={showSmartDiagnosisModal}
          onClose={() => setShowSmartDiagnosisModal(false)}
          patientId={id}
          onViewHistory={() => {
            setShowSmartDiagnosisModal(false);
            setShowAIDiagnosticHistoryModal(true);
          }}
        />
      )}

      {/* AIDiagnosticHistoryModal */}
      <AIDiagnosticHistoryModal
        isOpen={showAIDiagnosticHistoryModal}
        onClose={() => setShowAIDiagnosticHistoryModal(false)}
        patientId={id}
      />

      {/* PrescriptionModal */}
      <PrescriptionModal
        isOpen={showPrescriptionModal}
        onClose={handlePrescriptionModalClose}
        patientId={id}
        patientName={patient?.name || "Patient"}
        doctorId={user?._id}
        doctorName={user?.name || "Doctor"}
      />
    </PageTransition>
  );
};

export default PatientDetails;
