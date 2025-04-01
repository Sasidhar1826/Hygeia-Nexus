import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaVideo,
  FaPhoneAlt,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`;

const TelemedicineGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${(props) => props.theme.spacing(3)};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const VideoContainer = styled(Card)`
  aspect-ratio: 16 / 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1a1a2e;
  position: relative;
  overflow: hidden;
`;

const VideoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: ${(props) => props.theme.spacing(3)};

  svg {
    font-size: 48px;
    margin-bottom: ${(props) => props.theme.spacing(2)};
    color: ${(props) => props.theme.colors.primary.light};
  }

  h3 {
    margin-bottom: ${(props) => props.theme.spacing(1)};
  }
`;

const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(2)};
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const ControlButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};

  &.primary {
    background-color: ${(props) => props.theme.colors.primary.main};
    color: white;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary.light};
    }
  }

  &.danger {
    background-color: ${(props) => props.theme.colors.status.error};
    color: white;

    &:hover {
      background-color: #d32f2f;
    }
  }

  &.muted {
    background-color: #555;
    color: white;

    &:hover {
      background-color: #666;
    }
  }
`;

const AppointmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const AppointmentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
  border-left: 4px solid
    ${(props) =>
      props.status === "active"
        ? props.theme.colors.status.success
        : props.status === "upcoming"
        ? props.theme.colors.primary.main
        : props.theme.colors.text.disabled};
  transition: transform ${(props) => props.theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
  }
`;

const AppointmentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const PatientAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const PatientInfo = styled.div`
  flex: 1;
`;

const PatientName = styled.h4`
  margin: 0;
  font-size: 16px;
`;

const AppointmentType = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const AppointmentDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing(2)};
`;

const AppointmentDetail = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.secondary};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const StatusBadge = styled.span`
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 12px;
  font-weight: 600;

  &.active {
    background-color: ${(props) => props.theme.colors.status.success}20;
    color: ${(props) => props.theme.colors.status.success};
  }

  &.upcoming {
    background-color: ${(props) => props.theme.colors.primary.main}20;
    color: ${(props) => props.theme.colors.primary.main};
  }

  &.completed {
    background-color: ${(props) => props.theme.colors.text.disabled}20;
    color: ${(props) => props.theme.colors.text.disabled};
  }
`;

const Telemedicine = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isInCall, setIsInCall] = useState(false);

  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      patientInitials: "JD",
      type: "Follow-up Consultation",
      date: "Today",
      time: "10:00 AM",
      status: "active",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      patientInitials: "JS",
      type: "Initial Consultation",
      date: "Today",
      time: "2:30 PM",
      status: "upcoming",
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      patientInitials: "RJ",
      type: "Medication Review",
      date: "Tomorrow",
      time: "11:15 AM",
      status: "upcoming",
    },
    {
      id: 4,
      patientName: "Emily Davis",
      patientInitials: "ED",
      type: "Follow-up Consultation",
      date: "Yesterday",
      time: "3:00 PM",
      status: "completed",
    },
  ];

  const startCall = () => {
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
  };

  return (
    <PageContainer>
      <h2>Telemedicine</h2>

      <TelemedicineGrid>
        <VideoContainer>
          {isInCall ? (
            <video
              src="/video-placeholder.mp4"
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <VideoPlaceholder>
              <FaVideo />
              <h3>Ready for your next appointment</h3>
              <p>Click on an appointment to start a video consultation</p>
            </VideoPlaceholder>
          )}

          {isInCall && (
            <VideoControls>
              <ControlButton
                className={isMicMuted ? "muted" : "primary"}
                onClick={() => setIsMicMuted(!isMicMuted)}
              >
                {isMicMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </ControlButton>

              <ControlButton
                className={isVideoOff ? "muted" : "primary"}
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
              </ControlButton>

              <ControlButton className="danger" onClick={endCall}>
                <FaPhoneAlt />
              </ControlButton>
            </VideoControls>
          )}
        </VideoContainer>

        <AppointmentsContainer>
          <h3>Today's Appointments</h3>

          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              status={appointment.status}
              as={motion.div}
              whileHover={{ x: 5 }}
            >
              <AppointmentHeader>
                <PatientAvatar>{appointment.patientInitials}</PatientAvatar>
                <PatientInfo>
                  <PatientName>{appointment.patientName}</PatientName>
                  <AppointmentType>{appointment.type}</AppointmentType>
                </PatientInfo>
                <StatusBadge className={appointment.status}>
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </StatusBadge>
              </AppointmentHeader>

              <AppointmentDetails>
                <AppointmentDetail>
                  <FaCalendarAlt />
                  <span>{appointment.date}</span>
                </AppointmentDetail>
                <AppointmentDetail>
                  <FaClock />
                  <span>{appointment.time}</span>
                </AppointmentDetail>
              </AppointmentDetails>

              {appointment.status !== "completed" && (
                <Button
                  variant={
                    appointment.status === "active" ? "primary" : "secondary"
                  }
                  onClick={
                    appointment.status === "active" ? startCall : undefined
                  }
                >
                  {appointment.status === "active"
                    ? "Join Call"
                    : "Remind Patient"}
                </Button>
              )}
            </AppointmentCard>
          ))}
        </AppointmentsContainer>
      </TelemedicineGrid>
    </PageContainer>
  );
};

export default Telemedicine;
