import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFileMedical,
  FaFilePdf,
  FaFileImage,
  FaFileAlt,
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
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) =>
    props.active
      ? props.theme.colors.primary.main
      : props.theme.colors.text.secondary};
  border-bottom: 2px solid
    ${(props) =>
      props.active ? props.theme.colors.primary.main : "transparent"};
  transition: all ${(props) => props.theme.transitions.default};

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const RecordsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const RecordCard = styled(Card)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all ${(props) => props.theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
  }
`;

const RecordHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(2)};
  border-bottom: 1px solid ${(props) => props.theme.colors.background.card};
`;

const RecordIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.spacing(2)};

  svg {
    font-size: 24px;
    color: ${(props) => props.color};
  }
`;

const RecordInfo = styled.div`
  flex: 1;
`;

const RecordTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 4px;
`;

const RecordDate = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
`;

const RecordContent = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
`;

const RecordDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
`;

const RecordDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  span:first-child {
    color: ${(props) => props.theme.colors.text.secondary};
  }

  span:last-child {
    font-weight: 500;
  }
`;

const RecordActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.spacing(2)};
  gap: ${(props) => props.theme.spacing(1)};
`;

// Mock medical records data
const mockRecords = [
  {
    id: "MR001",
    patientId: "P001",
    patientName: "John Doe",
    type: "Diagnosis",
    date: "2023-10-05",
    doctor: "Dr. Sarah Johnson",
    department: "General Medicine",
    details: {
      diagnosis: "Common Cold",
      symptoms: "Fever, Cough, Runny Nose",
      notes: "Rest advised for 3 days with medication",
    },
    fileType: "document",
  },
  {
    id: "MR002",
    patientId: "P002",
    patientName: "Jane Smith",
    type: "Lab Report",
    date: "2023-10-03",
    doctor: "Dr. Michael Brown",
    department: "Pathology",
    details: {
      test: "Blood Test",
      result: "Normal",
      notes: "All parameters within normal range",
    },
    fileType: "pdf",
  },
  {
    id: "MR003",
    patientId: "P003",
    patientName: "Robert Johnson",
    type: "Imaging",
    date: "2023-09-28",
    doctor: "Dr. Emily Davis",
    department: "Radiology",
    details: {
      procedure: "X-Ray Chest",
      finding: "No abnormalities detected",
      notes: "Clear lung fields",
    },
    fileType: "image",
  },
  {
    id: "MR004",
    patientId: "P001",
    patientName: "John Doe",
    type: "Prescription",
    date: "2023-10-05",
    doctor: "Dr. Sarah Johnson",
    department: "General Medicine",
    details: {
      medications: "Paracetamol, Cetirizine",
      dosage: "500mg twice daily, 10mg once daily",
      duration: "5 days",
    },
    fileType: "document",
  },
];

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [records, setRecords] = useState(mockRecords);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return (
      matchesSearch && record.type.toLowerCase() === activeTab.toLowerCase()
    );
  });

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FaFilePdf />;
      case "image":
        return <FaFileImage />;
      default:
        return <FaFileAlt />;
    }
  };

  const getFileColor = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "#F44336";
      case "image":
        return "#4CAF50";
      default:
        return "#4A90E2";
    }
  };

  return (
    <PageContainer>
      <TopBar>
        <SearchContainer>
          <FaSearch />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <Button variant="primary">
          <FaFileMedical />
          Add New Record
        </Button>
      </TopBar>

      <TabsContainer>
        <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          All Records
        </Tab>
        <Tab
          active={activeTab === "diagnosis"}
          onClick={() => setActiveTab("diagnosis")}
        >
          Diagnosis
        </Tab>
        <Tab
          active={activeTab === "lab report"}
          onClick={() => setActiveTab("lab report")}
        >
          Lab Reports
        </Tab>
        <Tab
          active={activeTab === "imaging"}
          onClick={() => setActiveTab("imaging")}
        >
          Imaging
        </Tab>
        <Tab
          active={activeTab === "prescription"}
          onClick={() => setActiveTab("prescription")}
        >
          Prescriptions
        </Tab>
      </TabsContainer>

      <RecordsGrid>
        {filteredRecords.map((record) => (
          <RecordCard
            key={record.id}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <RecordHeader>
              <RecordIcon color={getFileColor(record.fileType)}>
                {getFileIcon(record.fileType)}
              </RecordIcon>
              <RecordInfo>
                <RecordTitle>{record.type}</RecordTitle>
                <RecordDate>{record.date}</RecordDate>
              </RecordInfo>
            </RecordHeader>

            <RecordContent>
              <RecordDetails>
                <RecordDetail>
                  <span>Patient:</span>
                  <span>{record.patientName}</span>
                </RecordDetail>
                <RecordDetail>
                  <span>Doctor:</span>
                  <span>{record.doctor}</span>
                </RecordDetail>
                <RecordDetail>
                  <span>Department:</span>
                  <span>{record.department}</span>
                </RecordDetail>

                {Object.entries(record.details).map(([key, value]) => (
                  <RecordDetail key={key}>
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span>{value}</span>
                  </RecordDetail>
                ))}
              </RecordDetails>

              <RecordActions>
                <Button variant="secondary" size="small">
                  View
                </Button>
                <Button variant="accent" size="small">
                  Download
                </Button>
              </RecordActions>
            </RecordContent>
          </RecordCard>
        ))}
      </RecordsGrid>
    </PageContainer>
  );
};

export default MedicalRecords;
