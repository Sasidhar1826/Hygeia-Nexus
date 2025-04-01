import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaHospital,
  FaCheck,
  FaTimes,
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

const DepartmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const DepartmentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DepartmentImage = styled.div`
  height: 150px;
  background-image: url(${(props) =>
    props.image || "/images/department-placeholder.jpg"});
  background-size: cover;
  background-position: center;
  border-top-left-radius: ${(props) => props.theme.borderRadius.medium};
  border-top-right-radius: ${(props) => props.theme.borderRadius.medium};
`;

const DepartmentContent = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DepartmentName = styled.h2`
  font-size: 1.2rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const DepartmentStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.8rem;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) =>
    props.active
      ? props.theme.colors.status.success + "20"
      : props.theme.colors.status.error + "20"};
  color: ${(props) =>
    props.active
      ? props.theme.colors.status.success
      : props.theme.colors.status.error};

  svg {
    margin-right: ${(props) => props.theme.spacing(0.5)};
  }
`;

const DepartmentDescription = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  flex: 1;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
  margin-top: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${(props) => props.theme.zIndex.modal};
  padding: ${(props) => props.theme.spacing(3)};
`;

const ModalContent = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(4)};
  width: 100%;
  max-width: 500px;
  box-shadow: ${(props) => props.theme.shadows.large};
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
  color: ${(props) => props.theme.colors.text.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
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

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    isActive: true,
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDepartments(departments);
    } else {
      const filtered = departments.filter(
        (dept) =>
          dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDepartments(filtered);
    }
  }, [searchTerm, departments]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/departments/all");
      setDepartments(response.data);
      setFilteredDepartments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      name: "",
      description: "",
      image: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (department) => {
    setModalMode("edit");
    setCurrentDepartment(department);
    setFormData({
      name: department.name,
      description: department.description,
      image: department.image || "",
      isActive: department.isActive,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDepartment(null);
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
        await api.post("/departments", formData);
      } else {
        await api.put(`/departments/${currentDepartment._id}`, formData);
      }

      fetchDepartments();
      closeModal();
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await api.delete(`/departments/${id}`);
        fetchDepartments();
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  const handleToggleStatus = async (department) => {
    try {
      await api.put(`/departments/${department._id}`, {
        ...department,
        isActive: !department.isActive,
      });
      fetchDepartments();
    } catch (error) {
      console.error("Error updating department status:", error);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>Manage Departments</Title>
        <div style={{ display: "flex", gap: "16px" }}>
          <SearchContainer>
            <FaSearch />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <Button onClick={openAddModal}>
            <FaPlus />
            Add Department
          </Button>
        </div>
      </Header>

      {loading ? (
        <LoadingContainer>Loading departments...</LoadingContainer>
      ) : (
        <DepartmentsGrid>
          {filteredDepartments.map((department) => (
            <DepartmentCard key={department._id}>
              <DepartmentImage image={department.image} />
              <DepartmentContent>
                <DepartmentName>{department.name}</DepartmentName>
                <DepartmentStatus active={department.isActive}>
                  {department.isActive ? (
                    <>
                      <FaCheck />
                      Active
                    </>
                  ) : (
                    <>
                      <FaTimes />
                      Inactive
                    </>
                  )}
                </DepartmentStatus>
                <DepartmentDescription>
                  {department.description}
                </DepartmentDescription>
                <ActionButtons>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => openEditModal(department)}
                  >
                    <FaEdit />
                    Edit
                  </Button>
                  <Button
                    variant={department.isActive ? "warning" : "success"}
                    size="small"
                    onClick={() => handleToggleStatus(department)}
                  >
                    {department.isActive ? (
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
                    onClick={() => handleDelete(department._id)}
                  >
                    <FaTrash />
                    Delete
                  </Button>
                </ActionButtons>
              </DepartmentContent>
            </DepartmentCard>
          ))}
        </DepartmentsGrid>
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
              {modalMode === "add" ? "Add New Department" : "Edit Department"}
            </ModalTitle>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Department Name</Label>
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
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
                  {modalMode === "add" ? "Add Department" : "Save Changes"}
                </Button>
              </ModalButtons>
            </form>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default ManageDepartments;
