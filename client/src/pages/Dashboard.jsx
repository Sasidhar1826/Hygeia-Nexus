import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUserInjured,
  FaCalendarAlt,
  FaFileMedical,
  FaFileInvoiceDollar,
  FaArrowRight,
  FaEye,
  FaCalendarPlus,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import AnimationContainer from "../components/animations/AnimationContainer";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const StatCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: ${(props) => props.theme.shadows.small};
  display: flex;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) =>
    props.color || props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.spacing(2)};

  svg {
    color: white;
    font-size: 1.5rem;
  }
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing(4)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.primary.main};
  text-decoration: none;
  font-size: 0.875rem;
  gap: ${(props) => props.theme.spacing(0.5)};
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.primary.dark};
  }
`;

const PatientsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PatientItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(2)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }
`;

const PatientAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.background.default};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const PatientInfo = styled.div`
  flex: 1;
`;

const PatientName = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

const PatientDetails = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const PatientActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
`;

const ActionButton = styled(Link)`
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  background: none;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  color: ${(props) => props.theme.colors.primary.main};
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
  }
`;

const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppointmentItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(2)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }
`;

const AppointmentTime = styled.div`
  min-width: 100px;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const AppointmentDate = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.875rem;
`;

const AppointmentHour = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const AppointmentInfo = styled.div`
  flex: 1;
`;

const AppointmentTitle = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

const AppointmentPatient = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const AppointmentStatus = styled.div`
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.75rem;
  background-color: ${(props) => {
    switch (props.status) {
      case "confirmed":
        return props.theme.colors.status.successLight;
      case "pending":
        return props.theme.colors.status.warningLight;
      case "cancelled":
        return props.theme.colors.status.errorLight;
      default:
        return props.theme.colors.background.default;
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "confirmed":
        return props.theme.colors.status.success;
      case "pending":
        return props.theme.colors.status.warning;
      case "cancelled":
        return props.theme.colors.status.error;
      default:
        return props.theme.colors.text.secondary;
    }
  }};
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from API calls
  const stats = [
    {
      icon: <FaUserInjured />,
      value: 1248,
      label: "Total Patients",
      color: "#4A90E2",
    },
    {
      icon: <FaCalendarAlt />,
      value: 42,
      label: "Today's Appointments",
      color: "#50C878",
    },
    {
      icon: <FaFileMedical />,
      value: 156,
      label: "New Records (This Week)",
      color: "#F5A623",
    },
    {
      icon: <FaFileInvoiceDollar />,
      value: "$24,568",
      label: "Revenue (This Month)",
      color: "#E74C3C",
    },
  ];

  // Mock recent patients data
  const recentPatients = [
    {
      id: "1",
      name: "John Doe",
      age: 45,
      gender: "Male",
      lastVisit: "2024-03-15",
      condition: "Hypertension",
    },
    {
      id: "2",
      name: "Jane Smith",
      age: 32,
      gender: "Female",
      lastVisit: "2024-03-28",
      condition: "Pregnancy Check-up",
    },
    {
      id: "3",
      name: "Robert Johnson",
      age: 58,
      gender: "Male",
      lastVisit: "2024-03-20",
      condition: "Diabetes Follow-up",
    },
    {
      id: "4",
      name: "Maria Garcia",
      age: 27,
      gender: "Female",
      lastVisit: "2024-03-25",
      condition: "Annual Check-up",
    },
  ];

  // Mock upcoming appointments data
  const upcomingAppointments = [
    {
      id: "1",
      patientName: "John Doe",
      date: "2024-04-02",
      time: "09:30 AM",
      purpose: "Follow-up Consultation",
      status: "confirmed",
    },
    {
      id: "2",
      patientName: "Emily Chen",
      date: "2024-04-02",
      time: "11:00 AM",
      purpose: "New Patient Consultation",
      status: "confirmed",
    },
    {
      id: "3",
      patientName: "Michael Rodriguez",
      date: "2024-04-03",
      time: "10:15 AM",
      purpose: "Prescription Renewal",
      status: "pending",
    },
    {
      id: "4",
      patientName: "Sarah Johnson",
      date: "2024-04-03",
      time: "03:45 PM",
      purpose: "Lab Results Review",
      status: "confirmed",
    },
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <AnimationContainer type="loading" height="400px" />;
  }

  return (
    <div>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatIcon color={stat.color}>{stat.icon}</StatIcon>
            <StatContent>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatContent>
          </StatCard>
        ))}
      </StatsGrid>

      <SectionHeader>
        <SectionTitle>Recent Patients</SectionTitle>
        <ViewAllLink to="/dashboard/patients">
          View All <FaArrowRight size={12} />
        </ViewAllLink>
      </SectionHeader>

      <Card>
        <PatientsList>
          {recentPatients.map((patient) => (
            <PatientItem key={patient.id}>
              <PatientAvatar>{patient.name.charAt(0)}</PatientAvatar>
              <PatientInfo>
                <PatientName>{patient.name}</PatientName>
                <PatientDetails>
                  {patient.age} years | {patient.gender} | {patient.condition}
                </PatientDetails>
                <PatientDetails>
                  Last Visit: {formatDate(patient.lastVisit)}
                </PatientDetails>
              </PatientInfo>
              <PatientActions>
                <ActionButton to={`/dashboard/patients/${patient.id}`}>
                  <FaEye /> View
                </ActionButton>
                <ActionButton to={`/dashboard/book-appointment/${patient.id}`}>
                  <FaCalendarPlus /> Schedule
                </ActionButton>
              </PatientActions>
            </PatientItem>
          ))}
        </PatientsList>
      </Card>

      <SectionHeader>
        <SectionTitle>Upcoming Appointments</SectionTitle>
        <ViewAllLink to="/dashboard/appointments">
          View All <FaArrowRight size={12} />
        </ViewAllLink>
      </SectionHeader>

      <Card>
        <AppointmentsList>
          {upcomingAppointments.map((appointment) => (
            <AppointmentItem key={appointment.id}>
              <AppointmentTime>
                <AppointmentDate>
                  {formatDate(appointment.date)}
                </AppointmentDate>
                <AppointmentHour>{appointment.time}</AppointmentHour>
              </AppointmentTime>
              <AppointmentInfo>
                <AppointmentTitle>{appointment.purpose}</AppointmentTitle>
                <AppointmentPatient>
                  Patient: {appointment.patientName}
                </AppointmentPatient>
              </AppointmentInfo>
              <AppointmentStatus status={appointment.status}>
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </AppointmentStatus>
            </AppointmentItem>
          ))}
        </AppointmentsList>
      </Card>
    </div>
  );
};

export default Dashboard;
