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
} from "react-icons/fa";
import { mockAuthService } from "../../services/mockApi";
import Layout from "../../components/layout/Layout";

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

const PatientCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.small};
  overflow: hidden;
`;

const PatientHeader = styled.div`
  background-color: ${(props) => props.theme.colors.primary.light};
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PatientName = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.primary.dark};
  font-weight: 500;
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

  &:hover {
    color: ${(props) => props.theme.colors.primary.dark};
  }
`;

const PatientContent = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
`;

const PatientDetail = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(1)};
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  min-width: 120px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const DetailValue = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
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

const FormLabel = styled.label`
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const FormInput = styled.input`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;
`;

const FormSelect = styled.select`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;
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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: "",
    aadhaarNumber: "",
    emergencyContact: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await mockAuthService.getPatients();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

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

  const handleDeletePatient = (patient) => {
    setPatientToDelete(patient);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await mockAuthService.deletePatient(patientToDelete._id);
      setPatients((prev) => prev.filter((p) => p._id !== patientToDelete._id));
      setShowConfirmDialog(false);
      setPatientToDelete(null);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setPatientToDelete(null);
  };

  const handleOpenModal = (patient = null) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData({
        name: patient.name,
        email: patient.email,
        contactNumber: patient.contactNumber || "",
        dateOfBirth: patient.dateOfBirth
          ? new Date(patient.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: patient.gender || "",
        bloodGroup: patient.bloodGroup || "",
        address: patient.address || "",
        aadhaarNumber: patient.aadhaarNumber || "",
        emergencyContact: patient.emergencyContact || "",
      });
    } else {
      setEditingPatient(null);
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        address: "",
        aadhaarNumber: "",
        emergencyContact: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPatient) {
        // Update existing patient
        await mockAuthService.updatePatient(editingPatient._id, formData);

        // Update the list
        setPatients((prev) =>
          prev.map((pat) =>
            pat._id === editingPatient._id ? { ...pat, ...formData } : pat
          )
        );
      } else {
        // Add new patient
        const newPatient = await mockAuthService.addPatient({
          ...formData,
          role: "patient",
        });

        // Add to the list
        setPatients((prev) => [...prev, newPatient]);
      }

      // Close modal and reset form
      handleCloseModal();
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  return (
    <Layout title="Manage Patients">
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
              >
                <PatientHeader>
                  <PatientName>{patient.name}</PatientName>
                  <PatientActions>
                    <IconButton onClick={() => handleOpenModal(patient)}>
                      <FaEdit />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePatient(patient)}>
                      <FaTrash />
                    </IconButton>
                    <IconButton>
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
                    <DetailValue>
                      {patient.contactNumber || "Not provided"}
                    </DetailValue>
                  </PatientDetail>
                  <PatientDetail>
                    <DetailLabel>Gender:</DetailLabel>
                    <DetailValue>
                      {patient.gender
                        ? patient.gender.charAt(0).toUpperCase() +
                          patient.gender.slice(1)
                        : "Not provided"}
                    </DetailValue>
                  </PatientDetail>
                  <PatientDetail>
                    <DetailLabel>Aadhaar No:</DetailLabel>
                    <DetailValue>
                      {patient.aadhaarNumber || "Not provided"}
                    </DetailValue>
                  </PatientDetail>
                  <PatientDetail>
                    <DetailLabel>Blood Group:</DetailLabel>
                    <DetailValue>
                      {patient.bloodGroup || "Not provided"}
                    </DetailValue>
                  </PatientDetail>
                </PatientContent>
              </PatientCard>
            ))}
          </PatientsGrid>
        )}

        <AnimatePresence>
          {showModal && (
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
                    {editingPatient ? "Edit Patient" : "Add New Patient"}
                  </ModalTitle>
                  <CloseButton onClick={handleCloseModal}>
                    <FaTimes />
                  </CloseButton>
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormLabel>Full Name</FormLabel>
                    <FormInput
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Phone Number</FormLabel>
                    <FormInput
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormInput
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Gender</FormLabel>
                    <FormSelect
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Blood Group</FormLabel>
                    <FormSelect
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
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
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Aadhaar Number</FormLabel>
                    <FormInput
                      type="text"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={handleInputChange}
                      maxLength={12}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Emergency Contact</FormLabel>
                    <FormInput
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <SubmitButton
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {editingPatient ? "Update Patient" : "Add Patient"}
                  </SubmitButton>
                </Form>
              </ModalContent>
            </ModalOverlay>
          )}

          {showConfirmDialog && (
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
                  Are you sure you want to delete patient "
                  {patientToDelete.name}"? This action cannot be undone.
                </ConfirmMessage>
                <ConfirmActions>
                  <CancelButton
                    onClick={cancelDelete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTimes /> Cancel
                  </CancelButton>
                  <ConfirmButton
                    onClick={confirmDelete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCheck /> Confirm
                  </ConfirmButton>
                </ConfirmActions>
              </ConfirmDialog>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </PageContainer>
    </Layout>
  );
};

export default ManagePatients;
