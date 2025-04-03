import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaPills,
  FaSpinner,
  FaFilePrescription,
} from "react-icons/fa";
import mockApi from "../../services/mockApi";

const ModalOverlay = styled(motion.div)`
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

const ModalContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.large};
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) => props.theme.shadows.large};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(3)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(0)};
  overflow: hidden;
  flex: 1;
`;

const ModalContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const LeftPanel = styled.div`
  flex: 2;
  border-right: 1px solid ${(props) => props.theme.colors.border.main};
  overflow-y: auto;
  max-height: 70vh;
  padding: ${(props) => props.theme.spacing(2)};
`;

const RightPanel = styled.div`
  flex: 1;
  padding: ${(props) => props.theme.spacing(2)};
  overflow-y: auto;
  max-height: 70vh;
  background-color: ${(props) => props.theme.colors.background.default};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  border: 1px solid ${(props) => props.theme.colors.border.main};

  svg {
    color: ${(props) => props.theme.colors.text.secondary};
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  input {
    border: none;
    background: none;
    flex: 1;
    outline: none;
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  overflow-x: auto;
`;

const Tab = styled.button`
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
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
  white-space: nowrap;

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const MedicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${(props) => props.theme.spacing(2)};
`;

const MedicationCard = styled.div`
  background-color: ${(props) => props.theme.colors.background.paper};
  border: 1px solid
    ${(props) =>
      props.$selected
        ? props.theme.colors.primary.main
        : props.theme.colors.border.main};
  box-shadow: ${(props) =>
    props.$selected
      ? `0 0 0 2px ${props.theme.colors.primary.main}30`
      : props.theme.shadows.small};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(2)};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary.main};
    transform: translateY(-2px);
  }
`;

const MedicationHeader = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const MedicationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) => `${props.theme.colors.primary.main}15`};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const MedicationInfo = styled.div`
  flex: 1;
`;

const MedicationName = styled.h4`
  margin: 0;
  font-size: 1rem;
  margin-bottom: 2px;
`;

const MedicationCategory = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const MedicationDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-top: ${(props) => props.theme.spacing(1)};

  span:first-child {
    color: ${(props) => props.theme.colors.text.secondary};
  }

  span:last-child {
    font-weight: 500;
  }
`;

const StockIndicator = styled.div`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 4px;

  &.high {
    background-color: ${(props) => `${props.theme.colors.status.success}20`};
    color: ${(props) => props.theme.colors.status.success};
  }

  &.medium {
    background-color: ${(props) => `${props.theme.colors.status.warning}20`};
    color: ${(props) => props.theme.colors.status.warning};
  }

  &.low {
    background-color: ${(props) => `${props.theme.colors.status.error}20`};
    color: ${(props) => props.theme.colors.status.error};
  }
`;

const PrescriptionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const Input = styled.input`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid ${(props) => props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary.main}30`};
  }
`;

const TextArea = styled.textarea`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid ${(props) => props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.95rem;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary.main}30`};
  }
`;

const Select = styled.select`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid ${(props) => props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary.main}30`};
  }
`;

const NoMedicationsMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing(4)};

  svg {
    animation: spin 1s linear infinite;
    font-size: 1.5rem;
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

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(3)};
  gap: ${(props) => props.theme.spacing(2)};
  border-top: 1px solid ${(props) => props.theme.colors.border.main};
`;

const Button = styled.button`
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.primary {
    background-color: ${(props) => props.theme.colors.primary.main};
    color: white;

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.primary.dark};
    }
  }

  &.secondary {
    background-color: ${(props) => props.theme.colors.background.paper};
    border: 1px solid ${(props) => props.theme.colors.border.main};
    color: ${(props) => props.theme.colors.text.primary};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.background.default};
    }
  }

  svg {
    font-size: 0.9rem;
  }
