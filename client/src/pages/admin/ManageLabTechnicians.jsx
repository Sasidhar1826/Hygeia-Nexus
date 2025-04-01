import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFlask,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaCheck,
  FaFilter,
  FaGraduationCap,
  FaCalendarAlt,
  FaUserMd,
} from "react-icons/fa";
import mockApi from "../../services/mockApi";

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

const TechniciansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const TechnicianCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.small};
  overflow: hidden;
`;

const TechnicianHeader = styled.div`
  background-color: ${(props) => props.theme.colors.primary.light};
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TechnicianName = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.primary.dark};
  font-weight: 500;
`;

const TechnicianSpecialization = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.primary.main};
  margin-top: 4px;
`;

const TechnicianActions = styled.div`
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

const TechnicianContent = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
`;

const TechnicianDetail = styled.div`
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

const Badge = styled.span`
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.theme.colors.primary.light};
  color: ${(props) => props.theme.colors.primary.dark};
  border-radius: 12px;
  font-size: 0.75rem;
  margin-left: ${(props) => props.theme.spacing(1)};
  white-space: nowrap;
`;

const ManageLabTechnicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [technicianToDelete, setTechnicianToDelete] = useState(null);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    department: "",
    specialization: "",
    qualification: "",
    experience: "",
    joiningDate: "",
  });

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const data = await mockApi.getLabTechnicians();
        setTechnicians(data);
        setFilteredTechnicians(data);
      } catch (error) {
        console.error("Error fetching lab technicians:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTechnicians(technicians);
    } else {
      const filtered = technicians.filter(
        (tech) =>
          tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tech.department &&
            tech.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (tech.specialization &&
            tech.specialization
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      setFilteredTechnicians(filtered);
    }
  }, [searchTerm, technicians]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteTechnician = (technician) => {
    setTechnicianToDelete(technician);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await mockApi.deleteLabTechnician(technicianToDelete._id);
      setTechnicians((prev) =>
        prev.filter((t) => t._id !== technicianToDelete._id)
      );
      setShowConfirmDialog(false);
      setTechnicianToDelete(null);
    } catch (error) {
      console.error("Error deleting lab technician:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setTechnicianToDelete(null);
  };

  const handleOpenModal = (technician = null) => {
    if (technician) {
      setEditingTechnician(technician);
      setFormData({
        name: technician.name,
        email: technician.email,
        contactNumber: technician.contactNumber || "",
        department: technician.department || "",
        specialization: technician.specialization || "",
        qualification: technician.qualification || "",
        experience: technician.experience || "",
        joiningDate: technician.joiningDate
          ? new Date(technician.joiningDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setEditingTechnician(null);
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        department: "",
        specialization: "",
        qualification: "",
        experience: "",
        joiningDate: "",
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
      if (editingTechnician) {
        // Update existing technician
        await mockApi.updateLabTechnician(editingTechnician._id, formData);

        // Update the list
        setTechnicians((prev) =>
          prev.map((tech) =>
            tech._id === editingTechnician._id ? { ...tech, ...formData } : tech
          )
        );
      } else {
        // Add new technician
        const newTechnician = await mockApi.addLabTechnician({
          ...formData,
          role: "labtechnician",
        });

        // Add to the list
        setTechnicians((prev) => [...prev, newTechnician]);
      }

      // Close modal and reset form
      handleCloseModal();
    } catch (error) {
      console.error("Error saving lab technician:", error);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>
          <FaFlask />
          Manage Lab Technicians
        </Title>
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenModal()}
        >
          <FaPlus />
          Add Lab Technician
        </ActionButton>
      </Header>

      <SearchContainer>
        <SearchInput>
          <FaSearch />
          <input
            type="text"
            placeholder="Search technicians by name, department, or specialization..."
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
          <p>Loading lab technicians...</p>
        </LoadingContainer>
      ) : filteredTechnicians.length === 0 ? (
        <NoResults>
          <FaFlask />
          <h2>No lab technicians found</h2>
          <p>Try adjusting your search or add a new lab technician</p>
        </NoResults>
      ) : (
        <TechniciansGrid>
          {filteredTechnicians.map((technician) => (
            <TechnicianCard
              key={technician._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TechnicianHeader>
                <div>
                  <TechnicianName>{technician.name}</TechnicianName>
                  {technician.specialization && (
                    <TechnicianSpecialization>
                      {technician.specialization}
                    </TechnicianSpecialization>
                  )}
                </div>
                <TechnicianActions>
                  <IconButton onClick={() => handleOpenModal(technician)}>
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTechnician(technician)}
                  >
                    <FaTrash />
                  </IconButton>
                  <IconButton>
                    <FaEye />
                  </IconButton>
                </TechnicianActions>
              </TechnicianHeader>
              <TechnicianContent>
                <TechnicianDetail>
                  <DetailLabel>Email:</DetailLabel>
                  <DetailValue>{technician.email}</DetailValue>
                </TechnicianDetail>
                <TechnicianDetail>
                  <DetailLabel>Department:</DetailLabel>
                  <DetailValue>
                    {technician.department || "Not assigned"}
                  </DetailValue>
                </TechnicianDetail>
                <TechnicianDetail>
                  <DetailLabel>Qualification:</DetailLabel>
                  <DetailValue>
                    {technician.qualification || "Not provided"}
                  </DetailValue>
                </TechnicianDetail>
                <TechnicianDetail>
                  <DetailLabel>Experience:</DetailLabel>
                  <DetailValue>
                    {technician.experience
                      ? `${technician.experience} years`
                      : "Not provided"}
                  </DetailValue>
                </TechnicianDetail>
                <TechnicianDetail>
                  <DetailLabel>Phone:</DetailLabel>
                  <DetailValue>
                    {technician.contactNumber || "Not provided"}
                  </DetailValue>
                </TechnicianDetail>
              </TechnicianContent>
            </TechnicianCard>
          ))}
        </TechniciansGrid>
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
                  {editingTechnician
                    ? "Edit Lab Technician"
                    : "Add New Lab Technician"}
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
                  <FormLabel>Department</FormLabel>
                  <FormSelect
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Department</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Microbiology">Microbiology</option>
                    <option value="Pathology">Pathology</option>
                    <option value="Immunology">Immunology</option>
                    <option value="Cytology">Cytology</option>
                    <option value="Radiology">Radiology</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Specialization</FormLabel>
                  <FormInput
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Qualification</FormLabel>
                  <FormInput
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Experience (Years)</FormLabel>
                  <FormInput
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Joining Date</FormLabel>
                  <FormInput
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingTechnician ? "Update Technician" : "Add Technician"}
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
                Are you sure you want to delete lab technician "
                {technicianToDelete.name}"? This action cannot be undone.
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
  );
};

export default ManageLabTechnicians;
