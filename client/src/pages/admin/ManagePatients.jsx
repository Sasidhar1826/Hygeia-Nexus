import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserInjured,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaCheck,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaIdCard,
  FaTint,
  FaHome,
  FaBirthdayCake,
} from "react-icons/fa";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../services/apiService";
// Styled Components
const PageContainer = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.primary.main};
  display: flex;
  align-items: center;

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;

const ActionButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  gap: ${(props) => props.theme.spacing(2)};
`;

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: ${(props) => props.theme.spacing(0.75)}
    ${(props) => props.theme.spacing(1.5)};

  svg {
    color: ${(props) => props.theme.colors.text.secondary};
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: ${(props) => props.theme.spacing(0.75)}
    ${(props) => props.theme.spacing(1.5)};
  cursor: pointer;

  svg {
    margin-right: ${(props) => props.theme.spacing(0.5)};
    color: ${(props) => props.theme.colors.text.secondary};
  }
`;

const PatientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const PatientCard = styled(motion(Card))`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const PatientHeader = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spacing(2)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const PatientImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => {
    return (
      (props.theme.colors.background && props.theme.colors.background.paper) ||
      "#ffffff"
    );
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid
    ${(props) => {
      if (props.theme.colors.primary) {
        return (
          props.theme.colors.primary.light ||
          props.theme.colors.primary.main ||
          "#5DADE2"
        );
      }
      return "#5DADE2";
    }};
  margin-right: ${(props) => props.theme.spacing(2)};
  flex-shrink: 0;
`;

const PatientImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PatientInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const PatientNameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PatientName = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.primary.main};
  font-weight: 600;
  font-size: 1.2rem;
`;

const PatientBadges = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const PatientGender = styled.span`
  margin-right: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => {
    // Safely handle color access in case theme structure is incomplete
    if (props.gender === "male" && props.theme.colors.info) {
      return props.theme.colors.info.light || "#5bc0de";
    } else if (props.gender === "female" && props.theme.colors.secondary) {
      return props.theme.colors.secondary.light || "#ff77a9";
    } else {
      return props.theme.colors.text?.disabled || "#999999";
    }
  }};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  text-transform: capitalize;
`;

const PatientBloodGroup = styled.span`
  background-color: ${(props) => {
    // Different colors for different blood groups
    switch (props.bloodGroup) {
      case "A+":
        return "#e74c3c";
      case "A-":
        return "#c0392b";
      case "B+":
        return "#3498db";
      case "B-":
        return "#2980b9";
      case "AB+":
        return "#9b59b6";
      case "AB-":
        return "#8e44ad";
      case "O+":
        return "#2ecc71";
      case "O-":
        return "#27ae60";
      default:
        return "#95a5a6";
    }
  }};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
`;

const PatientActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary.main};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: ${(props) => props.theme.spacing(0.5)};
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary.dark};
    background-color: ${(props) =>
      `${props.theme.colors.primary.light}30` || "rgba(74, 144, 226, 0.1)"};
  }
`;

const PatientContent = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PatientDetail = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(1)};
  display: flex;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  min-width: 80px;
  color: ${(props) => props.theme.colors.text.primary};
`;

const DetailValue = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ModalOverlay = styled(motion.div)`
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
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing(3)};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.colors.primary.main};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};

  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldError = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.8rem;
  margin-top: 4px;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error || "#f44336"};
  background-color: ${(props) => `${props.theme.colors.error || "#f44336"}10`};
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: 5px;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  font-size: 0.9rem;
`;

const FormLabel = styled.label`
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const FormInput = styled.input`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid
    ${(props) =>
      props.hasError ? props.theme.colors.error : props.theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError
        ? props.theme.colors.error
        : props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.hasError
          ? `${props.theme.colors.error}33`
          : `${props.theme.colors.primary.main}33`};
  }
`;

