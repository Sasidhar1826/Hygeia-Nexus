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
  FaEye,
  FaCheck,
  FaClock,
  FaRegClock,
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

const MedicationList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MedicationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const MedicationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f0f8ff;
  color: #4a90e2;
  font-size: 20px;
  margin-right: 15px;
`;

const MedicationInfo = styled.div`
  flex: 1;
`;

const MedicationName = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const MedicationDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${(props) => props.color || "#E3F2FD"};
  color: ${(props) => props.textColor || "#1565C0"};
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
`;

const RecordsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecordItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const RecordIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f0f8ff;
  color: #4a90e2;
  font-size: 20px;
  margin-right: 15px;
`;

const RecordInfo = styled.div`
  flex: 1;
`;

const RecordTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const RecordDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState({
    upcomingAppointments: [],
    labReports: [],
    medications: [],
    recentRecords: [],
  });
  const { user } = useAuth();

  useEffect(() => {
    // Simulate API loading
    const fetchPatientData = async () => {
      try {
        setLoading(true);

        // Fetch patient's appointments
        const appointments = await mockApi.getAppointments({
          patient: user._id,
          status: ["pending", "confirmed"], // Only get upcoming appointments
        });

        // Sort appointments by date (most recent first)
        const sortedAppointments = appointments.sort(
          (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
        );

        // Format appointments for display
        const formattedAppointments = sortedAppointments.map((appointment) => ({
          id: appointment._id,
          doctorName: appointment.doctor
            ? appointment.doctor.name
            : "Unknown Doctor",
          date: appointment.appointmentDate,
          time: appointment.startTime,
          purpose: appointment.reason || "Consultation",
          department: appointment.department?.name || "General",
          status: appointment.status,
        }));

        // Fetch lab reports for the patient
        const labReports = await mockApi.getLabReports({
          patient: user._id,
        });

        // For now, we'll use mock data for medications and medical records
        // In a real app, these would be fetched from the API as well
        const mockMedications = [
          {
            id: "1",
            name: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
            remaining: 15,
            nextRefill: "2024-04-20",
          },
          {
            id: "2",
            name: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily",
            remaining: 8,
            nextRefill: "2024-04-05",
          },
          {
            id: "3",
            name: "Atorvastatin",
            dosage: "20mg",
            frequency: "Once daily at bedtime",
            remaining: 22,
            nextRefill: "2024-05-10",
          },
        ];

        const mockRecentRecords = [
          {
            id: "1",
            date: "2024-03-15",
            type: "Consultation Notes",
            doctor: "Dr. Sarah Johnson",
            department: "Cardiology",
          },
          {
            id: "2",
            date: "2024-03-01",
            type: "ECG Results",
            doctor: "Dr. Michael Chen",
            department: "Cardiology",
          },
        ];

        // Update the patient data state
        setPatientData({
          upcomingAppointments: formattedAppointments,
          labReports: labReports,
          medications: mockMedications,
          recentRecords: mockRecentRecords,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchPatientData();
    } else {
      setLoading(false);
    }
  }, [user]);

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
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatIcon color="#4A90E2">
            <FaCalendarAlt />
          </StatIcon>
          <StatContent>
            <StatValue>
              {patientData?.upcomingAppointments?.length || 0}
            </StatValue>
            <StatLabel>Upcoming Appointments</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatIcon color="#50C878">
            <FaFileMedical />
          </StatIcon>
          <StatContent>
            <StatValue>{patientData?.recentRecords?.length || 0}</StatValue>
            <StatLabel>Recent Medical Records</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatIcon color="#F5A623">
            <FaFlask />
          </StatIcon>
          <StatContent>
            <StatValue>
              {patientData?.labReports?.filter((r) => r.status === "pending")
                .length || 0}
            </StatValue>
            <StatLabel>Pending Lab Reports</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatIcon color="#E74C3C">
            <FaPrescriptionBottleAlt />
          </StatIcon>
          <StatContent>
            <StatValue>{patientData?.medications?.length || 0}</StatValue>
            <StatLabel>Active Medications</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <SectionHeader>
        <SectionTitle>Upcoming Appointments</SectionTitle>
        <ViewAllLink to="/dashboard/appointments">
          View All <FaArrowRight size={12} />
        </ViewAllLink>
      </SectionHeader>

      <Card>
        <AppointmentsList>
          {patientData?.upcomingAppointments?.map((appointment) => (
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
                  Doctor: {appointment.doctorName} | {appointment.department}
                </AppointmentPatient>
              </AppointmentInfo>
              <AppointmentStatus status={appointment.status}>
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </AppointmentStatus>
            </AppointmentItem>
          ))}
          {(!patientData?.upcomingAppointments ||
            patientData.upcomingAppointments.length === 0) && (
            <div
              style={{ padding: "1rem", textAlign: "center", color: "#666" }}
            >
              No upcoming appointments.{" "}
              <Link to="/dashboard/doctors" style={{ color: "#3182ce" }}>
                Schedule one now
              </Link>
            </div>
          )}
        </AppointmentsList>
      </Card>

      <SectionHeader>
        <SectionTitle>My Medications</SectionTitle>
        <ViewAllLink to="/dashboard/prescriptions">
          View All <FaArrowRight size={12} />
        </ViewAllLink>
      </SectionHeader>

      <Card>
        <MedicationList>
          {patientData?.medications?.map((medication) => (
            <MedicationItem key={medication.id}>
              <MedicationIcon>
                <FaPrescriptionBottleAlt />
              </MedicationIcon>
              <MedicationInfo>
                <MedicationName>
                  {medication.name} {medication.dosage}
                  {medication.remaining <= 10 && (
                    <Badge color="#FFECB3" textColor="#E65100">
                      <FaRegClock style={{ marginRight: "4px" }} /> Refill soon
                    </Badge>
                  )}
                </MedicationName>
                <MedicationDetails>
                  {medication.frequency} | {medication.remaining} days remaining
                </MedicationDetails>
              </MedicationInfo>
            </MedicationItem>
          ))}
          {(!patientData?.medications ||
            patientData.medications.length === 0) && (
            <div
              style={{ padding: "1rem", textAlign: "center", color: "#666" }}
            >
              No active medications.
            </div>
          )}
        </MedicationList>
      </Card>

      <SectionHeader>
        <SectionTitle>Recent Lab Reports</SectionTitle>
        <ViewAllLink to="/dashboard/lab-reports">
          View All <FaArrowRight size={12} />
        </ViewAllLink>
      </SectionHeader>

      <Card>
        <AppointmentsList>
          {patientData?.labReports?.map((report) => (
            <AppointmentItem key={report._id || report.id}>
              <AppointmentTime>
                <AppointmentDate>
                  {formatDate(report.requestedDate || report.date)}
                </AppointmentDate>
                <AppointmentHour>
                  {report.status === "completed" ? <FaCheck /> : <FaClock />}
                </AppointmentHour>
              </AppointmentTime>
              <AppointmentInfo>
                <AppointmentTitle>
                  {report.type || report.testType}
                </AppointmentTitle>
                <AppointmentPatient>
                  Technician:{" "}
                  {report.technician
                    ? typeof report.technician === "object"
                      ? report.technician.name
                      : report.technician
                    : "Not assigned"}
                </AppointmentPatient>
              </AppointmentInfo>
              <AppointmentStatus
                status={report.status === "completed" ? "completed" : "pending"}
              >
                {report.status
                  ? report.status.charAt(0).toUpperCase() +
                    report.status.slice(1)
                  : "Pending"}
              </AppointmentStatus>
            </AppointmentItem>
          ))}
          {(!patientData?.labReports ||
            patientData.labReports.length === 0) && (
            <div
              style={{ padding: "1rem", textAlign: "center", color: "#666" }}
            >
              No lab reports found.
            </div>
          )}
        </AppointmentsList>
      </Card>

      <SectionHeader>
        <SectionTitle>Recent Medical Records</SectionTitle>
        <ViewAllLink to="/dashboard/medical-records">
          View All <FaArrowRight size={12} />
        </ViewAllLink>
      </SectionHeader>

      <Card>
        <RecordsList>
          {patientData?.recentRecords?.map((record) => (
            <RecordItem key={record.id}>
              <RecordIcon>
                <FaFileMedical />
              </RecordIcon>
              <RecordInfo>
                <RecordTitle>{record.type}</RecordTitle>
                <RecordDetails>
                  {formatDate(record.date)} | {record.doctor} |{" "}
                  {record.department}
                </RecordDetails>
              </RecordInfo>
              <Link to={`/dashboard/medical-records/${record.id}`}>
                <FaEye style={{ color: "#4A90E2" }} />
              </Link>
            </RecordItem>
          ))}
          {(!patientData?.recentRecords ||
            patientData.recentRecords.length === 0) && (
            <div
              style={{ padding: "1rem", textAlign: "center", color: "#666" }}
            >
              No recent medical records found.
            </div>
          )}
        </RecordsList>
      </Card>
    </div>
  );
};

export default PatientDashboard;
