import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUserInjured,
  FaCalendarAlt,
  FaFileMedical,
  FaFlask,
  FaPrescriptionBottleAlt,
  FaArrowRight,
  FaUserMd,
  FaCheck,
  FaClock,
  FaHospital,
  FaVideo,
  FaBriefcaseMedical,
  FaPills,
  FaChartLine,
} from "react-icons/fa";
import Card from "../../components/ui/Card";
import AnimationContainer from "../../components/animations/AnimationContainer";
import { useAuth } from "../../context/AuthContext";
import mockApi from "../../services/mockApi";

// Styled components
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled(motion.div)`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.color || "#4A90E2"};
  color: white;
  font-size: 24px;
  margin-right: 15px;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 15px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4a90e2;
  text-decoration: none;

  svg {
    margin-left: 5px;
    transition: transform 0.2s ease;
  }

  &:hover {
    text-decoration: underline;

    svg {
      transform: translateX(3px);
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppointmentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const AppointmentTime = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 110px;
`;

const AppointmentDate = styled.div`
  font-weight: 600;
  color: #333;
`;

const AppointmentHour = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

const AppointmentInfo = styled.div`
  flex: 1;
  margin: 0 15px;
`;

const AppointmentTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const AppointmentPatient = styled.div`
  font-size: 14px;
  color: #666;
`;

const AppointmentStatus = styled.div`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${(props) => {
    switch (props.status) {
      case "confirmed":
        return "#E3F2FD";
      case "pending":
        return "#FFF9C4";
      case "cancelled":
        return "#FFEBEE";
      case "completed":
        return "#E8F5E9";
      default:
        return "#F5F5F5";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "confirmed":
        return "#1565C0";
      case "pending":
        return "#F57F17";
      case "cancelled":
        return "#C62828";
      case "completed":
        return "#2E7D32";
      default:
        return "#616161";
    }
  }};
`;

const PatientCard = styled(Card)`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
`;

const PatientAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e1f5fe;
  color: #03a9f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 15px;
`;

const PatientInfo = styled.div`
  flex: 1;
`;

const PatientName = styled.div`
  font-weight: 600;
  color: #333;
`;

const PatientDetails = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: #f0f8ff;
  color: #4a90e2;
  border-radius: 50%;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e1f5fe;
  }
`;

const QuickActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const QuickActionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const QuickActionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#4A90E2"}20;
  color: ${(props) => props.color || "#4A90E2"};
  font-size: 24px;
  margin-bottom: 10px;
`;

const QuickActionTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const QuickActionDescription = styled.div`
  font-size: 14px;
  color: #666;