const FormSelect = styled.select`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid
    ${(props) =>
      props.hasError ? props.theme.colors.error : props.theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError
        ? props.theme.colors.error
        : props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.hasError
          ? `${props.theme.colors.error}33`
          : `${props.theme.colors.primary.main}33`};
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: 5px;
  font-weight: 500;
  margin-top: ${(props) => props.theme.spacing(1)};
  cursor: pointer;

  &:disabled {
    background-color: ${(props) => props.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(5)};
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};

  svg {
    font-size: 3rem;
    margin-bottom: ${(props) => props.theme.spacing(2)};
  }
`;

const ConfirmDialog = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing(3)};
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const ConfirmMessage = styled.p`
  margin-bottom: ${(props) => props.theme.spacing(3)};
  font-size: 1.1rem;
`;

const ConfirmActions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(2)};
`;

const CancelButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.text.secondary};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-right: ${(props) => props.theme.spacing(0.5)};
  }
`;

const ConfirmButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.error};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-right: ${(props) => props.theme.spacing(0.5)};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing(5)};
`;

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add", "edit", "view", "delete"
  const [currentPatient, setCurrentPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: "",
    addressStreet: "",
    addressCity: "",
    addressState: "",
    addressZip: "",
    addressCountry: "",
    aadhaarNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    profileImage: "",
  });

  // Function to generate random profile image URL based on gender
  const generateProfileImage = (gender) => {
    // Default to a random gender if none provided
    const imageGender = gender || (Math.random() > 0.5 ? "male" : "female");
    // Generate a random seed between 0-99
    const seed = Math.floor(Math.random() * 100);
    return `https://randomuser.me/api/portraits/${
      imageGender === "female" ? "women" : "men"
    }/${seed}.jpg`;
  };

  // Helper function to format address object
  const formatAddress = (address) => {
    if (!address) return "Not provided";

    if (typeof address === "string") return address;

    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    if (address.country) parts.push(address.country);

    return parts.length > 0 ? parts.join(", ") : "Not provided";
  };

  // Helper function to format emergency contact
  const formatEmergencyContact = (contact) => {
    if (!contact) return "Not provided";

    if (typeof contact === "string") return contact;

    const parts = [];
    if (contact.name) parts.push(contact.name);
    if (contact.phone) parts.push(`Phone: ${contact.phone}`);
    if (contact.relationship) parts.push(`(${contact.relationship})`);

    return parts.length > 0 ? parts.join(" ") : "Not provided";
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await api.getPatients();
      setPatients(response);
      setFilteredPatients(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to load patients. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (patient.contactNumber &&
            patient.contactNumber.includes(searchTerm)) ||
          (patient.aadhaarNumber && patient.aadhaarNumber.includes(searchTerm))
      );
      setFilteredPatients(filtered);
    }
  }, [searchTerm, patients]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (patientId) => {
    try {
      await api.deletePatient(patientId);
      await fetchPatients();
      closeModal();
    } catch (error) {
      console.error("Error deleting patient:", error);
      setError("Failed to delete patient. Please try again.");
    }
  };

  const handleOpenModal = (patient = null, mode = "edit") => {
    if (patient) {
      setCurrentPatient(patient);
      setModalMode(mode);

      // Handle address fields
      const addressObj = patient.address || {};

      // Handle emergency contact fields
      const emergencyContact = patient.emergencyContact || {};

      setFormData({
        name: patient.name || "",
        email: patient.email || "",
        contactNumber: patient.phone || "",
        dateOfBirth: patient.dateOfBirth
          ? new Date(patient.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: patient.gender || "",
        bloodGroup: patient.bloodGroup || "",
        // Address fields
        addressStreet:
          typeof addressObj === "object" ? addressObj.street || "" : "",
        addressCity:
          typeof addressObj === "object" ? addressObj.city || "" : "",
        addressState:
          typeof addressObj === "object" ? addressObj.state || "" : "",
        addressZip:
          typeof addressObj === "object" ? addressObj.zipCode || "" : "",
        addressCountry:
          typeof addressObj === "object" ? addressObj.country || "" : "",
        address: typeof addressObj === "string" ? addressObj : "",

        // Emergency contact fields
        emergencyContactName:
          typeof emergencyContact === "object"
            ? emergencyContact.name || ""
            : "",
        emergencyContactPhone:
          typeof emergencyContact === "object"
            ? emergencyContact.phone || ""
            : typeof emergencyContact === "string"
            ? emergencyContact
            : "",
        emergencyContactRelationship:
          typeof emergencyContact === "object"
            ? emergencyContact.relationship || ""
            : "",

        aadhaarNumber: patient.aadhaarNumber || "",
        profileImage: patient.profileImage || "",
      });
    } else {
      setCurrentPatient(null);
      setModalMode("add");
      // Generate a random gender for new patients
      const randomGender = Math.random() > 0.5 ? "male" : "female";
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        dateOfBirth: "",
        gender: randomGender,
        bloodGroup: "",
        address: "",
        addressStreet: "",
        addressCity: "",
        addressState: "",
        addressZip: "",
        addressCountry: "India", // Default country
        aadhaarNumber: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelationship: "",
        profileImage: generateProfileImage(randomGender),
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }

    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/[^\d]/g, ""))) {
      errors.contactNumber = "Phone number should be 10 digits";
    }

    if (
      formData.aadhaarNumber &&
      !/^\d{12}$/.test(formData.aadhaarNumber.replace(/[^\d]/g, ""))
    ) {
      errors.aadhaarNumber = "Aadhaar number should be 12 digits";
    }

    if (
      formData.emergencyContactPhone &&
      !/^\d{10}$/.test(formData.emergencyContactPhone.replace(/[^\d]/g, ""))
    ) {
      errors.emergencyContactPhone =
        "Emergency contact phone should be 10 digits";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate the form
    if (!validateForm()) {
      return;
    }

    try {
      // Create address object from form fields
      const addressObject = {
        street: formData.addressStreet,
        city: formData.addressCity,
        state: formData.addressState,
        zipCode: formData.addressZip,
        country: formData.addressCountry,
      };

      // Create emergency contact object from form fields
      const emergencyContactObject = {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship,
      };

      // Only include emergency contact if at least one field is provided
      const hasEmergencyContact =
        formData.emergencyContactName.trim() !== "" ||
        formData.emergencyContactPhone.trim() !== "" ||
        formData.emergencyContactRelationship.trim() !== "";

      // Prepare the data with correct field mappings
      const patientData = {
        ...formData,
        // Map contactNumber to phone as required by server
        phone: formData.contactNumber,
        // Remove contactNumber to avoid confusion on the server side
        contactNumber: undefined,
        // Use structured address object
        address: addressObject,
        // Use structured emergency contact object if fields are provided
        emergencyContact: hasEmergencyContact
          ? emergencyContactObject
          : undefined,
        // Remove individual fields to avoid confusion
        addressStreet: undefined,
        addressCity: undefined,
        addressState: undefined,
        addressZip: undefined,
        addressCountry: undefined,
        emergencyContactName: undefined,
        emergencyContactPhone: undefined,
        emergencyContactRelationship: undefined,
        userType: "patient",
      };

      console.log("Submitting patient data:", patientData);

      if (modalMode === "add") {
        // Add password for new patient
        patientData.password = "tempPassword123"; // Should be changed by patient on first login
        await api.addPatient(patientData);
      } else if (modalMode === "edit") {
        await api.updatePatient(currentPatient._id, patientData);
      }

      await fetchPatients();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving patient:", error);
      setError(
        `Failed to save patient: ${error.message || "Please try again"}`
      );
    }
  };

  const handleOpenDeleteConfirmation = (patient) => {
    setCurrentPatient(patient);
    setModalMode("delete");
    setIsModalOpen(true);
  };

  return (
    <PageContainer>
      <Header>
        <Title>
          <FaUserInjured /> Manage Patients
        </Title>
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenModal()}
        >
          <FaPlus /> Add New Patient
        </ActionButton>
      </Header>

      <SearchContainer>
        <SearchInput>
          <FaSearch />
          <input
            type="text"
            placeholder="Search patients by name, email, or Aadhaar number..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchInput>
        <FilterButton>
          <FaFilter /> Filter
        </FilterButton>
      </SearchContainer>

      {loading ? (
        <LoadingContainer>
          <p>Loading patients...</p>
        </LoadingContainer>
      ) : filteredPatients.length === 0 ? (
        <NoResults>
          <FaUserInjured />
          <h2>No patients found</h2>
          <p>Try adjusting your search or add a new patient</p>
        </NoResults>
      ) : (
        <PatientsGrid>
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              noPadding
            >
              <PatientHeader>
                <PatientInfo>
                  <PatientImageWrapper>
                    {patient.profileImage ? (
                      <PatientImage
                        src={patient.profileImage}
                        alt={patient.name}
                      />
                    ) : (
                      <FaUser size={24} color="#ccc" />
                    )}
                  </PatientImageWrapper>
                  <PatientNameContainer>
                    <PatientName>{patient.name}</PatientName>
                    <PatientBadges>
                      {patient.gender && (
                        <PatientGender gender={patient.gender}>
                          {patient.gender}
                        </PatientGender>
                      )}
                      {patient.bloodGroup && (
                        <PatientBloodGroup bloodGroup={patient.bloodGroup}>
                          {patient.bloodGroup}
                        </PatientBloodGroup>
                      )}
                    </PatientBadges>
                  </PatientNameContainer>
                </PatientInfo>
                <PatientActions>
                  <IconButton
                    onClick={() => handleOpenModal(patient, "edit")}
                    title="Edit Patient"
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDeleteConfirmation(patient)}
                    title="Delete Patient"
                  >
                    <FaTrash />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenModal(patient, "view")}
                    title="View Patient Details"
                  >
                    <FaEye />
                  </IconButton>
                </PatientActions>
              </PatientHeader>
              <PatientContent>
                <PatientDetail>
                  <DetailLabel>Email:</DetailLabel>
                  <DetailValue>{patient.email}</DetailValue>
                </PatientDetail>
                <PatientDetail>
                  <DetailLabel>Phone:</DetailLabel>
                  <DetailValue>{patient.phone || "Not provided"}</DetailValue>
                </PatientDetail>
                {patient.address && (
                  <PatientDetail>
                    <DetailLabel>Address:</DetailLabel>
                    <DetailValue>
                      {typeof patient.address === "string"
                        ? patient.address
                        : formatAddress(patient.address)}
                    </DetailValue>
                  </PatientDetail>
                )}
                {patient.dateOfBirth && (
                  <PatientDetail>
                    <DetailLabel>DOB:</DetailLabel>
                    <DetailValue>
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </DetailValue>
                  </PatientDetail>
                )}
                {patient.emergencyContact && (
                  <PatientDetail>
                    <DetailLabel>Emergency:</DetailLabel>
                    <DetailValue>
                      {formatEmergencyContact(patient.emergencyContact)}
                    </DetailValue>
                  </PatientDetail>
                )}
                {patient.bloodGroup && (
                  <PatientDetail>
                    <DetailLabel>Blood:</DetailLabel>
                    <DetailValue>{patient.bloodGroup}</DetailValue>
                  </PatientDetail>
                )}
                {patient.aadhaarNumber && (
                  <PatientDetail>
                    <DetailLabel>ID:</DetailLabel>
                    <DetailValue>{patient.aadhaarNumber}</DetailValue>
                  </PatientDetail>
                )}
              </PatientContent>
            </PatientCard>
          ))}
        </PatientsGrid>
      )}

      <AnimatePresence>
        {isModalOpen && modalMode !== "delete" && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <ModalContent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>
                  {modalMode === "add"
                    ? "Add New Patient"
                    : modalMode === "edit"
                    ? "Edit Patient"
                    : "Patient Details"}
                </ModalTitle>
                <CloseButton onClick={handleCloseModal}>
                  <FaTimes />
                </CloseButton>
              </ModalHeader>

              <Form onSubmit={handleSubmit}>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <FormGroup>
                  <FormLabel>Full Name</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={modalMode === "view"}
                    hasError={!!fieldErrors.name}
                  />
                  {fieldErrors.name && (
                    <FieldError>{fieldErrors.name}</FieldError>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={modalMode === "edit" || modalMode === "view"}
                    hasError={!!fieldErrors.email}
                  />
                  {fieldErrors.email && (
                    <FieldError>{fieldErrors.email}</FieldError>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Phone Number</FormLabel>
                  <FormInput
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    disabled={modalMode === "view"}
                    hasError={!!fieldErrors.contactNumber}
                  />
                  {fieldErrors.contactNumber && (
                    <FieldError>{fieldErrors.contactNumber}</FieldError>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Gender</FormLabel>
                  <FormSelect
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={modalMode === "view"}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormInput
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={modalMode === "view"}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Blood Group</FormLabel>
                  <FormSelect
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    disabled={modalMode === "view"}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Address</FormLabel>
                  <FormInput
                    type="text"
                    name="addressStreet"
                    value={formData.addressStreet}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    disabled={modalMode === "view"}
                  />
                </FormGroup>

                <div style={{ display: "flex", gap: "16px" }}>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>City</FormLabel>
                    <FormInput
                      type="text"
                      name="addressCity"
                      value={formData.addressCity}
                      onChange={handleInputChange}
                      placeholder="City"
                      disabled={modalMode === "view"}
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>State</FormLabel>
                    <FormInput
                      type="text"
                      name="addressState"
                      value={formData.addressState}
                      onChange={handleInputChange}
                      placeholder="State"
                      disabled={modalMode === "view"}
                    />
                  </FormGroup>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Postal/Zip Code</FormLabel>
                    <FormInput
                      type="text"
                      name="addressZip"
                      value={formData.addressZip}
                      onChange={handleInputChange}
                      placeholder="Postal code"
                      disabled={modalMode === "view"}
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Country</FormLabel>
                    <FormInput
                      type="text"
                      name="addressCountry"
                      value={formData.addressCountry}
                      onChange={handleInputChange}
                      placeholder="Country"
                      disabled={modalMode === "view"}
                    />
                  </FormGroup>
                </div>

                <FormGroup>
                  <FormLabel>Aadhaar Number</FormLabel>
                  <FormInput
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleInputChange}
                    maxLength={12}
                    disabled={modalMode === "view"}
                    hasError={!!fieldErrors.aadhaarNumber}
                  />
                  {fieldErrors.aadhaarNumber && (
                    <FieldError>{fieldErrors.aadhaarNumber}</FieldError>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Emergency Contact Name</FormLabel>
                  <FormInput
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    disabled={modalMode === "view"}
                  />
                </FormGroup>

                <div style={{ display: "flex", gap: "16px" }}>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Emergency Contact Phone</FormLabel>
                    <FormInput
                      type="text"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleInputChange}
                      disabled={modalMode === "view"}
                      hasError={!!fieldErrors.emergencyContactPhone}
                    />
                    {fieldErrors.emergencyContactPhone && (
                      <FieldError>
                        {fieldErrors.emergencyContactPhone}
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Relationship</FormLabel>
                    <FormInput
                      type="text"
                      name="emergencyContactRelationship"
                      value={formData.emergencyContactRelationship}
                      onChange={handleInputChange}
                      disabled={modalMode === "view"}
                      placeholder="e.g. Spouse, Parent, Child"
                    />
                  </FormGroup>
                </div>

                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ display: modalMode === "view" ? "none" : "block" }}
                >
                  {modalMode === "add" ? "Add Patient" : "Update Patient"}
                </SubmitButton>
                {modalMode === "view" && (
                  <SubmitButton
                    type="button"
                    onClick={handleCloseModal}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </SubmitButton>
                )}
              </Form>
            </ModalContent>
          </ModalOverlay>
        )}

        {isModalOpen && modalMode === "delete" && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConfirmDialog
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ConfirmMessage>
                Are you sure you want to delete patient "{currentPatient.name}
                "? This action cannot be undone.
              </ConfirmMessage>
              <ConfirmActions>
                <CancelButton
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes /> Cancel
                </CancelButton>
                <ConfirmButton
                  onClick={() => handleDelete(currentPatient._id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTrash /> Delete
                </ConfirmButton>
              </ConfirmActions>
            </ConfirmDialog>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default ManagePatients;
