import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEllipsisH,
  FaCalendarAlt,
  FaUserMd,
  FaHospital,
  FaVideo,
  FaUser,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

// Setup the localizer for the calendar
const localizer = momentLocalizer(moment);

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing(2)};
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const CalendarContainer = styled(Card)`
  padding: ${(props) => props.theme.spacing(2)};
  height: 700px;

  .rbc-calendar {
    height: 100%;
  }

  .rbc-header {
    padding: ${(props) => props.theme.spacing(1)};
    background-color: ${(props) => props.theme.colors.background.card};
    font-weight: 600;
  }

  .rbc-event {
    background-color: ${(props) => props.theme.colors.primary.main};
    border-radius: ${(props) => props.theme.borderRadius.small};
    padding: ${(props) => props.theme.spacing(0.5)};
    border: none;
    transition: all ${(props) => props.theme.transitions.default};

    &:hover {
      background-color: ${(props) => props.theme.colors.primary.light};
    }
  }

  .rbc-today {
    background-color: ${(props) => props.theme.colors.background.card}50;
  }

  .rbc-toolbar button {
    color: ${(props) => props.theme.colors.text.primary};
    border-color: ${(props) => props.theme.colors.primary.main};

    &:hover,
    &:active,
    &.rbc-active {
      background-color: ${(props) => props.theme.colors.primary.main};
      color: white;
    }
  }
`;

const AppointmentTypeContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  flex-wrap: wrap;
`;

const AppointmentType = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 14px;
`;

const ColorIndicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

const AppointmentDetailsModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${(props) => props.theme.spacing(2)};
`;

const ModalContent = styled(Card)`
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing(3)};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: ${(props) => props.theme.spacing(2)};
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};

  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const AppointmentDetail = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  align-items: flex-start;
`;

const DetailIcon = styled.div`
  margin-right: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.primary.main};
  width: 24px;
  display: flex;
  justify-content: center;
`;

const DetailContent = styled.div`
  flex: 1;
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const DetailValue = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 600;

  ${(props) => {
    switch (props.status) {
      case "confirmed":
        return `
          background-color: ${props.theme.colors.status.successLight};
          color: ${props.theme.colors.status.success};
        `;
      case "pending":
        return `
          background-color: ${props.theme.colors.status.warningLight};
          color: ${props.theme.colors.status.warning};
        `;
      case "cancelled":
        return `
          background-color: ${props.theme.colors.status.errorLight};
          color: ${props.theme.colors.status.error};
        `;
      case "completed":
        return `
          background-color: ${props.theme.colors.primary.light}50;
          color: ${props.theme.colors.primary.main};
        `;
      default:
        return `
          background-color: ${props.theme.colors.background.paper};
          color: ${props.theme.colors.text.secondary};
        `;
    }
  }}
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(3)};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  padding-top: ${(props) => props.theme.spacing(3)};
`;

const ActionButton = styled(Button)`
  flex: 1;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.status.error};
