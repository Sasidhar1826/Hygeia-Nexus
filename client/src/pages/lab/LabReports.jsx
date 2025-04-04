import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaFileMedical, FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import PageTransition from "../../components/animations/PageTransition";
import AnimationContainer from "../../components/animations/AnimationContainer";
import { useAuth } from "../../context/AuthContext";
import mockAuthService from "../../services/mockApi";
import LabReportCard from "../../components/medical/LabReportCard";
import ViewLabReport from "../../components/modals/ViewLabReport";

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
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.border};

  input {
    border: none;
    background: transparent;
    outline: none;
    margin-left: ${(props) => props.theme.spacing(1)};
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text.primary};
    width: 200px;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Filter = styled.select`
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.paper};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};
  outline: none;
`;

const ReportsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
  width: 100%;
`;

const ReportCard = styled(motion.div)`
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

const ReportCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${(props) => props.theme.spacing(1)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ReportType = styled.h3`
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 600;
  margin: 0;
`;

const ReportInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const InfoLabel = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
`;

const Status = styled.span`
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.status === "completed"
      ? props.theme.colors.status.success + "20"
      : props.theme.colors.status.warning + "20"};
  color: ${(props) =>
    props.status === "completed"
      ? props.theme.colors.status.success
      : props.theme.colors.status.warning};
`;

const ResultsList = styled.div`
  margin-top: ${(props) => props.theme.spacing(1)};
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(0.5)} 0;
  border-bottom: 1px dashed ${(props) => props.theme.colors.border};
  font-size: 0.85rem;

  &:last-child {
    border-bottom: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(1)};
`;

const ActionButton = styled.button`
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(0.5)};
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.colors.primary.main + "10"};
  color: ${(props) => props.theme.colors.primary.main};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.main + "20"};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
`;

const EmptyText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: ${(props) => props.theme.spacing(2)};
  font-size: 0.95rem;
`;

const LabReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    fetchLabReports();
  }, []);

  const fetchLabReports = async () => {
    try {
      setLoading(true);
      // Using mock data for now
      const filters = {};
      if (user?.role === "labtechnician") {
        filters.technician = user._id;
      }
      const data = await mockAuthService.getLabReports(filters);
      setReports(data);
    } catch (error) {
      console.error("Error fetching lab reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      searchTerm === "" ||
      report.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || report.status === statusFilter;

    const matchesType = typeFilter === "" || report.reportType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  if (loading) {
    return (
      <PageTransition>
        <AnimationContainer type="loading" height="300px" />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageContainer>
        <Header>
          <Title>Lab Reports</Title>
          <SearchContainer>
            <SearchInput>
              <FaSearch color="#888" />
              <input
                type="text"
                placeholder="Search by patient or type"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>
          </SearchContainer>
        </Header>

        <FiltersContainer>
          <Filter
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </Filter>
          <Filter
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All types</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Urine Analysis">Urine Analysis</option>
            <option value="X-Ray">X-Ray</option>
            <option value="CT Scan">CT Scan</option>
            <option value="MRI">MRI</option>
          </Filter>
        </FiltersContainer>

        {filteredReports.length > 0 ? (
          <ReportsContainer>
            {filteredReports.map((report) => (
              <LabReportCard
                key={report._id}
                report={report}
                onClick={handleViewReport}
              />
            ))}
          </ReportsContainer>
        ) : (
          <EmptyState>
            <AnimationContainer type="empty" height="200px" />
            <EmptyText>
              No lab reports found matching your filters. Try adjusting your
              search criteria.
            </EmptyText>
          </EmptyState>
        )}

        <ViewLabReport
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          report={selectedReport}
        />
      </PageContainer>
    </PageTransition>
  );
};

export default LabReports;
