import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaCheck,
  FaTimes,
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import { format } from "date-fns";
import AnimationContainer from "../../components/animations/AnimationContainer";
import PageTransition, {
  childVariants,
} from "../../components/animations/PageTransition";

// Page Container with improved background and shadows
const PageContainer = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
  min-height: calc(100vh - 80px);
  background-color: ${(props) => props.theme.colors.background.default};
  background-image: linear-gradient(
    to bottom right,
    ${(props) => props.theme.colors.background.default},
    ${(props) => props.theme.colors.background.paper}
  );
`;

// Enhanced header with better spacing and animation
const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing(2)};
  padding-bottom: ${(props) => props.theme.spacing(2)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const Title = styled(motion.h1)`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

// Improved search container with animation
const SearchContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1)};
  width: 300px;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.small};
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}30;
  }

  svg {
    margin: 0 ${(props) => props.theme.spacing(1)};
    color: ${(props) => props.theme.colors.text.secondary};
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    flex: 1;
    padding: ${(props) => props.theme.spacing(1)};
    color: ${(props) => props.theme.colors.text.primary};
    font-size: 0.95rem;
  }
`;

// Improved filters container with better organization
const FiltersContainer = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  flex-wrap: wrap;
  background-color: ${(props) => props.theme.colors.background.paper};
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: 500;

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const FilterGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(0.5)};
`;

// Enhanced select input with better styling
const FilterSelect = styled.select`
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;
  min-width: 140px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}30;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

// Enhanced date input with better styling
const DateInput = styled.input`
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;
  min-width: 140px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}30;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

// Improved table with better styling and animation
const AppointmentsTable = styled(motion.table)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.medium};
`;

const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.background.default};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const TableRow = styled(motion.tr)`
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
  }
`;

const TableHeader = styled.th`
  padding: ${(props) => props.theme.spacing(2)};
  text-align: left;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const TableCell = styled.td`
  padding: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;
`;

// Enhanced status badge with animations and improved design
const StatusBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.85rem;
  font-weight: 500;
  gap: ${(props) => props.theme.spacing(0.5)};

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

const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
`;

// Enhanced action buttons with tooltip
const ActionButton = styled(Button)`
  padding: ${(props) => props.theme.spacing(0.75)}
    ${(props) => props.theme.spacing(1.25)};
  font-size: 0.85rem;
  position: relative;

  &:hover::after {
    content: "${(props) => props.tooltip}";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    pointer-events: none;
    margin-bottom: 5px;
    z-index: 100;
  }
`;

// Improved modal with animations
const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing(2)};
`;

const ModalContent = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(4)};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${(props) => props.theme.shadows.large};
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: ${(props) => props.theme.spacing(2)};
  right: ${(props) => props.theme.spacing(2)};
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(0.5)};
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing(0.75)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.background.paper};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}30;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.background.paper};
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}30;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(4)};
`;

// Improved loading and error states with animations
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
`;

