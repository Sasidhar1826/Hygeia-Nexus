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
import api from "../../services/apiService";
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
  overflow: hidden;
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
  flex-wrap: wrap;

  > button {
    margin-bottom: ${(props) => props.theme.spacing(1)};
    flex: 1 0 auto;
    min-width: auto;
  }
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
  z-index: 1000;
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
    specialty: "",
    licenseNumber: "",
    department: "",
    bio: "",
    education: "",
    experience: "",
    consultationFee: "",
    profileImage: "",
    isActive: true,
    languages: [],
    gender: "",
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Get real departments data from API
        const departmentsResponse = await api.getDepartments();

        if (Array.isArray(departmentsResponse)) {
          setDepartments(departmentsResponse);
        } else if (
          departmentsResponse &&
          Array.isArray(departmentsResponse.data)
        ) {
          setDepartments(departmentsResponse.data);
        } else {
          console.warn(
            "Unexpected departments response format:",
            departmentsResponse
          );
          setDepartments([]);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Failed to load departments. Please try again later.");
        setDepartments([]);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        // Use api to get doctors
        const response = await api.getDoctors();

        // Check for various response formats
        if (Array.isArray(response)) {
          console.log("Doctors data structure:", response.slice(0, 2));
          setDoctors(response);
          setFilteredDoctors(response);
        } else if (response && response.data && Array.isArray(response.data)) {
          // Handle {message, data} format
          console.log("Doctors data structure:", response.data.slice(0, 2));
          setDoctors(response.data);
          setFilteredDoctors(response.data);
        } else if (
          response &&
          response.message === "No doctors found" &&
          response.data &&
          Array.isArray(response.data)
        ) {
          // Empty data with message
          setDoctors(response.data);
          setFilteredDoctors(response.data);
          console.log("No doctors found in the database");
        } else {
          console.error("Invalid response format:", response);
          setDoctors([]);
          setFilteredDoctors([]);
          setError("Failed to load doctors: Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
        setFilteredDoctors([]);
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (Array.isArray(doctors)) {
      applyFilters();
    }
  }, [searchTerm, selectedDepartment, selectedStatus, doctors]);

  // Helper function to extract department ID from various formats
  const extractDepartmentId = (departmentValue) => {
    if (!departmentValue) return null;

    // If it's an object with an _id property
    if (typeof departmentValue === "object" && departmentValue._id) {
      return departmentValue._id;
    }

    // Otherwise return as is (assuming it's already an ID string)
    return departmentValue;
  };

  const applyFilters = (doctorsToFilter) => {
    const sourceArray = doctorsToFilter || doctors;

    if (!Array.isArray(sourceArray)) {
      setFilteredDoctors([]);
      return [];
    }

    let filtered = [...sourceArray];

    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (doctor.specialty &&
            doctor.specialty
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (doctor.email &&
            doctor.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedDepartment) {
      console.log("Filtering by department:", selectedDepartment);

      filtered = filtered.filter((doctor) => {
        // Extract the department ID using the helper function
        const doctorDeptId = extractDepartmentId(doctor.department);

        // Log to help debug
        console.log(`Doctor: ${doctor.name}, Department ID: ${doctorDeptId}`);

        return doctorDeptId === selectedDepartment;
      });

      console.log(
        `Found ${filtered.length} doctors after department filtering`
      );
    }

    if (selectedStatus) {
      const isActive = selectedStatus === "active";
      filtered = filtered.filter((doctor) => doctor.isActive === isActive);
    }

    // Only set state if we're not working with a passed array
    if (!doctorsToFilter) {
      setFilteredDoctors(filtered);
    }

    return filtered;
  };

  const openAddModal = () => {
    setModalMode("add");

    // Generate random profile image
    const gender = Math.random() > 0.5 ? "male" : "female";
    const index = Math.floor(Math.random() * 100);
    const profileImage = `https://randomuser.me/api/portraits/${
      gender === "male" ? "men" : "women"
    }/${index}.jpg`;

    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      specialty: "",
      licenseNumber: "",
      department: "",
      bio: "",
      education: "",
      experience: "",
      consultationFee: "",
      profileImage: profileImage, // Set the random profile image
      isActive: true,
      languages: [],
      gender: gender, // Also store the gender
    });
    setIsModalOpen(true);
    setError(null);
  };

  const openEditModal = (doctor) => {
    setModalMode("edit");
    // Map the doctor data to our form structure, ensuring all fields are properly mapped
    const doctorData = {
      name: doctor.name || "",
      email: doctor.email || "",
      contactNumber: doctor.phone || doctor.contactNumber || "",
      specialty: doctor.specialty || "",
      licenseNumber: doctor.licenseNumber || "",
      department: doctor.department?._id || doctor.department || "",
      bio: doctor.bio || "",
      education: doctor.education || "",
      experience: doctor.experience || "",
      consultationFee: doctor.consultationFee || "",
      profileImage: doctor.profileImage || "",
      isActive: doctor.isActive !== undefined ? doctor.isActive : true,
      languages: doctor.languages || [],
      gender: doctor.gender || "",
    };
    setFormData(doctorData);
    setCurrentDoctor(doctor);
    setIsModalOpen(true);
    setError(null);
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
        // Validate required fields
        if (!formData.specialty) {
          setError("Specialty field is required");
          return;
        }

        if (!formData.licenseNumber) {
          setError("License number is required");
          return;
        }

        if (!formData.department) {
          setError("Department is required");
          return;
        }

        if (!formData.contactNumber) {
          setError("Contact number is required");
          return;
        }

        if (!formData.gender) {
          setError("Gender is required");
          return;
        }

        // For new doctors, we need to set a password
        const doctorData = {
          ...formData,
          password: "tempPassword123", // This should be changed by the doctor on first login
          role: "doctor",
          // Ensure fields are properly formatted
          specialty: formData.specialty,
          department: formData.department, // Already correctly selected from dropdown
          licenseNumber: formData.licenseNumber,
          consultationFee: formData.consultationFee
            ? Number(formData.consultationFee)
            : 0,
          experience: formData.experience ? Number(formData.experience) : 0,
          // Map contactNumber to phone as required by the server model
          phone: formData.contactNumber,
          // Set gender correctly
          gender: formData.gender,
        };

        try {
          // Use api to add a doctor
          const response = await api.createDoctor(doctorData);

          // Refresh the doctors list
          try {
            const doctorsResponse = await api.getDoctors();
            if (Array.isArray(doctorsResponse)) {
              setDoctors(doctorsResponse);
              setFilteredDoctors(doctorsResponse);
            } else if (
              doctorsResponse &&
              doctorsResponse.data &&
              Array.isArray(doctorsResponse.data)
            ) {
              setDoctors(doctorsResponse.data);
              setFilteredDoctors(doctorsResponse.data);
            }
            closeModal();
          } catch (refreshError) {
            console.error("Error refreshing doctors list:", refreshError);
            // Close modal anyway but show error
            closeModal();
            setError("Doctor added but failed to refresh the list.");
          }
        } catch (addError) {
          console.error("Error adding doctor:", addError);
          let errorMsg =
            "Failed to add doctor. Please check the form and try again.";

          // Extract more specific error message if available
          if (addError.message) {
            errorMsg = addError.message;
          } else if (addError.error) {
            errorMsg = addError.error;
          }

          setError(errorMsg);
        }
      } else if (currentDoctor?._id) {
        try {
          // Prepare update data with proper field mappings
          const updateData = {
            ...formData,
            // Map contactNumber to phone as required by the server model
            phone: formData.contactNumber,
            // Ensure numeric fields are properly formatted
            consultationFee: formData.consultationFee
              ? Number(formData.consultationFee)
              : 0,
            experience: formData.experience ? Number(formData.experience) : 0,
            // Ensure department is properly passed
            department: formData.department,
            // Ensure proper gender value
            gender: formData.gender || undefined,
          };

          // Use api to update a doctor
          const response = await api.updateDoctor(
            currentDoctor._id,
            updateData
          );

          // Refresh the doctors list
          try {
            const doctorsResponse = await api.getDoctors();
            if (Array.isArray(doctorsResponse)) {
              setDoctors(doctorsResponse);
              setFilteredDoctors(doctorsResponse);
            } else if (
              doctorsResponse &&
              doctorsResponse.data &&
              Array.isArray(doctorsResponse.data)
            ) {
              setDoctors(doctorsResponse.data);
              setFilteredDoctors(doctorsResponse.data);
            }
            closeModal();
          } catch (refreshError) {
            console.error("Error refreshing doctors list:", refreshError);
            closeModal();
            setError("Doctor updated but failed to refresh the list.");
          }
        } catch (updateError) {
          console.error("Error updating doctor:", updateError);
          setError(
            "Failed to update doctor. Please check the form and try again."
          );
        }
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
      setError("Failed to save doctor. Please try again.");
    }
  };

  const handleToggleStatus = async (doctor) => {
    if (!doctor || !doctor._id) {
      setError("Cannot update doctor status: Invalid doctor data");
      return;
    }

    try {
      // Use api to update a doctor's status
      await api.updateDoctor(doctor._id, {
        isActive: !doctor.isActive,
      });

      // Update the doctor in the local state
      const updatedDoctors = doctors.map((d) =>
        d._id === doctor._id ? { ...d, isActive: !doctor.isActive } : d
      );
      setDoctors(updatedDoctors);

      // Apply filters on the updated doctors array
      const filteredResults = applyFilters(updatedDoctors);
      setFilteredDoctors(filteredResults);
    } catch (error) {
      console.error("Error toggling doctor status:", error);
      setError("Failed to update doctor status. Please try again.");
    }
  };

  const handleDelete = async (doctorId) => {
    if (!doctorId) {
      setError("Cannot delete doctor: Invalid doctor ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this doctor?")) {
      return;
    }

    try {
      // Use api to delete a doctor
      await api.deleteDoctor(doctorId);

      // Remove the doctor from the local state
      const updatedDoctors = doctors.filter((d) => d._id !== doctorId);
      setDoctors(updatedDoctors);

      // Apply filters on the updated doctors array
      const filteredResults = applyFilters(updatedDoctors);
      setFilteredDoctors(filteredResults);
    } catch (error) {
      console.error("Error deleting doctor:", error);
      let errorMessage = "Failed to delete doctor. Please try again.";

      // Check for specific error responses
      if (error.message) {
        errorMessage = `Failed to delete doctor: ${error.message}`;
      }

      // Display more specific information for common errors
      if (error.status === 404) {
        errorMessage = "The doctor you're trying to delete could not be found.";
      } else if (error.status === 403 || error.status === 401) {
        errorMessage = "You don't have permission to delete this doctor.";
      }

      setError(errorMessage);
    }
  };

  // Helper function to get department name by ID
  const getDepartmentName = (departmentId) => {
    if (!departmentId) return "Not Assigned";

    // If departmentId is actually a department object with a name, return that name directly
    if (typeof departmentId === "object" && departmentId.name) {
      return departmentId.name;
    }

    if (!Array.isArray(departments)) return "Unknown";

    // Extract the ID using our helper function
    const deptId = extractDepartmentId(departmentId);

    const department = departments.find((dept) => dept && dept._id === deptId);
    return department ? department.name : "Unknown";
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
          {departments &&
            departments.length > 0 &&
            departments.map((dept) => (
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

      {selectedDepartment && (
        <div
          style={{
            padding: "8px 16px",
            marginBottom: "16px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            Filtering by department:{" "}
            <strong>{getDepartmentName(selectedDepartment)}</strong>
          </span>
          <button
            onClick={() => setSelectedDepartment("")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Clear
          </button>
        </div>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!filteredDoctors || filteredDoctors.length === 0 ? (
        <ErrorMessage>No doctors found matching your criteria.</ErrorMessage>
      ) : (
        <DoctorsGrid>
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id}>
              <DoctorHeader>
                <DoctorAvatar image={doctor.profileImage} />
                <DoctorInfo>
                  <DoctorName>Dr. {doctor.name}</DoctorName>
                  {doctor.specialty && (
                    <DoctorSpecialization>
                      {doctor.specialty}
                    </DoctorSpecialization>
                  )}
                  {doctor.department && (
                    <DoctorDepartment>
                      {getDepartmentName(doctor.department)}
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
                  {doctor.phone && (
                    <DetailItem>
                      <span>Contact:</span> {doctor.phone}
                    </DetailItem>
                  )}
                  {!doctor.phone && doctor.contactNumber && (
                    <DetailItem>
                      <span>Contact:</span> {doctor.contactNumber}
                    </DetailItem>
                  )}
                  {doctor.licenseNumber && (
                    <DetailItem>
                      <span>License:</span> {doctor.licenseNumber}
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
                  required
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
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  required
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
                  min="0"
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
                  min="0"
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
