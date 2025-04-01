import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPills,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilePrescription,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

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
      props.active ? props.theme.colors.primary.main : "transparent"};
  color: ${(props) =>
    props.active
      ? props.theme.colors.primary.main
      : props.theme.colors.text.secondary};
  font-weight: ${(props) => (props.active ? 600 : 400)};
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

const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const medications = [
    {
      id: 1,
      name: "Amoxicillin",
      category: "Antibiotic",
      dosage: "500mg",
      form: "Capsule",
      stock: 120,
      stockStatus: "high",
      price: "$12.99",
      manufacturer: "Pfizer",
      expiryDate: "12/2024",
    },
    {
      id: 2,
      name: "Lisinopril",
      category: "Antihypertensive",
      dosage: "10mg",
      form: "Tablet",
      stock: 45,
      stockStatus: "medium",
      price: "$15.50",
      manufacturer: "Merck",
      expiryDate: "06/2024",
    },
    {
      id: 3,
      name: "Metformin",
      category: "Antidiabetic",
      dosage: "850mg",
      form: "Tablet",
      stock: 15,
      stockStatus: "low",
      price: "$8.75",
      manufacturer: "GlaxoSmithKline",
      expiryDate: "09/2024",
    },
    {
      id: 4,
      name: "Atorvastatin",
      category: "Statin",
      dosage: "20mg",
      form: "Tablet",
      stock: 78,
      stockStatus: "high",
      price: "$22.30",
      manufacturer: "AstraZeneca",
      expiryDate: "03/2025",
    },
    {
      id: 5,
      name: "Albuterol",
      category: "Bronchodilator",
      dosage: "90mcg",
      form: "Inhaler",
      stock: 25,
      stockStatus: "medium",
      price: "$45.99",
      manufacturer: "Novartis",
      expiryDate: "11/2024",
    },
    {
      id: 6,
      name: "Sertraline",
      category: "SSRI",
      dosage: "50mg",
      form: "Tablet",
      stock: 8,
      stockStatus: "low",
      price: "$18.25",
      manufacturer: "Teva",
      expiryDate: "08/2024",
    },
  ];

  const filteredMedications = medications.filter((medication) => {
    const matchesSearch =
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "low-stock")
      return matchesSearch && medication.stockStatus === "low";
    if (activeTab === "antibiotics")
      return matchesSearch && medication.category === "Antibiotic";
    if (activeTab === "cardiovascular")
      return (
        matchesSearch &&
        (medication.category === "Antihypertensive" ||
          medication.category === "Statin")
      );

    return matchesSearch;
  });

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

        <Button variant="primary">
          <FaPlus />
          Add Medication
        </Button>
      </TopBar>

      <TabsContainer>
        <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          All Medications
        </Tab>
        <Tab
          active={activeTab === "low-stock"}
          onClick={() => setActiveTab("low-stock")}
        >
          Low Stock
        </Tab>
        <Tab
          active={activeTab === "antibiotics"}
          onClick={() => setActiveTab("antibiotics")}
        >
          Antibiotics
        </Tab>
        <Tab
          active={activeTab === "cardiovascular"}
          onClick={() => setActiveTab("cardiovascular")}
        >
          Cardiovascular
        </Tab>
      </TabsContainer>

      <MedicationsGrid>
        {filteredMedications.map((medication) => (
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
                  {medication.stock} units
                  <StockIndicator className={medication.stockStatus}>
                    {getStockLabel(medication.stockStatus)}
                  </StockIndicator>
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Price</DetailLabel>
                <DetailValue>{medication.price}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Expiry</DetailLabel>
                <DetailValue>{medication.expiryDate}</DetailValue>
              </DetailItem>
            </MedicationDetails>

            <ActionButtons>
              <Button variant="secondary" size="small">
                <FaEdit /> Edit
              </Button>
              <Button variant="accent" size="small">
                <FaFilePrescription /> Prescribe
              </Button>
              <Button variant="danger" size="small">
                <FaTrash /> Delete
              </Button>
            </ActionButtons>
          </MedicationCard>
        ))}
      </MedicationsGrid>
    </PageContainer>
  );
};

export default Pharmacy;