const LoadingMessage = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.status.error};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyState = styled(Card)`
  text-align: center;
  padding: ${(props) => props.theme.spacing(6)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // "view", "edit", or "delete"
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch appointments
        const appointmentsResponse = await api.get("/appointments");
        setAppointments(appointmentsResponse.data);
        setFilteredAppointments(appointmentsResponse.data);

        // Fetch doctors
        const doctorsResponse = await api.get("/doctors");
        setDoctors(doctorsResponse.data);

        // Fetch patients
        const patientsResponse = await api.get("/patients");
        setPatients(patientsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, doctorFilter, dateFilter, appointments]);

  const applyFilters = () => {
    let filtered = [...appointments];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (appointment) =>
          (appointment.patient?.name &&
            appointment.patient.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (appointment.doctor?.name &&
            appointment.doctor.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (appointment.reason &&
            appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(
        (appointment) => appointment.status === statusFilter
      );
    }

    // Apply doctor filter
    if (doctorFilter) {
      filtered = filtered.filter(
        (appointment) => appointment.doctor?._id === doctorFilter
      );
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate);
        return (
          appointmentDate.getDate() === filterDate.getDate() &&
          appointmentDate.getMonth() === filterDate.getMonth() &&
          appointmentDate.getFullYear() === filterDate.getFullYear()
        );
      });
    }

    setFilteredAppointments(filtered);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const openViewModal = (appointment) => {
    setModalMode("view");
    setCurrentAppointment(appointment);
    setFormData({
      status: appointment.status,
      notes: appointment.notes || "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (appointment) => {
    setModalMode("edit");
    setCurrentAppointment(appointment);
    setFormData({
      status: appointment.status,
      notes: appointment.notes || "",
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (appointment) => {
    setModalMode("delete");
    setCurrentAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAppointment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === "edit") {
        await api.put(`/appointments/${currentAppointment._id}/status`, {
          status: formData.status,
          notes: formData.notes,
        });

        // Update local state
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === currentAppointment._id
            ? { ...appointment, status: formData.status, notes: formData.notes }
            : appointment
        );

        setAppointments(updatedAppointments);
      } else if (modalMode === "delete") {
        await api.delete(`/appointments/${currentAppointment._id}`);

        // Update local state
        const updatedAppointments = appointments.filter(
          (appointment) => appointment._id !== currentAppointment._id
        );

        setAppointments(updatedAppointments);
      }

      closeModal();
    } catch (error) {
      console.error("Error updating appointment:", error);
      setError("Failed to update appointment. Please try again.");
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <AnimationContainer type="loading" width="200px" height="200px" />
        <LoadingMessage>Loading appointments...</LoadingMessage>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        <FaExclamationTriangle
          size={40}
          style={{ marginBottom: "1rem", color: "#EF4444" }}
        />
        <h3 style={{ marginBottom: "0.5rem" }}>Error Loading Data</h3>
        <p>{error}</p>
        <Button
          style={{ marginTop: "1rem" }}
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </ErrorMessage>
    );
  }

  return (
    <PageTransition>
      <PageContainer>
        <Header
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={childVariants}>
            <FaCalendarAlt />
            Manage Appointments
          </Title>
          <SearchContainer variants={childVariants}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </Header>

        <FiltersContainer
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <FilterGroup variants={childVariants}>
            <FilterLabel>
              <FaFilter /> Status
            </FilterLabel>
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup variants={childVariants}>
            <FilterLabel>
              <FaFilter /> Doctor
            </FilterLabel>
            <FilterSelect
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
            >
              <option value="">All Doctors</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup variants={childVariants}>
            <FilterLabel>
              <FaCalendarAlt /> Date
            </FilterLabel>
            <DateInput
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </FilterGroup>
        </FiltersContainer>

        {filteredAppointments.length === 0 ? (
          <EmptyState
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimationContainer
              type="emptyState"
              width="200px"
              height="200px"
              margin="0 0 1rem 0"
            />
            <h3 style={{ marginBottom: "0.5rem" }}>No Appointments Found</h3>
            <p>
              {searchTerm || statusFilter || doctorFilter || dateFilter
                ? "Try adjusting your filters to see more results."
                : "There are no appointments scheduled in the system yet."}
            </p>
          </EmptyState>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AppointmentsTable>
              <TableHead>
                <tr>
                  <TableHeader>Patient</TableHeader>
                  <TableHeader>Doctor</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Time</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </TableHead>
              <tbody>
                {filteredAppointments.map((appointment, index) => (
                  <TableRow
                    key={appointment._id}
                    as={motion.tr}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{
                      backgroundColor: "#f9fafb",
                      transition: { duration: 0.1 },
                    }}
                  >
                    <TableCell>
                      {appointment.patient?.name || "Unknown"}
                    </TableCell>
                    <TableCell>
                      {appointment.doctor?.name || "Unknown"}
                    </TableCell>
                    <TableCell>
                      {formatDate(appointment.appointmentDate)}
                    </TableCell>
                    <TableCell>
                      {formatTime(appointment.startTime)} -{" "}
                      {formatTime(appointment.endTime)}
                    </TableCell>
                    <TableCell>
                      {appointment.appointmentType || "General"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={appointment.status}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {appointment.status === "confirmed" && (
                          <FaCheck size={12} />
                        )}
                        {appointment.status === "cancelled" && (
                          <FaTimes size={12} />
                        )}
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <ActionButtons>
                        <ActionButton
                          variant="secondary"
                          size="small"
                          onClick={() => openViewModal(appointment)}
                          tooltip="View details"
                        >
                          <FaEye />
                        </ActionButton>
                        <ActionButton
                          variant="primary"
                          size="small"
                          onClick={() => openEditModal(appointment)}
                          tooltip="Edit appointment"
                        >
                          <FaEdit />
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          size="small"
                          onClick={() => openDeleteModal(appointment)}
                          tooltip="Delete appointment"
                        >
                          <FaTrash />
                        </ActionButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </AppointmentsTable>
          </motion.div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModalContent
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <ModalCloseButton onClick={closeModal}>
                  <FaTimes />
                </ModalCloseButton>

                {modalMode === "view" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ModalTitle>
                      <FaInfoCircle style={{ color: "#3B82F6" }} />
                      Appointment Details
                    </ModalTitle>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "16px",
                        marginBottom: "24px",
                      }}
                    >
                      <div>
                        <Label>Patient</Label>
                        <p>{currentAppointment.patient?.name || "Unknown"}</p>
                      </div>
                      <div>
                        <Label>Doctor</Label>
                        <p>{currentAppointment.doctor?.name || "Unknown"}</p>
                      </div>
                      <div>
                        <Label>Department</Label>
                        <p>
                          {currentAppointment.department?.name || "General"}
                        </p>
                      </div>
                      <div>
                        <Label>Date</Label>
                        <p>{formatDate(currentAppointment.appointmentDate)}</p>
                      </div>
                      <div>
                        <Label>Time</Label>
                        <p>
                          {formatTime(currentAppointment.startTime)} -{" "}
                          {formatTime(currentAppointment.endTime)}
                        </p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <StatusBadge status={currentAppointment.status}>
                          {currentAppointment.status === "confirmed" && (
                            <FaCheck size={12} />
                          )}
                          {currentAppointment.status === "cancelled" && (
                            <FaTimes size={12} />
                          )}
                          {currentAppointment.status.charAt(0).toUpperCase() +
                            currentAppointment.status.slice(1)}
                        </StatusBadge>
                      </div>
                    </div>

                    <FormGroup>
                      <Label>Reason for Visit</Label>
                      <p>{currentAppointment.reason}</p>
                    </FormGroup>

                    {currentAppointment.notes && (
                      <FormGroup>
                        <Label>Notes</Label>
                        <p>{currentAppointment.notes}</p>
                      </FormGroup>
                    )}

                    <ModalButtons>
                      <Button variant="secondary" onClick={closeModal}>
                        Close
                      </Button>
                      <Button onClick={() => openEditModal(currentAppointment)}>
                        Edit
                      </Button>
                    </ModalButtons>
                  </motion.div>
                )}

                {modalMode === "edit" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ModalTitle>
                      <FaEdit style={{ color: "#3B82F6" }} />
                      Update Appointment
                    </ModalTitle>
                    <form onSubmit={handleSubmit}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "16px",
                          marginBottom: "24px",
                        }}
                      >
                        <div>
                          <Label>Patient</Label>
                          <p>{currentAppointment.patient?.name || "Unknown"}</p>
                        </div>
                        <div>
                          <Label>Doctor</Label>
                          <p>{currentAppointment.doctor?.name || "Unknown"}</p>
                        </div>
                        <div>
                          <Label>Date</Label>
                          <p>
                            {formatDate(currentAppointment.appointmentDate)}
                          </p>
                        </div>
                        <div>
                          <Label>Time</Label>
                          <p>
                            {formatTime(currentAppointment.startTime)} -{" "}
                            {formatTime(currentAppointment.endTime)}
                          </p>
                        </div>
                      </div>

                      <FormGroup>
                        <Label htmlFor="status">Status</Label>
                        <FilterSelect
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </FilterSelect>
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Add notes about this appointment"
                        />
                      </FormGroup>

                      <ModalButtons>
                        <Button
                          variant="secondary"
                          type="button"
                          onClick={closeModal}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Update Appointment</Button>
                      </ModalButtons>
                    </form>
                  </motion.div>
                )}

                {modalMode === "delete" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ModalTitle>
                      <FaExclamationTriangle style={{ color: "#EF4444" }} />
                      Delete Appointment
                    </ModalTitle>
                    <p style={{ marginBottom: "16px" }}>
                      Are you sure you want to delete this appointment for{" "}
                      <strong>
                        {currentAppointment.patient?.name || "Unknown"}
                      </strong>{" "}
                      with{" "}
                      <strong>
                        {currentAppointment.doctor?.name || "Unknown"}
                      </strong>{" "}
                      on{" "}
                      <strong>
                        {formatDate(currentAppointment.appointmentDate)}
                      </strong>
                      ?
                    </p>
                    <p style={{ marginBottom: "24px", color: "#EF4444" }}>
                      This action cannot be undone.
                    </p>
                    <ModalButtons>
                      <Button variant="secondary" onClick={closeModal}>
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={handleSubmit}>
                        Delete Appointment
                      </Button>
                    </ModalButtons>
                  </motion.div>
                )}
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </PageContainer>
    </PageTransition>
  );
};

export default ManageAppointments;
