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
  FaTools,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import api from "../services/apiService";
import { toast } from "react-hot-toast";
import { diagnoseAppointment } from "../services/api";

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
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rejected", label: "Rejected" },
  { value: "no-show", label: "No-Show" },
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
            const labOrdersResponse = await api.getLabs({
              patient: user._id,
              status: "ordered", // Only get ordered lab tests
            });
            console.log("Fetched lab orders:", labOrdersResponse);
            // Ensure we have an array, even if empty
            setLabOrders(
              Array.isArray(labOrdersResponse) ? labOrdersResponse : []
            );
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
      if (user && user.role === "patient") {
        queryParams.patient = user._id;
      } else if (user && user.role === "doctor") {
        queryParams.doctor = user._id;
      }

      console.log("Fetching appointments with params:", queryParams);

      // Fetch appointments from api
      const data = await api.getAppointments(queryParams);
      console.log("Raw appointment data:", data);

      // Ensure data is an array before setting it
      let appointmentArray = Array.isArray(data) ? data : [];

      // Handle object response with data property
      if (
        !Array.isArray(data) &&
        data &&
        typeof data === "object" &&
        data.data
      ) {
        appointmentArray = Array.isArray(data.data) ? data.data : [];
      }

      // Transform appointments for the calendar (adding start and end Date objects)
      appointmentArray = appointmentArray
        .map((appointment) => {
          // Ensure we have valid appointment data
          if (!appointment || !appointment.appointmentDate) {
            console.warn("Invalid appointment data:", appointment);
            return null;
          }

          try {
            // Create start Date object combining appointmentDate and startTime
            const startDateTime = moment(
              `${moment(appointment.appointmentDate).format("YYYY-MM-DD")} ${
                appointment.startTime
              }`,
              "YYYY-MM-DD HH:mm"
            ).toDate();

            // Create end Date object combining appointmentDate and endTime
            const endDateTime = moment(
              `${moment(appointment.appointmentDate).format("YYYY-MM-DD")} ${
                appointment.endTime
              }`,
              "YYYY-MM-DD HH:mm"
            ).toDate();

            // Add fallback data for doctor and patient if missing
            let doctor = appointment.doctor;
            if (!doctor || (typeof doctor === "object" && !doctor.name)) {
              doctor = {
                name: doctor?.name || "Unknown Doctor",
                _id: doctor?._id || "unknown",
                specialty: doctor?.specialty || "General",
                email: doctor?.email || "",
                profileImage: doctor?.profileImage || "",
              };
            }

            let patient = appointment.patient;
            if (!patient || (typeof patient === "object" && !patient.name)) {
              patient = {
                name: patient?.name || "Unknown Patient",
                _id: patient?._id || "unknown",
                email: patient?.email || "",
                profileImage: patient?.profileImage || "",
              };
            }

            // Create a descriptive title for the appointment
            let title = "Appointment";
            if (appointment.reason) {
              title = appointment.reason;
            }

            // Add doctor/patient information to title if available
            if (doctor && doctor.name) {
              title = `${title} with Dr. ${doctor.name}`;
            } else if (patient && patient.name) {
              title = `${title} for ${patient.name}`;
            }

            return {
              ...appointment,
              doctor,
              patient,
              title,
              start: startDateTime,
              end: endDateTime,
              resource: {
                ...appointment,
                doctor,
                patient,
              }, // Store the original appointment data with fallbacks
            };
          } catch (error) {
            console.error("Error processing appointment:", appointment, error);
            return null;
          }
        })
        .filter((appointment) => appointment !== null); // Remove any null appointments

      console.log("Transformed appointments for calendar:", appointmentArray);
      setAppointments(appointmentArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments. Please try again later.");
      setLoading(false);
      setAppointments([]);
    }
  };

  const handleSelectEvent = (event) => {
    // Check if we have resource data (original appointment data)
    const appointmentData = event.resource || event;
    console.log("Selected appointment:", appointmentData);

    // Set initial data to show the modal quickly
    setSelectedAppointment(appointmentData);
    setShowModal(true);

    // Then try to refetch with complete data if needed
    const refetchIfIncomplete = async () => {
      try {
        // Check if doctor or patient data is incomplete
        if (appointmentData && appointmentData._id) {
          const needsRefetch =
            (appointmentData.doctor &&
              (typeof appointmentData.doctor === "string" ||
                (typeof appointmentData.doctor === "object" &&
                  !appointmentData.doctor.name))) ||
            (appointmentData.patient &&
              (typeof appointmentData.patient === "string" ||
                (typeof appointmentData.patient === "object" &&
                  !appointmentData.patient.name)));

          if (needsRefetch) {
            setLoading(true);
            const fullAppointmentData = await api.refetchAppointmentIfNeeded(
              appointmentData
            );
            console.log(
              "Refetched appointment with complete data:",
              fullAppointmentData
            );
            setSelectedAppointment(fullAppointmentData);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error refetching appointment details:", error);
        // Keep using the original data if refetch fails
        setLoading(false);
      }
    };

    refetchIfIncomplete();
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

  const handleCancelAppointment = async (appointmentId) => {
    try {
      // For confirmed appointments, ask for confirmation and reason
      const appointmentToCancel = appointments.find(
        (app) => app._id === appointmentId
      );

      let cancellationReason = "";
      if (appointmentToCancel.status === "confirmed") {
        if (
          !confirm(
            "Are you sure you want to cancel this confirmed appointment?"
          )
        ) {
          return; // User cancelled the operation
        }
        cancellationReason = prompt(
          "Please provide a reason for cancellation (optional):"
        );
      }

      await api.cancelAppointment(appointmentId, cancellationReason);

      // Update appointments state
      if (Array.isArray(appointments)) {
        setAppointments(
          appointments.map((apt) =>
            apt._id === appointmentId ? { ...apt, status: "cancelled" } : apt
          )
        );
      }

      toast.success("Appointment cancelled successfully");

      // Close modal if it's open
      if (showModal && selectedAppointment?._id === appointmentId) {
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const handleConfirmAppointment = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // Use the new acceptAppointment function
      const updatedAppointment = await api.acceptAppointment(
        selectedAppointment._id,
        "Appointment confirmed by doctor"
      );

      // Update the local state to reflect the change
      if (Array.isArray(appointments)) {
        const updatedAppointments = appointments.map((app) =>
          app._id === selectedAppointment._id
            ? {
                ...app,
                status: "confirmed",
                resource: updatedAppointment,
              }
            : app
        );

        setAppointments(updatedAppointments);
      }

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

  const handleRejectAppointment = async () => {
    try {
      // First, prompt for a reason
      const reason = prompt(
        "Please provide a reason for rejecting this appointment:"
      );
      if (!reason) {
        // User cancelled or provided no reason
        return;
      }

      setIsSubmitting(true);
      setErrorMessage("");

      // Use the new rejectAppointment function
      const updatedAppointment = await api.rejectAppointment(
        selectedAppointment._id,
        reason
      );

      // Update the local state to reflect the change
      if (Array.isArray(appointments)) {
        const updatedAppointments = appointments.map((app) =>
          app._id === selectedAppointment._id
            ? {
                ...app,
                status: "rejected",
                resource: updatedAppointment,
              }
            : app
        );

        setAppointments(updatedAppointments);
      }

      setIsSubmitting(false);
      handleCloseModal();

      // Show success message
      setSuccessMessage("Appointment rejected successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      setErrorMessage("Failed to reject appointment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleCompleteAppointment = async () => {
    try {
      setIsSubmitting(true);

      // Use the new completeAppointment function
      const updatedAppointment = await api.completeAppointment(
        selectedAppointment._id,
        "Appointment completed by doctor"
      );

      // Update the local state to reflect the change
      if (Array.isArray(appointments)) {
        const updatedAppointments = appointments.map((app) =>
          app._id === selectedAppointment._id
            ? {
                ...app,
                status: "completed",
                resource: updatedAppointment,
              }
            : app
        );

        setAppointments(updatedAppointments);
      }

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

  const handleMarkNoShow = async () => {
    try {
      setIsSubmitting(true);

      // Use the new markAppointmentNoShow function
      const updatedAppointment = await api.markAppointmentNoShow(
        selectedAppointment._id,
        "Patient did not show up for the appointment"
      );

      // Update the local state to reflect the change
      if (Array.isArray(appointments)) {
        const updatedAppointments = appointments.map((app) =>
          app._id === selectedAppointment._id
            ? {
                ...app,
                status: "no-show",
                resource: updatedAppointment,
              }
            : app
        );

        setAppointments(updatedAppointments);
      }

      setIsSubmitting(false);
      handleCloseModal();

      // Show success message
      setSuccessMessage("Appointment marked as no-show");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error marking appointment as no-show:", error);
      setErrorMessage("Failed to mark as no-show. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleDiagnoseAppointment = async (appointmentId) => {
    // Only show this function for admin users
    if (user.userType !== "admin") {
      toast.info("Only admin users can diagnose appointments");
      return;
    }

    try {
      setLoading(true);
      const result = await diagnoseAppointment(appointmentId);

      // Show a modal with the diagnostic information
      toast.success("Diagnostic information retrieved");

      // Create a formatted message with the diagnostic info
      const diagnosticInfo = result.diagnostic;

      const formattedDiagnostic = `
        ## Appointment Diagnostic (ID: ${diagnosticInfo.appointmentId})
        
        **Current Status:** ${diagnosticInfo.currentStatus}
        **Stored Old Status:** ${diagnosticInfo.storedOldStatus || "None"}
        
        ### References
        - Has Broken References: ${
          diagnosticInfo.references.hasBrokenReferences ? "Yes" : "No"
        }
        - Doctor Exists: ${
          diagnosticInfo.references.doctorExists ? "Yes" : "No"
        }
        - Patient Exists: ${
          diagnosticInfo.references.patientExists ? "Yes" : "No"
        }
        ${
          diagnosticInfo.references.issues.length > 0
            ? `- Issues: ${diagnosticInfo.references.issues.join(", ")}`
            : ""
        }
        
        ### Valid Transitions
        Current status (${diagnosticInfo.currentStatus}) can transition to: ${
        diagnosticInfo.validTransitionsForCurrentStatus.length > 0
          ? diagnosticInfo.validTransitionsForCurrentStatus.join(", ")
          : "None"
      }
        
        ### Status History
        ${diagnosticInfo.statusHistory
          .map(
            (entry, i) =>
              `${i + 1}. ${entry.status} (${new Date(
                entry.timestamp
              ).toLocaleString()}) by ${entry.userType} - ${
                entry.notes || "No notes"
              }`
          )
          .join("\n")}
      `;

      // Alert with diagnostic info
      alert(formattedDiagnostic);

      console.log("Diagnostic information:", diagnosticInfo);
    } catch (error) {
      console.error("Error diagnosing appointment:", error);
      toast.error(`Error diagnosing appointment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor;
    let opacity = 1;
    let borderLeft = "none";

    // Color based on appointment type
    if (event.type === "telemedicine" || event.type === "video") {
      backgroundColor = "#9C27B0"; // Purple for video calls
    } else {
      backgroundColor = "#4A90E2"; // Blue for in-person
    }

    // Adjust colors based on status
    switch (event.status) {
      case "pending":
        backgroundColor = "#F9A825"; // Yellow/orange for pending
        break;
      case "confirmed":
        // Keep default color based on type but add green border
        borderLeft = "4px solid #43A047"; // Green border
        break;
      case "completed":
        opacity = 0.7;
        break;
      case "cancelled":
        backgroundColor = "#9E9E9E"; // Gray for cancelled
        opacity = 0.5;
        break;
      case "rejected":
        backgroundColor = "#F44336"; // Red for rejected
        opacity = 0.5;
        break;
      case "no-show":
        backgroundColor = "#795548"; // Brown for no-show
        opacity = 0.5;
        break;
    }

    // Return style with calculated properties
    return {
      style: {
        backgroundColor,
        opacity,
        borderLeft,
        borderRadius: "4px",
      },
    };
  };

  const renderActionButtons = (appointment) => {
    if (!appointment) return null;

    const canAccept =
      user.userType === "doctor" &&
      appointment.status === "pending" &&
      user._id === appointment.doctor?._id;

    const canReject =
      user.userType === "doctor" &&
      appointment.status === "pending" &&
      user._id === appointment.doctor?._id;

    const canComplete =
      user.userType === "doctor" &&
      appointment.status === "confirmed" &&
      user._id === appointment.doctor?._id;

    const canCancel =
      (appointment.status === "pending" ||
        appointment.status === "confirmed") &&
      (user.userType === "admin" ||
        (user.userType === "doctor" && user._id === appointment.doctor?._id) ||
        (user.userType === "patient" && user._id === appointment.patient?._id));

    const canMarkNoShow =
      user.userType === "doctor" &&
      appointment.status === "confirmed" &&
      user._id === appointment.doctor?._id;

    const hasStatusActions =
      canAccept || canReject || canComplete || canCancel || canMarkNoShow;

    return (
      <div className="action-buttons">
        {canAccept && (
          <button
            className="btn btn-success btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleAcceptAppointment(appointment);
            }}
          >
            <i className="fas fa-check"></i> Accept
          </button>
        )}

        {canReject && (
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleRejectAppointmentClick(appointment);
            }}
          >
            <i className="fas fa-times"></i> Reject
          </button>
        )}

        {canComplete && (
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleCompleteAppointment(appointment);
            }}
          >
            <i className="fas fa-check-circle"></i> Complete
          </button>
        )}

        {canCancel && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleCancelAppointmentClick(appointment);
            }}
          >
            <i className="fas fa-ban"></i> Cancel
          </button>
        )}

        {canMarkNoShow && (
          <button
            className="btn btn-warning btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleNoShowAppointment(appointment);
            }}
          >
            <i className="fas fa-user-slash"></i> No-Show
          </button>
        )}

        {/* Add Diagnostic button for admin users */}
        {user.userType === "admin" && (
          <button
            className="btn btn-info btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDiagnoseAppointment(appointment._id);
            }}
            title="Diagnose appointment issues"
          >
            <i className="fas fa-stethoscope"></i> Diagnose
          </button>
        )}

        {/* Show a message if no actions are available */}
        {!hasStatusActions && user.userType !== "admin" && (
          <span className="text-muted small">
            No actions available for {appointment.status} status
          </span>
        )}
      </div>
    );
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
        {(user.role === "admin" || user.userType === "admin") && (
          <Button
            variant="secondary"
            onClick={async () => {
              try {
                const action = window.confirm(
                  "Would you like to delete broken appointments? \n\n" +
                    "Click 'OK' to delete appointments with missing references.\n" +
                    "Click 'Cancel' to only fix broken references when possible."
                )
                  ? "delete"
                  : "fix";

                setLoading(true);
                const result = await api.fixAppointmentReferences(action);

                // Show detailed results
                if (result.details && result.details.length > 0) {
                  const detailsText = result.details
                    .map(
                      (d) =>
                        `ID: ${d.id}\nDate: ${
                          d.date
                            ? new Date(d.date).toLocaleDateString()
                            : "Unknown"
                        }\n` +
                        `Time: ${d.time}\nStatus: ${
                          d.status
                        }\nIssues: ${d.issues.join(", ")}`
                    )
                    .join("\n\n");

                  console.log("Fix appointment results:", detailsText);
                }

                // Create a user-friendly message
                let message = `Fixed ${result.fixed || 0} appointment${
                  result.fixed !== 1 ? "s" : ""
                }`;
                if (result.deleted && result.deleted > 0) {
                  message += `, deleted ${result.deleted} appointment${
                    result.deleted !== 1 ? "s" : ""
                  }`;
                }

                toast.success(message);

                // Refresh data
                await fetchAppointments();
              } catch (error) {
                console.error("Error fixing references:", error);
                toast.error("Failed to fix appointment references");
              } finally {
                setLoading(false);
              }
            }}
          >
            <FaTools />
            Fix References
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
        <h3 style={{ width: "100%", marginBottom: "8px" }}>
          Appointment Types
        </h3>
        {appointmentTypes.map((type) => (
          <AppointmentType key={type.name}>
            <ColorIndicator color={type.color} />
            <span>{type.name}</span>
          </AppointmentType>
        ))}
      </AppointmentTypeContainer>

      <AppointmentTypeContainer>
        <h3 style={{ width: "100%", marginBottom: "8px" }}>Status Colors</h3>
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
        <AppointmentType>
          <ColorIndicator color="#4A90E2" style={{ opacity: 0.7 }} />
          <span>Completed</span>
        </AppointmentType>
        <AppointmentType>
          <ColorIndicator color="#9E9E9E" style={{ opacity: 0.5 }} />
          <span>Cancelled</span>
        </AppointmentType>
        <AppointmentType>
          <ColorIndicator color="#F44336" style={{ opacity: 0.5 }} />
          <span>Rejected</span>
        </AppointmentType>
        <AppointmentType>
          <ColorIndicator color="#795548" style={{ opacity: 0.5 }} />
          <span>No-Show</span>
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
                  {loading
                    ? "Loading doctor information..."
                    : selectedAppointment.doctor &&
                      selectedAppointment.doctor.name
                    ? `Dr. ${selectedAppointment.doctor.name}`
                    : selectedAppointment.doctor?._id
                    ? "Doctor information unavailable (reference exists)"
                    : "No doctor assigned"}
                </DetailValue>
                {(selectedAppointment.status === "confirmed" ||
                  selectedAppointment.status === "completed") &&
                  selectedAppointment.doctor?.specialty && (
                    <DetailValue style={{ fontSize: "0.9rem", color: "#666" }}>
                      {selectedAppointment.doctor.specialty}
                    </DetailValue>
                  )}
              </DetailContent>
            </AppointmentDetail>

            <AppointmentDetail>
              <DetailIcon>
                <FaUser />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Patient</DetailLabel>
                <DetailValue>
                  {loading
                    ? "Loading patient information..."
                    : selectedAppointment.patient &&
                      selectedAppointment.patient.name
                    ? selectedAppointment.patient.name
                    : selectedAppointment.patient?._id
                    ? "Patient information unavailable (reference exists)"
                    : "Patient not assigned"}
                </DetailValue>
                {(selectedAppointment.status === "confirmed" ||
                  selectedAppointment.status === "completed") &&
                  selectedAppointment.patient?.email && (
                    <DetailValue style={{ fontSize: "0.9rem", color: "#666" }}>
                      {selectedAppointment.patient.email}
                    </DetailValue>
                  )}
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
              {renderActionButtons(selectedAppointment)}
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
