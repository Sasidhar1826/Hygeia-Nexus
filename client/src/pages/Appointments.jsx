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
  FaMoneyBillWave,
  FaFlask,
  FaVial,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import api from "../services/api";
import mockApi from "../services/mockApi";
import { useAuth } from "../context/AuthContext";

// Initialize the localizer
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

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.status.success};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(2)};
`;

const LabOrdersSection = styled.div`
  margin-top: ${(props) => props.theme.spacing(4)};
`;

const LabOrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const LabOrderCard = styled.div`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
`;

const LabOrderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary.main};
`;

const LabOrderInfo = styled.div`
  flex: 1;
`;

const LabOrderTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 4px;
`;

const LabOrderStatus = styled.span`
  font-size: 0.85rem;
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return props.theme.colors.status.warning + "20";
      case "in_progress":
        return props.theme.colors.primary.main + "20";
      case "completed":
        return props.theme.colors.status.success + "20";
      default:
        return props.theme.colors.status.info + "20";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "pending":
        return props.theme.colors.status.warning;
      case "in_progress":
        return props.theme.colors.primary.main;
      case "completed":
        return props.theme.colors.status.success;
      default:
        return props.theme.colors.status.info;
    }
  }};
`;

const LabOrderDetails = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const appointmentTypes = [
  { name: "In-Person", color: "#4A90E2" },
  { name: "Video Call", color: "#9C27B0" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [labOrders, setLabOrders] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, [user, statusFilter, typeFilter, dateFilter]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        fetchAppointments();

        // Fetch lab orders if user is a patient
        if (user && user.role === "patient") {
          try {
            const labOrdersResponse = await mockApi.getLabOrders({
              patient: user._id,
            });
            console.log("Fetched lab orders:", labOrdersResponse);
            setLabOrders(labOrdersResponse);
          } catch (error) {
            console.error("Error fetching lab orders:", error);
            setLabOrders([]);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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

      // Use user ID for filtering if the user is a patient or doctor
      if (user.role === "patient") {
        queryParams.patient = user._id;
      } else if (user.role === "doctor") {
        queryParams.doctor = user._id;
      }

      // Use mockApi instead of direct API call
      const response = await mockApi.getAppointments(queryParams);
      console.log("Retrieved appointments:", response);

      // Transform appointments for calendar
      const formattedAppointments = response.map((appointment) => {
        // Parse date and time correctly
        let startDateTime, endDateTime;

        try {
          const datePart = appointment.appointmentDate;
          // Handle different time formats
          const startTimePart = appointment.startTime;
          const endTimePart = appointment.endTime;

          // Create date objects
          if (startTimePart.includes("AM") || startTimePart.includes("PM")) {
            // 12-hour format with AM/PM
            startDateTime = moment(
              `${datePart} ${startTimePart}`,
              "YYYY-MM-DD hh:mm A"
            ).toDate();
            endDateTime = moment(
              `${datePart} ${endTimePart}`,
              "YYYY-MM-DD hh:mm A"
            ).toDate();
          } else {
            // 24-hour format
            startDateTime = moment(
              `${datePart} ${startTimePart}`,
              "YYYY-MM-DD HH:mm"
            ).toDate();
            endDateTime = moment(
              `${datePart} ${endTimePart}`,
              "YYYY-MM-DD HH:mm"
            ).toDate();
          }
        } catch (err) {
          console.error("Error parsing date/time:", err, appointment);
          // Fallback to a default date if parsing fails
          startDateTime = new Date();
          endDateTime = new Date();
          endDateTime.setHours(endDateTime.getHours() + 1);
        }

        console.log("Parsed appointment:", {
          id: appointment._id,
          date: appointment.appointmentDate,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          parsedStart: startDateTime,
          parsedEnd: endDateTime,
        });

        return {
          id: appointment._id,
          title:
            user.role === "patient"
              ? `Dr. ${appointment.doctor?.name || "Unknown"} - ${
                  appointment.reason || "Consultation"
                }`
              : `${appointment.patient?.name || "Unknown"} - ${
                  appointment.reason || "Consultation"
                }`,
          start: startDateTime,
          end: endDateTime,
          type: appointment.type || "in-person",
          status: appointment.status || "pending",
          resource: appointment,
        };
      });

      console.log(
        "Formatted appointments for calendar:",
        formattedAppointments
      );
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
      setIsSubmitting(true);

      // Use mockApi to update the appointment
      const updatedAppointment = await mockApi.updateAppointment(
        selectedAppointment._id,
        {
          ...selectedAppointment,
          status: "cancelled",
        }
      );

      // Update the local state to reflect the change
      const updatedAppointments = appointments.map((app) =>
        app.id === selectedAppointment._id
          ? {
              ...app,
              status: "cancelled",
              resource: updatedAppointment,
            }
          : app
      );

      setAppointments(updatedAppointments);
      setIsSubmitting(false);
      handleCloseModal();

      // Show success message
      setSuccessMessage("Appointment cancelled successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      setErrorMessage("Failed to cancel appointment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleConfirmAppointment = async () => {
    try {
      setIsSubmitting(true);

      // Use mockApi to update the appointment
      const updatedAppointment = await mockApi.updateAppointment(
        selectedAppointment._id,
        {
          ...selectedAppointment,
          status: "confirmed",
        }
      );

      // Update the local state to reflect the change
      const updatedAppointments = appointments.map((app) =>
        app.id === selectedAppointment._id
          ? {
              ...app,
              status: "confirmed",
              resource: updatedAppointment,
            }
          : app
      );

      setAppointments(updatedAppointments);
      setIsSubmitting(false);
      handleCloseModal();

      // Show success message
      setSuccessMessage("Appointment confirmed successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error confirming appointment:", error);
      setErrorMessage("Failed to confirm appointment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleCompleteAppointment = async () => {
    try {
      setIsSubmitting(true);

      // Use mockApi to update the appointment
      const updatedAppointment = await mockApi.updateAppointment(
        selectedAppointment._id,
        {
          ...selectedAppointment,
          status: "completed",
        }
      );

      // Update the local state to reflect the change
      const updatedAppointments = appointments.map((app) =>
        app.id === selectedAppointment._id
          ? {
              ...app,
              status: "completed",
              resource: updatedAppointment,
            }
          : app
      );

      setAppointments(updatedAppointments);
      setIsSubmitting(false);
      handleCloseModal();

      // Show success message
      setSuccessMessage("Appointment marked as completed");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error completing appointment:", error);
      setErrorMessage("Failed to complete appointment. Please try again.");
      setIsSubmitting(false);
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

    // Adjust colors based on status
    if (event.status === "cancelled") {
      opacity = 0.5;
    } else if (event.status === "completed") {
      opacity = 0.7;
    } else if (event.status === "pending") {
      backgroundColor = "#F9A825"; // Yellow/orange for pending
    } else if (event.status === "confirmed") {
      // Keep default color but add a border
      return {
        style: {
          backgroundColor,
          opacity,
          borderLeft: "4px solid #43A047",
          borderRadius: "4px",
        },
      };
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
        {user.role === "patient" && (
          <Button variant="primary" to="/dashboard/doctors">
            <FaPlus />
            Book New Appointment
          </Button>
        )}
      </TopBar>

      {successMessage && (
        <SuccessMessage>
          <FaCheckCircle />
          {successMessage}
        </SuccessMessage>
      )}

      {errorMessage && (
        <ErrorMessage>
          <FaInfoCircle />
          {errorMessage}
        </ErrorMessage>
      )}

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
        <AppointmentType>
          <ColorIndicator color="#F9A825" />
          <span>Pending</span>
        </AppointmentType>
        <AppointmentType>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ColorIndicator
              color="#4A90E2"
              style={{ borderLeft: "4px solid #43A047" }}
            />
            <span>Confirmed</span>
          </div>
        </AppointmentType>
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
                  {selectedAppointment.startTime} -{selectedAppointment.endTime}
                </DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                <FaUserMd />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Doctor</DetailLabel>
                <DetailValue>
                  {selectedAppointment.doctor?.name
                    ? `Dr. ${selectedAppointment.doctor.name}`
                    : "Not assigned"}
                </DetailValue>
                <DetailValue style={{ fontSize: "0.9rem", color: "#666" }}>
                  {selectedAppointment.doctor?.specialization || ""}
                </DetailValue>
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                <FaUser />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Patient</DetailLabel>
                <DetailValue>
                  {selectedAppointment.patient?.name || "Unknown"}
                </DetailValue>
              </DetailContent>
            </AppointmentDetail>

            {selectedAppointment.department &&
              selectedAppointment.department.name && (
                <AppointmentDetail>
                  <DetailIcon>
                    <FaHospital />
                  </DetailIcon>
                  <DetailContent>
                    <DetailLabel>Department</DetailLabel>
                    <DetailValue>
                      {selectedAppointment.department.name}
                    </DetailValue>
                  </DetailContent>
                </AppointmentDetail>
              )}

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
                <DetailValue>
                  {selectedAppointment.reason || "Not specified"}
                </DetailValue>
              </DetailContent>
            </AppointmentDetail>

            {selectedAppointment.paymentStatus && (
              <AppointmentDetail>
                <DetailIcon>
                  <FaMoneyBillWave />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Payment Status</DetailLabel>
                  <DetailValue>
                    <StatusBadge status={selectedAppointment.paymentStatus}>
                      {selectedAppointment.paymentStatus
                        .charAt(0)
                        .toUpperCase() +
                        selectedAppointment.paymentStatus.slice(1)}
                    </StatusBadge>
                    {selectedAppointment.paymentAmount > 0 &&
                      ` - $${selectedAppointment.paymentAmount}`}
                  </DetailValue>
                </DetailContent>
              </AppointmentDetail>
            )}

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
                    disabled={user.role !== "doctor" && user.role !== "admin"}
                  >
                    <FaCheckCircle />
                    Confirm
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={handleCancelAppointment}
                    disabled={
                      user.role !== "doctor" &&
                      user.role !== "admin" &&
                      user.role !== "patient"
                    }
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
                    disabled={user.role !== "doctor" && user.role !== "admin"}
                  >
                    <FaCheckCircle />
                    Mark as Completed
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={handleCancelAppointment}
                    disabled={
                      user.role !== "doctor" &&
                      user.role !== "admin" &&
                      user.role !== "patient"
                    }
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

      {/* Lab Orders Section */}
      {user && user.role === "patient" && (
        <LabOrdersSection>
          <h2>
            <FaFlask style={{ marginRight: "8px" }} />
            Lab Tests
          </h2>

          {labOrders.length > 0 ? (
            <LabOrdersList>
              {labOrders.map((order) => (
                <LabOrderCard key={order._id}>
                  <LabOrderIcon>
                    <FaVial />
                  </LabOrderIcon>
                  <LabOrderInfo>
                    <LabOrderTitle>{order.testType}</LabOrderTitle>
                    <LabOrderDetails>
                      Requested by: {order.doctor?.name || "Unknown Doctor"} |
                      {new Date(order.requestedDate).toLocaleDateString()}
                    </LabOrderDetails>
                  </LabOrderInfo>
                  <LabOrderStatus status={order.status}>
                    {order.status === "pending" && "Pending"}
                    {order.status === "in_progress" && "In Progress"}
                    {order.status === "completed" && "Completed"}
                  </LabOrderStatus>
                </LabOrderCard>
              ))}
            </LabOrdersList>
          ) : (
            <p>No lab tests have been ordered for you.</p>
          )}
        </LabOrdersSection>
      )}
    </PageContainer>
  );
};

export default Appointments;
