import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFileMedical,
  FaFilePdf,
  FaFileImage,
  FaFileAlt,
  FaVial,
  FaFlask,
  FaExclamationTriangle,
  FaCheck,
} from "react-icons/fa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import PageTransition from "../components/animations/PageTransition";
import ViewLabReport from "../components/modals/ViewLabReport";
import LabReportCard from "../components/medical/LabReportCard";
import api from "../services/apiService";
import { toast } from "react-hot-toast";

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
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary.main
      : props.theme.colors.text.secondary};
  border-bottom: 2px solid
    ${(props) =>
      props.$active ? props.theme.colors.primary.main : "transparent"};
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

const LabReportsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
  width: 100%;
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

const MedicalRecords = () => {
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [selectedLabReport, setSelectedLabReport] = useState(null);
  const [showLabReportModal, setShowLabReportModal] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        // Fetch records from api
        const medicalRecordsResponse = await api.getMedicalRecords();

        // Fetch lab reports for the current user if they are a patient
        let labReports = [];
        if (user && user.role === "patient") {
          try {
            const labReportsResponse = await api.getLabReports({
              patient: user._id,
            });

            // Check if labReportsResponse is an array before calling map
            if (Array.isArray(labReportsResponse)) {
              labReports = labReportsResponse.map((report) => ({
                ...report,
                id: report._id,
                fileType: "lab",
                rawReport: report,
              }));
            } else {
              console.error(
                "Error: Lab reports response is not an array:",
                labReportsResponse
              );
              // If there's data property that might contain the array
              if (
                labReportsResponse &&
                Array.isArray(labReportsResponse.data)
              ) {
                labReports = labReportsResponse.data.map((report) => ({
                  ...report,
                  id: report._id,
                  fileType: "lab",
                  rawReport: report,
                }));
              } else {
                // Handle case where response is not as expected
                labReports = [];
              }
            }
          } catch (error) {
            console.error("Error fetching lab reports:", error);
          }
        }

        setRecords([...medicalRecordsResponse, ...labReports]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching records:", error);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [user]);

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FaFilePdf />;
      case "image":
        return <FaFileImage />;
      case "document":
        return <FaFileAlt />;
      case "lab":
        return <FaFlask />;
      default:
        return <FaFileMedical />;
    }
  };

  const getFileColor = (fileType) => {
    switch (fileType) {
      case "pdf":
        return (props) => props.theme.colors.status.error;
      case "image":
        return (props) => props.theme.colors.info;
      case "document":
        return (props) => props.theme.colors.primary.main;
      case "lab":
        return (props) => props.theme.colors.secondary;
      default:
        return (props) => props.theme.colors.success;
    }
  };

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.type.toLowerCase().includes(filter.toLowerCase()) ||
      record.doctor.toLowerCase().includes(filter.toLowerCase()) ||
      (record.reportType &&
        record.reportType.toLowerCase().includes(filter.toLowerCase()));

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "lab" && record.fileType === "lab") return matchesSearch;
    if (activeTab === "diagnosis" && record.type === "Diagnosis")
      return matchesSearch;
    if (
      activeTab === "imaging" &&
      (record.type === "X-Ray" ||
        record.type === "MRI" ||
        record.type === "CT Scan")
    )
      return matchesSearch;

    return false;
  });

  const handleViewLabReport = (report) => {
    if (report._id) {
      setSelectedLabReport(report);
      setShowLabReportModal(true);
    } else if (report.fileType === "lab" && report.rawReport) {
      setSelectedLabReport(report.rawReport);
      setShowLabReportModal(true);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await api.deleteMedicalRecord(recordId);
      setRecords(records.filter((record) => record.id !== recordId));
      toast.success("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Failed to delete record");
    }
  };

  return (
    <PageTransition>
      <PageContainer>
        <TopBar>
          <h1>Medical Records</h1>
          <SearchContainer>
            <FaSearch />
            <input
              type="text"
              placeholder="Search records..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </SearchContainer>
        </TopBar>

        <TabsContainer>
          <Tab
            $active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          >
            All Records
          </Tab>
          <Tab
            $active={activeTab === "lab"}
            onClick={() => setActiveTab("lab")}
          >
            Lab Reports
          </Tab>
          <Tab
            $active={activeTab === "diagnosis"}
            onClick={() => setActiveTab("diagnosis")}
          >
            Diagnoses
          </Tab>
          <Tab
            $active={activeTab === "imaging"}
            onClick={() => setActiveTab("imaging")}
          >
            Imaging
          </Tab>
        </TabsContainer>

        {loading ? (
          <div>Loading records...</div>
        ) : filteredRecords.length > 0 ? (
          <>
            {activeTab === "lab" ? (
              <LabReportsContainer>
                {filteredRecords.map((record) => (
                  <LabReportCard
                    key={record.id}
                    report={record.rawReport}
                    onClick={handleViewLabReport}
                  />
                ))}
              </LabReportsContainer>
            ) : (
              <RecordsGrid>
                {filteredRecords.map((record) =>
                  record.fileType === "lab" ? (
                    <LabReportCard
                      key={record.id}
                      report={record.rawReport}
                      onClick={handleViewLabReport}
                    />
                  ) : (
                    <RecordCard
                      key={record.id}
                      onClick={() =>
                        record.fileType === "lab"
                          ? handleViewLabReport(record)
                          : null
                      }
                      style={{
                        cursor:
                          record.fileType === "lab" ? "pointer" : "default",
                      }}
                    >
                      <RecordHeader>
                        <RecordIcon color={getFileColor(record.fileType)}>
                          {getFileIcon(record.fileType)}
                        </RecordIcon>
                        <RecordInfo>
                          <RecordTitle>
                            {record.reportType || record.type}
                          </RecordTitle>
                          <RecordDate>
                            {new Date(record.date).toLocaleDateString()}
                          </RecordDate>
                        </RecordInfo>
                      </RecordHeader>
                      <RecordContent>
                        <RecordDetails>
                          <RecordDetail>
                            <span>Provider:</span>
                            <span>{record.doctor}</span>
                          </RecordDetail>
                          <RecordDetail>
                            <span>Department:</span>
                            <span>{record.department}</span>
                          </RecordDetail>

                          {record.details && record.details.notes && (
                            <div
                              style={{ marginTop: "10px", fontSize: "0.9em" }}
                            >
                              <div
                                style={{
                                  fontWeight: "600",
                                  marginBottom: "5px",
                                }}
                              >
                                Notes:
                              </div>
                              <div>{record.details.notes}</div>
                            </div>
                          )}
                        </RecordDetails>
                        <RecordActions>
                          <Button size="small">View Details</Button>
                        </RecordActions>
                      </RecordContent>
                    </RecordCard>
                  )
                )}
              </RecordsGrid>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h3>No records found</h3>
            <p>
              {filter
                ? "Try adjusting your search criteria"
                : "You don't have any medical records yet"}
            </p>
          </div>
        )}

        <ViewLabReport
          isOpen={showLabReportModal}
          onClose={() => setShowLabReportModal(false)}
          report={selectedLabReport}
        />
      </PageContainer>
    </PageTransition>
  );
};

export default MedicalRecords;