`;

const PrescriptionModal = ({
  isOpen,
  onClose,
  patientId,
  patientName,
  doctorId,
  doctorName,
}) => {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    quantity: 1,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await mockApi.getMedications();
        setMedications(result);
        setFilteredMedications(result);
      } catch (err) {
        console.error("Error fetching medications:", err);
        setError("Failed to load medications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchMedications();
    }
  }, [isOpen]);

  useEffect(() => {
    filterMedications();
  }, [searchTerm, activeTab, medications]);

  const filterMedications = () => {
    let filtered = [...medications];

    // Apply category/status filter
    if (activeTab === "low-stock") {
      filtered = filtered.filter((med) => med.stockStatus === "low");
    } else if (activeTab !== "all") {
      // This assumes your categories are available as tabs
      filtered = filtered.filter(
        (med) => med.category.toLowerCase() === activeTab
      );
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (med) =>
          med.name.toLowerCase().includes(term) ||
          med.category.toLowerCase().includes(term) ||
          med.manufacturer?.toLowerCase().includes(term)
      );
    }

    setFilteredMedications(filtered);
  };

  const handleMedicationSelect = (medication) => {
    setSelectedMedication(medication);
    // Auto-fill some prescription data based on the medication
    setPrescriptionData({
      ...prescriptionData,
      dosage: medication.dosage || "",
    });
  };

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData({
      ...prescriptionData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedMedication) return;

    try {
      setSubmitting(true);
      setError(null);

      const prescriptionToAdd = {
        medicine: selectedMedication.name,
        medicationId: selectedMedication.id,
        category: selectedMedication.category,
        ...prescriptionData,
        date: new Date().toISOString(),
        doctor: doctorName,
        doctorId: doctorId,
      };

      await mockApi.addPrescriptionToPatient(patientId, prescriptionToAdd);
      onClose(true); // Pass true to indicate success for refreshing
    } catch (err) {
      console.error("Error adding prescription:", err);
      // Handle both error objects and error messages
      const errorMessage =
        err.message || "Failed to add prescription. Please try again.";
      setError(errorMessage);
      setSubmitting(false); // Make sure to set submitting to false here
    }
  };

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

  const renderCategories = () => {
    // Get unique categories for tabs
    const categories = Array.from(
      new Set(medications.map((med) => med.category.toLowerCase()))
    );

    return (
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
        {categories.slice(0, 5).map((category) => (
          <Tab
            key={category}
            $active={activeTab === category}
            onClick={() => setActiveTab(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Tab>
        ))}
      </TabsContainer>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <ModalContainer
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <ModalHeader>
            <ModalTitle>
              <FaFilePrescription /> Prescribe Medication for {patientName}
            </ModalTitle>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>

          <ModalBody>
            <SearchBar>
              <FaSearch />
              <input
                type="text"
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>

            <ModalContent>
              <LeftPanel>
                {renderCategories()}

                {loading ? (
                  <LoadingSpinner>
                    <FaSpinner />
                  </LoadingSpinner>
                ) : error ? (
                  <NoMedicationsMessage>{error}</NoMedicationsMessage>
                ) : filteredMedications.length === 0 ? (
                  <NoMedicationsMessage>
                    No medications found. Try adjusting your filters.
                  </NoMedicationsMessage>
                ) : (
                  <MedicationsGrid>
                    {filteredMedications.map((medication) => (
                      <MedicationCard
                        key={medication.id}
                        $selected={selectedMedication?.id === medication.id}
                        onClick={() => handleMedicationSelect(medication)}
                      >
                        <MedicationHeader>
                          <MedicationIcon>
                            <FaPills />
                          </MedicationIcon>
                          <MedicationInfo>
                            <MedicationName>{medication.name}</MedicationName>
                            <MedicationCategory>
                              {medication.category}
                            </MedicationCategory>
                          </MedicationInfo>
                        </MedicationHeader>

                        <MedicationDetail>
                          <span>Dosage:</span>
                          <span>{medication.dosage}</span>
                        </MedicationDetail>

                        <MedicationDetail>
                          <span>Form:</span>
                          <span>{medication.form}</span>
                        </MedicationDetail>

                        <MedicationDetail>
                          <span>Stock:</span>
                          <span>
                            {medication.stock} units
                            <StockIndicator className={medication.stockStatus}>
                              {getStockLabel(medication.stockStatus)}
                            </StockIndicator>
                          </span>
                        </MedicationDetail>
                      </MedicationCard>
                    ))}
                  </MedicationsGrid>
                )}
              </LeftPanel>

              <RightPanel>
                <h3>Prescription Details</h3>

                {!selectedMedication ? (
                  <div
                    style={{
                      padding: "20px 0",
                      color: "#666",
                      textAlign: "center",
                    }}
                  >
                    Please select a medication from the list
                  </div>
                ) : (
                  <PrescriptionForm
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <FormGroup>
                      <Label>Selected Medication</Label>
                      <div style={{ fontWeight: 500 }}>
                        {selectedMedication.name} ({selectedMedication.dosage})
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="dosage">Dosage Instructions*</Label>
                      <Input
                        id="dosage"
                        name="dosage"
                        value={prescriptionData.dosage}
                        onChange={handlePrescriptionChange}
                        required
                        placeholder="e.g., 2 tablets"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="frequency">Frequency*</Label>
                      <Select
                        id="frequency"
                        name="frequency"
                        value={prescriptionData.frequency}
                        onChange={handlePrescriptionChange}
                        required
                      >
                        <option value="">Select frequency</option>
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">
                          Three times daily
                        </option>
                        <option value="Four times daily">
                          Four times daily
                        </option>
                        <option value="Every 4 hours">Every 4 hours</option>
                        <option value="Every 6 hours">Every 6 hours</option>
                        <option value="Every 8 hours">Every 8 hours</option>
                        <option value="Every 12 hours">Every 12 hours</option>
                        <option value="As needed">As needed</option>
                        <option value="Weekly">Weekly</option>
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="duration">Duration*</Label>
                      <Input
                        id="duration"
                        name="duration"
                        value={prescriptionData.duration}
                        onChange={handlePrescriptionChange}
                        required
                        placeholder="e.g., 7 days"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        value={prescriptionData.quantity}
                        onChange={handlePrescriptionChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="instructions">
                        Additional Instructions
                      </Label>
                      <TextArea
                        id="instructions"
                        name="instructions"
                        value={prescriptionData.instructions}
                        onChange={handlePrescriptionChange}
                        placeholder="Any special instructions for taking this medication"
                      />
                    </FormGroup>

                    {error && (
                      <div
                        style={{
                          color: "red",
                          padding: "8px",
                          backgroundColor: "#fee",
                          borderRadius: "4px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {error}
                      </div>
                    )}
                  </PrescriptionForm>
                )}
              </RightPanel>
            </ModalContent>
          </ModalBody>

          <ActionButtons>
            <Button className="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="primary"
              onClick={handleSubmit}
              disabled={
                !selectedMedication ||
                !prescriptionData.dosage ||
                !prescriptionData.frequency ||
                !prescriptionData.duration ||
                submitting
              }
            >
              {submitting ? (
                <>
                  <FaSpinner className="spin" /> Prescribing...
                </>
              ) : (
                <>
                  <FaFilePrescription /> Prescribe Medication
                </>
              )}
            </Button>
          </ActionButtons>
        </ModalContainer>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default PrescriptionModal;