`;

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [doctorData, setDoctorData] = useState({
    todayAppointments: [],
    pendingAppointments: [],
    recentPatients: [],
    stats: {
      totalPatients: 0,
      todayAppointments: 0,
      pendingAppointments: 0,
      completedAppointments: 0,
    },
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);

        // Fetch today's appointments
        const today = new Date().toISOString().split("T")[0];
        const appointments = await mockApi.getAppointments({
          doctor: user._id,
          date: today,
        });

        // Fetch pending appointments
        const pendingAppointments = await mockApi.getAppointments({
          doctor: user._id,
          status: "pending",
        });

        // Fetch all unique patients for this doctor
        const allAppointments = await mockApi.getAppointments({
          doctor: user._id,
        });

        // Extract unique patient IDs
        const uniquePatientIds = [
          ...new Set(
            allAppointments.map((app) => app.patient?._id).filter((id) => id)
          ),
        ];

        // Get recent patients (last 5 unique patients)
        const recentPatients = [];
        for (const patientId of uniquePatientIds.slice(0, 5)) {
          const patientDetails = await mockApi.getPatientById(patientId);
          if (patientDetails) {
            recentPatients.push(patientDetails);
          }
        }

        setDoctorData({
          todayAppointments: appointments,
          pendingAppointments: pendingAppointments,
          recentPatients: recentPatients,
          stats: {
            totalPatients: uniquePatientIds.length,
            todayAppointments: appointments.length,
            pendingAppointments: pendingAppointments.length,
            completedAppointments: allAppointments.filter(
              (app) => app.status === "completed"
            ).length,
          },
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  if (loading) {
    return <AnimationContainer type="loading" height="400px" />;
  }

  return (
    <div>
      <h1>Doctor Dashboard</h1>

      {/* Stats */}
      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatIcon color="#4A90E2">
            <FaUserInjured />
          </StatIcon>
          <StatContent>
            <StatValue>{doctorData.stats.totalPatients}</StatValue>
            <StatLabel>Total Patients</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatIcon color="#50C878">
            <FaCalendarAlt />
          </StatIcon>
          <StatContent>
            <StatValue>{doctorData.stats.todayAppointments}</StatValue>
            <StatLabel>Today's Appointments</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatIcon color="#F5A623">
            <FaClock />
          </StatIcon>
          <StatContent>
            <StatValue>{doctorData.stats.pendingAppointments}</StatValue>
            <StatLabel>Pending Appointments</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatIcon color="#4CAF50">
            <FaCheck />
          </StatIcon>
          <StatContent>
            <StatValue>{doctorData.stats.completedAppointments}</StatValue>
            <StatLabel>Completed Appointments</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <GridContainer>
        <Card>
          <SectionHeader>
            <SectionTitle>Today's Appointments</SectionTitle>
            <ViewAllLink to="/dashboard/appointments">
              View All <FaArrowRight />
            </ViewAllLink>
          </SectionHeader>

          <AppointmentsList>
            {doctorData.todayAppointments.length > 0 ? (
              doctorData.todayAppointments.map((appointment) => (
                <AppointmentItem key={appointment._id}>
                  <AppointmentTime>
                    <AppointmentDate>
                      {formatDate(appointment.appointmentDate)}
                    </AppointmentDate>
                    <AppointmentHour>
                      {formatTime(appointment.startTime)}
                    </AppointmentHour>
                  </AppointmentTime>

                  <AppointmentInfo>
                    <AppointmentTitle>
                      {appointment.reason || "Consultation"}
                    </AppointmentTitle>
                    <AppointmentPatient>
                      {appointment.patient?.name || "Unknown Patient"}
                    </AppointmentPatient>
                  </AppointmentInfo>

                  <AppointmentStatus status={appointment.status}>
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </AppointmentStatus>
                </AppointmentItem>
              ))
            ) : (
              <p>No appointments scheduled for today.</p>
            )}
          </AppointmentsList>
        </Card>

        <div>
          <QuickActionsContainer>
            <Link
              to="/dashboard/appointments"
              style={{ textDecoration: "none" }}
            >
              <QuickActionCard>
                <QuickActionIcon color="#4A90E2">
                  <FaCalendarAlt />
                </QuickActionIcon>
                <QuickActionTitle>Appointments</QuickActionTitle>
                <QuickActionDescription>
                  Manage your appointments
                </QuickActionDescription>
              </QuickActionCard>
            </Link>

            <Link to="/dashboard/patients" style={{ textDecoration: "none" }}>
              <QuickActionCard>
                <QuickActionIcon color="#50C878">
                  <FaUserInjured />
                </QuickActionIcon>
                <QuickActionTitle>Patients</QuickActionTitle>
                <QuickActionDescription>
                  View patient records
                </QuickActionDescription>
              </QuickActionCard>
            </Link>

            <Link
              to="/dashboard/medical-records"
              style={{ textDecoration: "none" }}
            >
              <QuickActionCard>
                <QuickActionIcon color="#F5A623">
                  <FaFileMedical />
                </QuickActionIcon>
                <QuickActionTitle>Medical Records</QuickActionTitle>
                <QuickActionDescription>
                  Access medical files
                </QuickActionDescription>
              </QuickActionCard>
            </Link>

            <Link
              to="/dashboard/doctor-telemedicine"
              style={{ textDecoration: "none" }}
            >
              <QuickActionCard>
                <QuickActionIcon color="#9C27B0">
                  <FaVideo />
                </QuickActionIcon>
                <QuickActionTitle>Telemedicine</QuickActionTitle>
                <QuickActionDescription>
                  Virtual consultations
                </QuickActionDescription>
              </QuickActionCard>
            </Link>
          </QuickActionsContainer>
        </div>
      </GridContainer>

      <GridContainer>
        <Card>
          <SectionHeader>
            <SectionTitle>Pending Appointments</SectionTitle>
            <ViewAllLink to="/dashboard/appointments">
              View All <FaArrowRight />
            </ViewAllLink>
          </SectionHeader>

          <AppointmentsList>
            {doctorData.pendingAppointments.length > 0 ? (
              doctorData.pendingAppointments.slice(0, 5).map((appointment) => (
                <AppointmentItem key={appointment._id}>
                  <AppointmentTime>
                    <AppointmentDate>
                      {formatDate(appointment.appointmentDate)}
                    </AppointmentDate>
                    <AppointmentHour>
                      {formatTime(appointment.startTime)}
                    </AppointmentHour>
                  </AppointmentTime>

                  <AppointmentInfo>
                    <AppointmentTitle>
                      {appointment.reason || "Consultation"}
                    </AppointmentTitle>
                    <AppointmentPatient>
                      {appointment.patient?.name || "Unknown Patient"}
                    </AppointmentPatient>
                  </AppointmentInfo>

                  <AppointmentStatus status={appointment.status}>
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </AppointmentStatus>
                </AppointmentItem>
              ))
            ) : (
              <p>No pending appointments.</p>
            )}
          </AppointmentsList>
        </Card>

        <Card>
          <SectionHeader>
            <SectionTitle>Recent Patients</SectionTitle>
            <ViewAllLink to="/dashboard/patients">
              View All <FaArrowRight />
            </ViewAllLink>
          </SectionHeader>

          {doctorData.recentPatients.length > 0 ? (
            doctorData.recentPatients.map((patient) => (
              <PatientCard key={patient._id}>
                <PatientAvatar>
                  <FaUserInjured />
                </PatientAvatar>

                <PatientInfo>
                  <PatientName>{patient.name}</PatientName>
                  <PatientDetails>
                    {patient.gender},{" "}
                    {patient.dateOfBirth &&
                      new Date().getFullYear() -
                        new Date(patient.dateOfBirth).getFullYear()}{" "}
                    years
                  </PatientDetails>
                </PatientInfo>

                <ActionButton to={`/dashboard/patients/${patient._id}`}>
                  <FaArrowRight />
                </ActionButton>
              </PatientCard>
            ))
          ) : (
            <p>No recent patients.</p>
          )}
        </Card>
      </GridContainer>
    </div>
  );
};

export default DoctorDashboard;
