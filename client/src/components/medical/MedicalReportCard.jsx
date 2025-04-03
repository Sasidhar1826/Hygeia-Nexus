import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaFileMedical,
  FaCalendarAlt,
  FaUser,
  FaDownload,
  FaPrint,
  FaHeartbeat,
  FaChartLine,
  FaNotesMedical,
  FaSyringe,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaCheck,
} from "react-icons/fa";

const ReportCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
  overflow: hidden;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  border: 1px solid ${(props) => props.theme.colors.border.main};
`;

const ReportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.default};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.main};
  cursor: pointer;
`;

const ReportTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const ReportDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ReportContent = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
  display: ${(props) => (props.$isExpanded ? "block" : "none")};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const InfoSection = styled.div`
  background-color: ${(props) => props.theme.colors.background.default};
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

const SectionTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.primary};

  svg {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(0.5)} 0;
  border-bottom: 1px dotted ${(props) => props.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }
`;

const DataLabel = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const DataValue = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: ${(props) => (props.$abnormal ? "600" : "normal")};

  ${(props) =>
    props.$abnormal &&
    `
    color: ${props.theme.colors.status.error};
  `}
`;

const DiagnosisSection = styled.div`
  background-color: ${(props) =>
    props.$highlighted
      ? `${props.theme.colors.primary.main}10`
      : props.theme.colors.background.default};
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  border-left: 3px solid ${(props) => props.theme.colors.primary.main};
`;

const NotesSection = styled.div`
  margin-top: ${(props) => props.theme.spacing(3)};
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.small};
  white-space: pre-line;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(3)};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => `${props.theme.spacing(1)} ${props.theme.spacing(2)}`};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.colors.background.default
      : props.theme.colors.primary.main};
  color: ${(props) =>
    props.variant === "secondary" ? props.theme.colors.text.primary : "white"};
  border: 1px solid
    ${(props) =>
      props.variant === "secondary"
        ? props.theme.colors.border.main
        : props.theme.colors.primary.main};
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary"
        ? props.theme.colors.background.paper
        : props.theme.colors.primary.dark};
  }