`;

const appointmentTypes = [
  { name: "In-Person", color: "#4A90E2" },
  { name: "Video Call", color: "#9C27B0" },
];

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
];

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [user, statusFilter, typeFilter, dateFilter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      let queryParams = {};

      if (statusFilter !== "all") {
        queryParams.status = statusFilter;
      }

      if (typeFilter !== "all") {
        queryParams.type = typeFilter;
      }

      if (dateFilter) {
        queryParams.date = moment(dateFilter).format("YYYY-MM-DD");
      }

      const response = await api.get("/appointments", { params: queryParams });

      // Transform appointments for calendar
      const formattedAppointments = response.data.map((appointment) => ({
        id: appointment._id,
        title:
          user.role === "patient"
            ? `Dr. ${appointment.doctor.name} - ${appointment.reason}`
            : `${appointment.patient.name} - ${appointment.reason}`,
        start: new Date(
          appointment.appointmentDate + "T" + appointment.startTime
        ),
        end: new Date(appointment.appointmentDate + "T" + appointment.endTime),
        type: appointment.type,
        status: appointment.status,
        resource: appointment,
      }));

      setAppointments(formattedAppointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments. Please try again later.");
      setLoading(false);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedAppointment(event.resource);
    setShowModal(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    // Navigate to booking page with pre-filled date/time
    // This would be implemented in a real application
    console.log("Selected slot:", { start, end });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = async () => {
    try {
      await api.patch(`/appointments/${selectedAppointment._id}/status`, {
        status: "cancelled",
      });

      // Update the appointments list
      fetchAppointments();
      handleCloseModal();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      // Show error message
    }
  };

  const handleConfirmAppointment = async () => {
    try {
      await api.patch(`/appointments/${selectedAppointment._id}/status`, {
        status: "confirmed",
      });

      // Update the appointments list
      fetchAppointments();
      handleCloseModal();
    } catch (error) {
      console.error("Error confirming appointment:", error);
      // Show error message
    }
  };

  const handleCompleteAppointment = async () => {
    try {
      await api.patch(`/appointments/${selectedAppointment._id}/status`, {
        status: "completed",
      });

      // Update the appointments list
      fetchAppointments();
      handleCloseModal();
    } catch (error) {
      console.error("Error completing appointment:", error);
      // Show error message
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor;
    let opacity = 1;

    // Color based on appointment type
    if (event.type === "video") {
      backgroundColor = "#9C27B0"; // Purple for video calls
    } else {
      backgroundColor = "#4A90E2"; // Blue for in-person
    }

    // Adjust opacity based on status
    if (event.status === "cancelled") {
      opacity = 0.5;
    } else if (event.status === "completed") {
      opacity = 0.7;
    }

    return {
      style: {
        backgroundColor,
        opacity,
      },
    };
  };

  if (loading) {
    return <LoadingMessage>Loading appointments...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <PageContainer>
      <TopBar>
        <h2>Appointment Calendar</h2>
        <Button variant="primary" to="/departments">
          <FaPlus />
          Book New Appointment
        </Button>
      </TopBar>

      <FiltersContainer>
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="in-person">In-Person</option>
          <option value="video">Video Call</option>
        </FilterSelect>

        <input
          type="date"
          value={dateFilter || ""}
          onChange={(e) => setDateFilter(e.target.value || null)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />

        {(statusFilter !== "all" || typeFilter !== "all" || dateFilter) && (
          <Button
            variant="secondary"
            onClick={() => {
              setStatusFilter("all");
              setTypeFilter("all");
              setDateFilter(null);
            }}
          >
            Clear Filters
          </Button>
        )}
      </FiltersContainer>

      <AppointmentTypeContainer>
        {appointmentTypes.map((type) => (
          <AppointmentType key={type.name}>
            <ColorIndicator color={type.color} />
            <span>{type.name}</span>
          </AppointmentType>
        ))}
      </AppointmentTypeContainer>

      <CalendarContainer
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 650 }}
          eventPropGetter={eventStyleGetter}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          popup
          views={["month", "week", "day", "agenda"]}
        />
      </CalendarContainer>

      {showModal && selectedAppointment && (
        <AppointmentDetailsModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Appointment Details</ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>

            <AppointmentDetail>
              <DetailIcon>
                <FaCalendarAlt />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Date & Time</DetailLabel>
                <DetailValue>
                  {moment(selectedAppointment.appointmentDate).format(
                    "dddd, MMMM D, YYYY"
                  )}
                  <br />
                  {selectedAppointment.startTime} -{" "}
                  {selectedAppointment.endTime}
                </DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                <FaUserMd />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Doctor</DetailLabel>
                <DetailValue>Dr. {selectedAppointment.doctor.name}</DetailValue>
                <DetailValue style={{ fontSize: "0.9rem", color: "#666" }}>
                  {selectedAppointment.doctor.specialization}
                </DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                <FaUser />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Patient</DetailLabel>
                <DetailValue>{selectedAppointment.patient.name}</DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                <FaHospital />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Department</DetailLabel>
                <DetailValue>{selectedAppointment.department.name}</DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                {selectedAppointment.type === "video" ? (
                  <FaVideo />
                ) : (
                  <FaUserMd />
                )}
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Appointment Type</DetailLabel>
                <DetailValue>
                  {selectedAppointment.type === "video"
                    ? "Video Call"
                    : "In-Person"}
                </DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                <FaInfoCircle />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Reason</DetailLabel>
                <DetailValue>{selectedAppointment.reason}</DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                <FaMoneyBillWave />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Payment Status</DetailLabel>
                <DetailValue>
                  <StatusBadge status={selectedAppointment.paymentStatus}>
                    {selectedAppointment.paymentStatus.charAt(0).toUpperCase() +
                      selectedAppointment.paymentStatus.slice(1)}
                  </StatusBadge>
                  {selectedAppointment.paymentAmount > 0 &&
                    ` - $${selectedAppointment.paymentAmount}`}
                </DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                <FaCheckCircle />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>
                  <StatusBadge status={selectedAppointment.status}>
                    {selectedAppointment.status.charAt(0).toUpperCase() +
                      selectedAppointment.status.slice(1)}
                  </StatusBadge>
                </DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <ActionButtonsContainer>
              {selectedAppointment.status === "pending" && (
                <>
                  <ActionButton
                    variant="primary"
                    onClick={handleConfirmAppointment}
                    disabled={user.role === "patient"}
                  >
                    <FaCheckCircle />
                    Confirm
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={handleCancelAppointment}
                  >
                    <FaTimesCircle />
                    Cancel
                  </ActionButton>
                </>
              )}

              {selectedAppointment.status === "confirmed" && (
                <>
                  <ActionButton
                    variant="primary"
                    onClick={handleCompleteAppointment}
                    disabled={user.role === "patient"}
                  >
                    <FaCheckCircle />
                    Mark as Completed
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={handleCancelAppointment}
                  >
                    <FaTimesCircle />
                    Cancel
                  </ActionButton>
                </>
              )}

              {(selectedAppointment.status === "cancelled" ||
                selectedAppointment.status === "completed") && (
                <ActionButton variant="secondary" onClick={handleCloseModal}>
                  Close
                </ActionButton>
              )}
            </ActionButtonsContainer>
          </ModalContent>
        </AppointmentDetailsModal>
      )}
    </PageContainer>
  );
};

export default Appointments;
