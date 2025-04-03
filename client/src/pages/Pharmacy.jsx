import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaPills,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilePrescription,
  FaSpinner,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import mockApi from "../services/mockApi";
import { useAuth } from "../context/AuthContext";

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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  width: 300px;
  border: 1px solid #e2e8f0;

  svg {
    color: ${(props) => props.theme.colors.text.secondary};
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  input {
    border: none;
    background: transparent;
    flex: 1;
    color: ${(props) => props.theme.colors.text.primary};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.text.disabled};
    }
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.background.card};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Tab = styled.button`
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(props) =>
      props.$active ? props.theme.colors.primary.main : "transparent"};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary.main
      : props.theme.colors.text.secondary};
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const MedicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const MedicationCard = styled(Card)`
  display: flex;
  flex-direction: column;
  transition: transform ${(props) => props.theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
  }
`;

const MedicationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const MedicationIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${(props) => props.theme.borderRadius.circle};
  background-color: ${(props) => props.theme.colors.primary.main}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.spacing(2)};

  svg {
    font-size: 24px;
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const MedicationInfo = styled.div`
  flex: 1;
`;

const MedicationName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const MedicationCategory = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const MedicationDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(1)} 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.background.card};

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

const StockIndicator = styled.div`
  display: inline-block;
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 12px;
  font-weight: 600;

  &.high {
    background-color: ${(props) => props.theme.colors.status.success}20;
    color: ${(props) => props.theme.colors.status.success};
  }

  &.medium {
    background-color: ${(props) => props.theme.colors.status.warning}20;
    color: ${(props) => props.theme.colors.status.warning};
  }

  &.low {
    background-color: ${(props) => props.theme.colors.status.error}20;
    color: ${(props) => props.theme.colors.status.error};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;

  svg {
    animation: spin 1s linear infinite;
    font-size: 2rem;
    color: ${(props) => props.theme.colors.primary.main};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.status.error};
  background-color: ${(props) => props.theme.colors.status.errorLight};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin: ${(props) => props.theme.spacing(3)} 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};

  svg {
    font-size: 3rem;
    margin-bottom: ${(props) => props.theme.spacing(2)};
    color: ${(props) => props.theme.colors.text.disabled};
  }

  h3 {
    margin-bottom: ${(props) => props.theme.spacing(1)};
  }
