import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaUserMd,
  FaCheck,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../services/api";

const PageContainer = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing(2)};
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1)};
  width: 300px;
  border: 1px solid ${(props) => props.theme.colors.border};

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
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
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

const DoctorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const DoctorCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DoctorHeader = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spacing(2)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const DoctorAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${(props) =>
    props.image || "/images/doctor-placeholder.jpg"});
  background-size: cover;
  background-position: center;
  margin-right: ${(props) => props.theme.spacing(2)};
  flex-shrink: 0;
`;

const DoctorInfo = styled.div`
  flex: 1;
`;

const DoctorName = styled.h2`
  font-size: 1.2rem;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  color: ${(props) => props.theme.colors.primary.main};
`;

const DoctorSpecialization = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const DoctorDepartment = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const DoctorContent = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DoctorDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
  flex: 1;
`;

const DetailItem = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;

  span {
    font-weight: 600;
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: ${(props) => props.theme.spacing(1)};

  ${(props) =>
    props.active
      ? `
      background-color: ${
        props.theme.colors.status.successLight ||
        props.theme.colors.status.success + "20"
      };
      color: ${props.theme.colors.status.success};
    `
      : `
      background-color: ${
        props.theme.colors.status.errorLight ||
        props.theme.colors.status.error + "20"
      };
      color: ${props.theme.colors.status.error};
    `}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
  margin-top: auto;
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

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.theme.zIndex.modal};
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
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) => props.theme.colors.background.default};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) => props.theme.colors.background.default};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(4)};
`;

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    specialization: "",
    department: "",
    bio: "",
    education: "",
    experience: "",
    consultationFee: "",
    profileImage: "",
    isActive: true,
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Failed to load departments. Please try again later.");
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await api.get("/doctors");
        setDoctors(response.data);
        setFilteredDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Failed to load doctors. Please try again later.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedDepartment, selectedStatus, doctors]);

  const applyFilters = () => {
    let filtered = [...doctors];

    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (doctor.specialization &&
            doctor.specialization
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (doctor.email &&
            doctor.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.department && doctor.department._id === selectedDepartment
      );
    }

    if (selectedStatus) {
      const isActive = selectedStatus === "active";
      filtered = filtered.filter((doctor) => doctor.isActive === isActive);
    }

    setFilteredDoctors(filtered);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      specialization: "",
      department: "",
      bio: "",
      education: "",
      experience: "",
      consultationFee: "",
      profileImage: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (doctor) => {
    setModalMode("edit");
    setCurrentDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      contactNumber: doctor.contactNumber || "",
      specialization: doctor.specialization || "",
      department: doctor.department?._id || "",
      bio: doctor.bio || "",
      education: doctor.education || "",
      experience: doctor.experience || "",
      consultationFee: doctor.consultationFee || "",
      profileImage: doctor.profileImage || "",
      isActive: doctor.isActive,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDoctor(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === "add") {
        // For new doctors, we need to set a password
        const doctorData = {
          ...formData,
          password: "tempPassword123", // This should be changed by the doctor on first login
          role: "doctor",
        };
        await api.post("/auth/register", doctorData);
      } else {
        await api.put(`/doctors/${currentDoctor._id}`, formData);
      }

      // Refresh the doctors list
      const response = await api.get("/doctors");
      setDoctors(response.data);

      closeModal();
    } catch (error) {
      console.error("Error saving doctor:", error);
      setError("Failed to save doctor. Please try again.");
    }
  };

  const handleToggleStatus = async (doctor) => {
    try {
      await api.put(`/doctors/${doctor._id}`, {
        isActive: !doctor.isActive,
      });

      // Update the doctor in the local state
      const updatedDoctors = doctors.map((d) =>
        d._id === doctor._id ? { ...d, isActive: !doctor.isActive } : d
      );
      setDoctors(updatedDoctors);
    } catch (error) {
      console.error("Error toggling doctor status:", error);
      setError("Failed to update doctor status. Please try again.");
    }
  };

  const handleDelete = async (doctorId) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) {
      return;
    }

    try {
      await api.delete(`/doctors/${doctorId}`);

      // Remove the doctor from the local state
      const updatedDoctors = doctors.filter((d) => d._id !== doctorId);
      setDoctors(updatedDoctors);
    } catch (error) {
      console.error("Error deleting doctor:", error);
      setError("Failed to delete doctor. Please try again.");
    }
  };

  if (loading) {
    return <LoadingMessage>Loading doctors...</LoadingMessage>;
  }

  return (
    <PageContainer>
      <Header>
        <Title>Manage Doctors</Title>
        <Button onClick={openAddModal}>
          <FaPlus />
          Add New Doctor
        </Button>
      </Header>

      <FiltersContainer>
        <SearchContainer>
          <FaSearch />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FilterSelect
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </FilterSelect>
      </FiltersContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {filteredDoctors.length === 0 ? (
        <ErrorMessage>No doctors found matching your criteria.</ErrorMessage>
      ) : (
        <DoctorsGrid>
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id}>
              <DoctorHeader>
                <DoctorAvatar image={doctor.profileImage} />
                <DoctorInfo>
                  <DoctorName>Dr. {doctor.name}</DoctorName>
                  {doctor.specialization && (
                    <DoctorSpecialization>
                      {doctor.specialization}
                    </DoctorSpecialization>
                  )}
                  {doctor.department && (
                    <DoctorDepartment>
                      {doctor.department.name}
                    </DoctorDepartment>
                  )}
                  <StatusBadge active={doctor.isActive}>
                    {doctor.isActive ? "Active" : "Inactive"}
                  </StatusBadge>
                </DoctorInfo>
              </DoctorHeader>

              <DoctorContent>
                <DoctorDetails>
                  <DetailItem>
                    <span>Email:</span> {doctor.email}
                  </DetailItem>
                  {doctor.contactNumber && (
                    <DetailItem>
                      <span>Contact:</span> {doctor.contactNumber}
                    </DetailItem>
                  )}
                  {doctor.consultationFee && (
                    <DetailItem>
                      <span>Fee:</span> ${doctor.consultationFee}
                    </DetailItem>
                  )}
                </DoctorDetails>

                <ActionButtons>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => openEditModal(doctor)}
                  >
                    <FaEdit />
                    Edit
                  </Button>
                  <Button
                    variant={doctor.isActive ? "warning" : "success"}
                    size="small"
                    onClick={() => handleToggleStatus(doctor)}
                  >
                    {doctor.isActive ? (
                      <>
                        <FaTimes />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        Activate
                      </>
                    )}
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    <FaTrash />
                    Delete
                  </Button>
                </ActionButtons>
              </DoctorContent>
            </DoctorCard>
          ))}
        </DoctorsGrid>
      )}

      {isModalOpen && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ModalTitle>
              {modalMode === "add" ? "Add New Doctor" : "Edit Doctor"}
            </ModalTitle>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={modalMode === "edit"}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="department">Department</Label>
                <FilterSelect
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </FilterSelect>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                <Input
                  type="number"
                  id="consultationFee"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="education">Education</Label>
                <Input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="experience">Experience (years)</Label>
                <Input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="profileImage">Profile Image URL</Label>
                <Input
                  type="text"
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />{" "}
                  Active
                </Label>
              </FormGroup>

              <ModalButtons>
                <Button variant="secondary" type="button" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit">
                  {modalMode === "add" ? "Add Doctor" : "Save Changes"}
                </Button>
              </ModalButtons>
            </form>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default ManageDoctors;