`;

const VisualIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: ${(props) => props.theme.spacing(1)};
  margin: ${(props) => props.theme.spacing(1)} 0;
  color: ${(props) => {
    if (props.$status === "normal") return props.theme.colors.success;
    if (props.$status === "warning") return props.theme.colors.warning;
    if (props.$status === "alert") return props.theme.colors.status.error;
    return props.theme.colors.text.secondary;
  }};
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const MedicalReportCard = ({ report }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!report) return null;

  const renderVitalSigns = () => {
    if (!report.vitalSigns) return null;

    const getVitalStatus = (type, value) => {
      if (type === "bloodPressure") {
        const [systolic, diastolic] = value.split("/").map(Number);
        if (systolic >= 140 || diastolic >= 90) return "alert";
        if (systolic >= 120 || diastolic >= 80) return "warning";
        return "normal";
      }

      if (type === "heartRate") {
        const rate = Number(value);
        if (rate > 100 || rate < 60) return "warning";
        if (rate > 120 || rate < 50) return "alert";
        return "normal";
      }

      if (type === "temperature") {
        const temp = Number(value);
        if (temp > 99.5 || temp < 97) return "warning";
        if (temp > 100.4 || temp < 96) return "alert";
        return "normal";
      }

      if (type === "bloodGlucose") {
        const glucose = Number(value);
        if (glucose > 125 || glucose < 70) return "warning";
        if (glucose > 180 || glucose < 55) return "alert";
        return "normal";
      }

      return "normal";
    };

    const getStatusIcon = (status) => {
      if (status === "normal") return <FaCheck />;
      if (status === "warning") return <FaExclamationTriangle />;
      if (status === "alert") return <FaExclamationTriangle />;
      return null;
    };

    return (
      <InfoSection>
        <SectionTitle>
          <FaHeartbeat /> Vital Signs
        </SectionTitle>

        {report.vitalSigns.bloodPressure && (
          <>
            <DataItem>
              <DataLabel>Blood Pressure</DataLabel>
              <DataValue>{report.vitalSigns.bloodPressure}</DataValue>
            </DataItem>
            <VisualIndicator
              $status={getVitalStatus(
                "bloodPressure",
                report.vitalSigns.bloodPressure
              )}
            >
              {getStatusIcon(
                getVitalStatus("bloodPressure", report.vitalSigns.bloodPressure)
              )}
              {getVitalStatus(
                "bloodPressure",
                report.vitalSigns.bloodPressure
              ) === "normal"
                ? "Normal"
                : getVitalStatus(
                    "bloodPressure",
                    report.vitalSigns.bloodPressure
                  ) === "warning"
                ? "Elevated"
                : "Hypertension"}
            </VisualIndicator>
          </>
        )}

        {report.vitalSigns.heartRate && (
          <>
            <DataItem>
              <DataLabel>Heart Rate</DataLabel>
              <DataValue>{report.vitalSigns.heartRate} bpm</DataValue>
            </DataItem>
            <VisualIndicator
              $status={getVitalStatus("heartRate", report.vitalSigns.heartRate)}
            >
              {getStatusIcon(
                getVitalStatus("heartRate", report.vitalSigns.heartRate)
              )}
              {getVitalStatus("heartRate", report.vitalSigns.heartRate) ===
              "normal"
                ? "Normal"
                : "Abnormal"}
            </VisualIndicator>
          </>
        )}

        {report.vitalSigns.temperature && (
          <DataItem>
            <DataLabel>Temperature</DataLabel>
            <DataValue>{report.vitalSigns.temperature}°F</DataValue>
          </DataItem>
        )}

        {report.vitalSigns.respiratoryRate && (
          <DataItem>
            <DataLabel>Respiratory Rate</DataLabel>
            <DataValue>{report.vitalSigns.respiratoryRate} bpm</DataValue>
          </DataItem>
        )}

        {report.vitalSigns.oxygenSaturation && (
          <DataItem>
            <DataLabel>Oxygen Saturation</DataLabel>
            <DataValue>{report.vitalSigns.oxygenSaturation}</DataValue>
          </DataItem>
        )}

        {report.vitalSigns.bloodGlucose && (
          <>
            <DataItem>
              <DataLabel>Blood Glucose</DataLabel>
              <DataValue>{report.vitalSigns.bloodGlucose} mg/dL</DataValue>
            </DataItem>
            <VisualIndicator
              $status={getVitalStatus(
                "bloodGlucose",
                report.vitalSigns.bloodGlucose
              )}
            >
              {getStatusIcon(
                getVitalStatus("bloodGlucose", report.vitalSigns.bloodGlucose)
              )}
              {getVitalStatus(
                "bloodGlucose",
                report.vitalSigns.bloodGlucose
              ) === "normal"
                ? "Normal"
                : getVitalStatus(
                    "bloodGlucose",
                    report.vitalSigns.bloodGlucose
                  ) === "warning"
                ? "Elevated"
                : "High"}
            </VisualIndicator>
          </>
        )}
      </InfoSection>
    );
  };

  return (
    <ReportCard>
      <ReportHeader onClick={() => setIsExpanded(!isExpanded)}>
        <ReportTitle>
          <FaFileMedical /> {report.recordType || "Medical Report"} -{" "}
          {report.diagnosis}
        </ReportTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ReportDate>
            <FaCalendarAlt /> {formatDate(report.date)}
          </ReportDate>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </ReportHeader>

      <ReportContent $isExpanded={isExpanded}>
        <InfoGrid>
          <InfoSection>
            <SectionTitle>
              <FaUser /> Provider Information
            </SectionTitle>
            <DataItem>
              <DataLabel>Doctor</DataLabel>
              <DataValue>
                {report.doctorId?.name || report.doctorId || "Unknown"}
              </DataValue>
            </DataItem>
            <DataItem>
              <DataLabel>Department</DataLabel>
              <DataValue>
                {report.departmentId?.name || report.departmentId || "Unknown"}
              </DataValue>
            </DataItem>
            <DataItem>
              <DataLabel>Consultation ID</DataLabel>
              <DataValue>{report.consultationId || "N/A"}</DataValue>
            </DataItem>
          </InfoSection>

          {renderVitalSigns()}

          <InfoSection>
            <SectionTitle>
              <FaNotesMedical /> Symptoms & Complaints
            </SectionTitle>
            {report.symptoms && report.symptoms.length > 0 ? (
              report.symptoms.map((symptom, index) => (
                <div key={index} style={{ padding: "3px 0" }}>
                  <FaArrowRight
                    style={{ fontSize: "0.8rem", marginRight: "8px" }}
                  />{" "}
                  {symptom}
                </div>
              ))
            ) : (
              <div>No symptoms recorded</div>
            )}
          </InfoSection>
        </InfoGrid>

        <DiagnosisSection $highlighted={true}>
          <SectionTitle>
            <FaChartLine /> Diagnosis
          </SectionTitle>
          <div
            style={{ fontSize: "1.1rem", fontWeight: "500", margin: "8px 0" }}
          >
            {report.diagnosis || "No diagnosis recorded"}
          </div>
        </DiagnosisSection>

        <InfoSection>
          <SectionTitle>
            <FaSyringe /> Treatment Plan
          </SectionTitle>
          <div style={{ margin: "8px 0" }}>
            {report.treatmentPlan || "No treatment plan recorded"}
          </div>
          {report.followUp && (
            <div style={{ marginTop: "12px", fontStyle: "italic" }}>
              Follow-up: {report.followUp}
            </div>
          )}
        </InfoSection>

        {report.notes && (
          <NotesSection>
            <SectionTitle>Clinician Notes</SectionTitle>
            <div style={{ margin: "8px 0" }}>{report.notes}</div>
          </NotesSection>
        )}

        <ActionButtons>
          <Button variant="secondary">
            <FaPrint /> Print
          </Button>
          <Button>
            <FaDownload /> Download PDF
          </Button>
        </ActionButtons>
      </ReportContent>
    </ReportCard>
  );
};

export default MedicalReportCard;