`;

const ModalOverlay = styled.div`
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
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  padding: 0 24px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;

  ${FormGroup} {
    flex: 1;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input {
    margin: 0;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #eee;

  button {
    min-width: 100px;
  }

  .spin {
    animation: spin 1s linear infinite;
    margin-right: 8px;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const MedicationModal = ({ isOpen, onClose, medication, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dosage: "",
    form: "",
    stock: 0,
    price: 0,
    manufacturer: "",
    expiryDate: "",
    description: "",
    sideEffects: "",
    prescriptionRequired: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (medication) {
      setFormData({
        name: medication.name || "",
        category: medication.category || "",
        dosage: medication.dosage || "",
        form: medication.form || "",
        stock: medication.stock || 0,
        price: medication.price || 0,
        manufacturer: medication.manufacturer || "",
        expiryDate: medication.expiryDate || "",
        description: medication.description || "",
        sideEffects: medication.sideEffects || "",
        prescriptionRequired: medication.prescriptionRequired || true,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        dosage: "",
        form: "",
        stock: 0,
        price: 0,
        manufacturer: "",
        expiryDate: "",
        description: "",
        sideEffects: "",
        prescriptionRequired: true,
      });
    }
  }, [medication, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = medication
        ? await mockApi.updateMedication(medication.id, formData)
        : await mockApi.addMedication(formData);

      onSave(result);
      onClose();
    } catch (err) {
      console.error("Error saving medication:", err);
      setError(err.message || "Failed to save medication");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{medication ? "Edit Medication" : "Add New Medication"}</h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label htmlFor="name">Name*</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="category">Category*</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="dosage">Dosage*</Label>
              <Input
                id="dosage"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="form">Form*</Label>
              <Input
                id="form"
                name="form"
                value={formData.form}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="stock">Stock Quantity*</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="price">Price ($)*</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YYYY"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="sideEffects">Side Effects</Label>
            <Input
              id="sideEffects"
              name="sideEffects"
              value={formData.sideEffects}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
              />
              Prescription Required
            </CheckboxLabel>
          </FormGroup>

          <ModalActions>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FaSpinner className="spin" /> Saving...
                </>
              ) : medication ? (
                "Update Medication"
              ) : (
                "Add Medication"
              )}
            </Button>
          </ModalActions>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

const Pharmacy = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [medicationToDelete, setMedicationToDelete] = useState(null);

  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true);
      setError(null);

      try {
        const filters = {};

        if (searchTerm) {
          filters.search = searchTerm;
        }

        if (activeTab === "low-stock") {
          filters.stockStatus = "low";
        } else if (activeTab !== "all") {
          const categoryMap = {
            antibiotics: "Antibiotic",
            cardiovascular: { $in: ["Antihypertensive", "Statin"] },
          };

          if (categoryMap[activeTab]) {
            filters.category = categoryMap[activeTab];
          }
        }

        const data = await mockApi.getMedications(filters);
        setMedications(data);
      } catch (err) {
        console.error("Error fetching medications:", err);
        setError("Failed to load medications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, [searchTerm, activeTab]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await mockApi.getMedicationCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const getStockLabel = (status) => {
    switch (status) {
      case "high":
        return "In Stock";
      case "medium":
        return "Limited Stock";
      case "low":
        return "Low Stock";
      default:
        return "Unknown";
    }
  };

  const handleAddClick = () => {
    setSelectedMedication(null);
    setModalOpen(true);
  };

  const handleEditClick = (medication) => {
    setSelectedMedication(medication);
    setModalOpen(true);
  };

  const handleDeleteClick = (medication) => {
    setMedicationToDelete(medication);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!medicationToDelete) return;

    try {
      await mockApi.deleteMedication(medicationToDelete.id);
      setMedications(
        medications.filter((med) => med.id !== medicationToDelete.id)
      );
      setConfirmDeleteOpen(false);
      setMedicationToDelete(null);
    } catch (err) {
      console.error("Error deleting medication:", err);
      setError("Failed to delete medication");
    }
  };

  const handleSaveMedication = (savedMedication) => {
    if (selectedMedication) {
      setMedications(
        medications.map((med) =>
          med.id === savedMedication.id ? savedMedication : med
        )
      );
    } else {
      setMedications([...medications, savedMedication]);
    }
  };

  const handleNavigateToPatientList = () => {
    // Navigate to the patients list page
    navigate("/dashboard/patients");
  };

  return (
    <PageContainer>
      <TopBar>
        <h2>Pharmacy Inventory</h2>

        <SearchContainer>
          <FaSearch />
          <input
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <Button variant="primary" onClick={handleAddClick}>
          <FaPlus />
          Add Medication
        </Button>
      </TopBar>

      <TabsContainer>
        <Tab $active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          All Medications
        </Tab>
        <Tab
          $active={activeTab === "low-stock"}
          onClick={() => setActiveTab("low-stock")}
        >
          Low Stock
        </Tab>
        <Tab
          $active={activeTab === "antibiotics"}
          onClick={() => setActiveTab("antibiotics")}
        >
          Antibiotics
        </Tab>
        <Tab
          $active={activeTab === "cardiovascular"}
          onClick={() => setActiveTab("cardiovascular")}
        >
          Cardiovascular
        </Tab>
      </TabsContainer>

      {loading ? (
        <LoadingSpinner>
          <FaSpinner />
        </LoadingSpinner>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : medications.length === 0 ? (
        <EmptyState>
          <FaPills />
          <h3>No medications found</h3>
          <p>Try adjusting your search or filters</p>
        </EmptyState>
      ) : (
        <MedicationsGrid>
          {medications.map((medication) => (
            <MedicationCard
              key={medication.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <MedicationHeader>
                <MedicationIcon>
                  <FaPills />
                </MedicationIcon>
                <MedicationInfo>
                  <MedicationName>{medication.name}</MedicationName>
                  <MedicationCategory>{medication.category}</MedicationCategory>
                </MedicationInfo>
              </MedicationHeader>

              <MedicationDetails>
                <DetailItem>
                  <DetailLabel>Dosage</DetailLabel>
                  <DetailValue>{medication.dosage}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Form</DetailLabel>
                  <DetailValue>{medication.form}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Stock</DetailLabel>
                  <DetailValue>
                    {medication.stock} units{" "}
                    <StockIndicator className={medication.stockStatus}>
                      {getStockLabel(medication.stockStatus)}
                    </StockIndicator>
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Price</DetailLabel>
                  <DetailValue>
                    ${parseFloat(medication.price).toFixed(2)}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Expiry</DetailLabel>
                  <DetailValue>{medication.expiryDate}</DetailValue>
                </DetailItem>
              </MedicationDetails>

              <ActionButtons>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleEditClick(medication)}
                >
                  <FaEdit /> Edit
                </Button>
                {user?.role === "doctor" && (
                  <Button
                    variant="accent"
                    size="small"
                    onClick={handleNavigateToPatientList}
                  >
                    <FaFilePrescription /> Prescribe
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDeleteClick(medication)}
                >
                  <FaTrash /> Delete
                </Button>
              </ActionButtons>
            </MedicationCard>
          ))}
        </MedicationsGrid>
      )}

      <MedicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        medication={selectedMedication}
        onSave={handleSaveMedication}
      />

      {confirmDeleteOpen && (
        <ModalOverlay>
          <ModalContent style={{ maxWidth: "400px" }}>
            <ModalHeader>
              <h2>Confirm Delete</h2>
              <CloseButton onClick={() => setConfirmDeleteOpen(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            <div style={{ padding: "24px" }}>
              <p>Are you sure you want to delete {medicationToDelete?.name}?</p>
              <p>This action cannot be undone.</p>
            </div>
            <ModalActions>
              <Button
                variant="secondary"
                onClick={() => setConfirmDeleteOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Pharmacy;
