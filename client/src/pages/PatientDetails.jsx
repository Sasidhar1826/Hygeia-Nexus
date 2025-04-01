import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
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
} from "react-icons/fa";

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

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) =>
    props.variant === "danger"
      ? props.theme.colors.status.error
      : props.variant === "secondary"
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
      props.variant === "danger"
        ? props.theme.colors.status.errorDark
        : props.variant === "secondary"
        ? props.theme.colors.background.default
        : props.theme.colors.primary.dark};
  }
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

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const Tab = styled.button`
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(4)};
  border: none;
  background: none;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) =>
    props.active
      ? props.theme.colors.primary.main
      : props.theme.colors.text.secondary};
  border-bottom: 2px solid
    ${(props) =>
      props.active ? props.theme.colors.primary.main : "transparent"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const TabPanel = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
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
    switch (props.status) {
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
    switch (props.status) {
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

// Mock data for a patient
const mockPatient = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  gender: "Male",
  birthDate: "1978-06-15",
  age: 45,
  bloodGroup: "A+",
  contactNumber: "+1 (555) 123-4567",
  email: "john.doe@example.com",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Wife",
    contactNumber: "+1 (555) 987-6543",
  },
  insurance: {
    provider: "Global Health Insurance",
    policyNumber: "GHI-1234567",
    expiryDate: "2025-12-31",
  },
  allergies: ["Penicillin", "Peanuts"],
  chronicConditions: ["Hypertension", "Type 2 Diabetes"],
  appointments: [
    {
      id: "app1",
      date: "2024-04-20",
      time: "09:30 AM",
      reason: "Annual Check-up",
      doctor: "Dr. Sarah Johnson",
      department: "General Medicine",
      status: "scheduled",
    },
    {
      id: "app2",
      date: "2024-03-15",
      time: "10:00 AM",
      reason: "Follow-up Consultation",
      doctor: "Dr. Michael Rodriguez",
      department: "Cardiology",
      status: "completed",
    },
    {
      id: "app3",
      date: "2024-02-05",
      time: "02:15 PM",
      reason: "Prescription Renewal",
      doctor: "Dr. Sarah Johnson",
      department: "General Medicine",
      status: "completed",
    },
  ],
  medicalRecords: [
    {
      id: "rec1",
      date: "2024-03-15",
      type: "Diagnosis",
      doctor: "Dr. Michael Rodriguez",
      notes:
        "Patient presents with stable blood pressure. Continuing current medication regimen.",
    },
    {
      id: "rec2",
      date: "2024-02-05",
      type: "Prescription",
      doctor: "Dr. Sarah Johnson",
      notes:
        "Renewed prescription for Metformin 500mg, twice daily for 90 days.",
    },
  ],
  prescriptions: [
    {
      id: "pres1",
      date: "2024-03-15",
      medicine: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "90 days",
      doctor: "Dr. Michael Rodriguez",
    },
    {
      id: "pres2",
      date: "2024-03-15",
      medicine: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "90 days",
      doctor: "Dr. Sarah Johnson",
    },
  ],
};

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");

  useEffect(() => {
    // Simulate API call
    const fetchPatient = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        // const response = await api.get(`/patients/${id}`);
        // setPatient(response.data);

        // Using mock data
        setTimeout(() => {
          setPatient(mockPatient);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

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
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getMonthAbbreviation = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short" });
  };

  const getDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
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
        <Title>{`${patient.firstName} ${patient.lastName}`}</Title>
        <ActionButtons>
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

      <ContentContainer>
        <motion.div variants={childVariants}>
          <PatientProfileCard>
            <PatientAvatar>
              <AvatarCircle>
                <FaUser />
              </AvatarCircle>
            </PatientAvatar>
            <PatientName>{`${patient.firstName} ${patient.lastName}`}</PatientName>
            <PatientBasicDetails>
              <PatientBasicInfo>{`${patient.age} years | ${patient.gender}`}</PatientBasicInfo>
              <PatientBasicInfo>{`Blood Group: ${patient.bloodGroup}`}</PatientBasicInfo>
            </PatientBasicDetails>

            <Button
              style={{ width: "100%" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCalendarPlus /> Schedule Appointment
            </Button>

            <Divider />

            <DetailsList>
              <DetailItem>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{patient.email}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>{patient.contactNumber}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Address</DetailLabel>
                <DetailValue>{`${patient.address.street}, ${patient.address.city}, ${patient.address.state} ${patient.address.zip}`}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Birth Date</DetailLabel>
                <DetailValue>{formatDate(patient.birthDate)}</DetailValue>
              </DetailItem>
            </DetailsList>

            <Divider />

            <SectionTitle>Emergency Contact</SectionTitle>
            <DetailsList>
              <DetailItem>
                <DetailLabel>Name</DetailLabel>
                <DetailValue>{patient.emergencyContact.name}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Relationship</DetailLabel>
                <DetailValue>
                  {patient.emergencyContact.relationship}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>
                  {patient.emergencyContact.contactNumber}
                </DetailValue>
              </DetailItem>
            </DetailsList>

            <Divider />

            <SectionTitle>Insurance Information</SectionTitle>
            <DetailsList>
              <DetailItem>
                <DetailLabel>Provider</DetailLabel>
                <DetailValue>{patient.insurance.provider}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Policy Number</DetailLabel>
                <DetailValue>{patient.insurance.policyNumber}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Expiry Date</DetailLabel>
                <DetailValue>
                  {formatDate(patient.insurance.expiryDate)}
                </DetailValue>
              </DetailItem>
            </DetailsList>
          </PatientProfileCard>
        </motion.div>

        <motion.div variants={childVariants}>
          <TabsContainer>
            <Tab
              active={activeTab === "appointments"}
              onClick={() => setActiveTab("appointments")}
            >
              Appointments
            </Tab>
            <Tab
              active={activeTab === "medicalRecords"}
              onClick={() => setActiveTab("medicalRecords")}
            >
              Medical Records
            </Tab>
            <Tab
              active={activeTab === "prescriptions"}
              onClick={() => setActiveTab("prescriptions")}
            >
              Prescriptions
            </Tab>
            <Tab
              active={activeTab === "medicalInfo"}
              onClick={() => setActiveTab("medicalInfo")}
            >
              Medical Info
            </Tab>
          </TabsContainer>

          <TabPanel active={activeTab === "appointments"}>
            <MedicalInfoCard variants={childVariants}>
              <SectionTitle>
                <FaCalendarPlus /> Upcoming Appointments
              </SectionTitle>
              <AppointmentList>
                {patient.appointments
                  .filter((app) => app.status === "scheduled")
                  .map((appointment) => (
                    <AppointmentItem key={appointment.id}>
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
                          {`${appointment.time} | ${appointment.doctor} | ${appointment.department}`}
                        </AppointmentDetails>
                      </AppointmentInfo>
                      <AppointmentStatus status={appointment.status}>
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </AppointmentStatus>
                    </AppointmentItem>
                  ))}
                {patient.appointments.filter(
                  (app) => app.status === "scheduled"
                ).length === 0 && <p>No upcoming appointments</p>}
              </AppointmentList>
            </MedicalInfoCard>

            <MedicalInfoCard variants={childVariants}>
              <SectionTitle>
                <FaCalendarPlus /> Past Appointments
              </SectionTitle>
              <AppointmentList>
                {patient.appointments
                  .filter((app) => app.status !== "scheduled")
                  .map((appointment) => (
                    <AppointmentItem key={appointment.id}>
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
                          {`${appointment.time} | ${appointment.doctor} | ${appointment.department}`}
                        </AppointmentDetails>
                      </AppointmentInfo>
                      <AppointmentStatus status={appointment.status}>
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </AppointmentStatus>
                    </AppointmentItem>
                  ))}
              </AppointmentList>
            </MedicalInfoCard>
          </TabPanel>

          <TabPanel active={activeTab === "medicalRecords"}>
            <MedicalInfoCard variants={childVariants}>
              <SectionTitle>
                <FaFileMedical /> Medical Records
              </SectionTitle>
              {patient.medicalRecords.map((record) => (
                <div key={record.id} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <h4 style={{ margin: 0 }}>{record.type}</h4>
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>
                      {formatDate(record.date)}
                    </span>
                  </div>
                  <p style={{ margin: "8px 0", fontSize: "0.9rem" }}>
                    {record.notes}
                  </p>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    Doctor: {record.doctor}
                  </div>
                  <Divider />
                </div>
              ))}
            </MedicalInfoCard>
          </TabPanel>

          <TabPanel active={activeTab === "prescriptions"}>
            <MedicalInfoCard variants={childVariants}>
              <SectionTitle>
                <FaFilePrescription /> Prescriptions
              </SectionTitle>
              {patient.prescriptions.map((prescription) => (
                <div key={prescription.id} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <h4 style={{ margin: 0 }}>{prescription.medicine}</h4>
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>
                      {formatDate(prescription.date)}
                    </span>
                  </div>
                  <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                    Dosage: {prescription.dosage} | Frequency:{" "}
                    {prescription.frequency} | Duration: {prescription.duration}
                  </p>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    Prescribed by: {prescription.doctor}
                  </div>
                  <Divider />
                </div>
              ))}
            </MedicalInfoCard>
          </TabPanel>

          <TabPanel active={activeTab === "medicalInfo"}>
            <MedicalInfoCard variants={childVariants}>
              <SectionTitle>Allergies</SectionTitle>
              <ul>
                {patient.allergies.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            </MedicalInfoCard>

            <MedicalInfoCard variants={childVariants}>
              <SectionTitle>Chronic Conditions</SectionTitle>
              <ul>
                {patient.chronicConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </MedicalInfoCard>
          </TabPanel>
        </motion.div>
      </ContentContainer>
    </PageTransition>
  );
};

export default PatientDetails;
