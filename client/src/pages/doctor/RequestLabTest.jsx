import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaFlask,
  FaUserInjured,
  FaCalendarAlt,
  FaClipboardList,
  FaCheck,
  FaSearch,
} from "react-icons/fa";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import mockApi from "../../services/mockApi";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
  padding: ${(props) => props.theme.spacing(3)};
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing(2)};
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const FormContainer = styled(Card)`
  padding: ${(props) => props.theme.spacing(3)};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  font-weight: 500;
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

const Select = styled.select`
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

const TextArea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 1rem;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
  }
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

const RequestsContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing(4)};
`;

const RequestsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${(props) => props.theme.spacing(2)};

  th,
  td {
    padding: ${(props) => props.theme.spacing(2)};
    text-align: left;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }

  th {
    font-weight: 600;
    color: ${(props) => props.theme.colors.text.secondary};
    background-color: ${(props) => props.theme.colors.background.paper};
  }

  tr:hover {
    background-color: ${(props) => props.theme.colors.background.paper};
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;

  &.pending {
    background-color: ${(props) => props.theme.colors.warning.light};
    color: ${(props) => props.theme.colors.warning.dark};
  }

  &.in-progress {
    background-color: ${(props) => props.theme.colors.info.light};
    color: ${(props) => props.theme.colors.info.dark};
  }

  &.completed {
    background-color: ${(props) => props.theme.colors.success.light};
    color: ${(props) => props.theme.colors.success.dark};
  }

  svg {
    margin-right: ${(props) => props.theme.spacing(0.5)};
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.success.light};
  color: ${(props) => props.theme.colors.success.dark};
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  display: flex;
  align-items: center;

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;

const RequestLabTest = () => {
  const [patients, setPatients] = useState([]);
  const [labTechnicians, setLabTechnicians] = useState([]);
  const [testTypes, setTestTypes] = useState([
    "Blood Test",
    "Urine Test",
    "X-Ray",
    "MRI",
    "CT Scan",
    "Ultrasound",
    "ECG",
  ]);
  const [formData, setFormData] = useState({
    patient: "",
    testType: "",
    urgency: "normal",
    specialInstructions: "",
    requiredDate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [labRequests, setLabRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patients
        const patientsData = await mockApi.getPatients();
        setPatients(patientsData);

        // Fetch lab technicians
        const techsData = await mockApi.getLabTechnicians();
        setLabTechnicians(techsData);

        // Fetch lab requests for this doctor
        const requestsData = await mockApi.getLabRequests({ doctorId: "2" }); // Replace with actual doctor ID
        setLabRequests(requestsData);
        setFilteredRequests(requestsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRequests(labRequests);
    } else {
      const filtered = labRequests.filter(
        (request) =>
          request.patient.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          request.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRequests(filtered);
    }
  }, [searchTerm, labRequests]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the selected patient's full information
      const patient = patients.find((p) => p._id === formData.patient);

      // Create new lab request
      const newRequest = {
        ...formData,
        patient: {
          _id: patient._id,
          name: patient.name,
        },
        doctor: {
          _id: "2", // Replace with actual doctor ID
          name: "Dr. Sarah Johnson", // Replace with actual doctor name
        },
        status: "pending",
        requestDate: new Date().toISOString(),
      };

      // Call mock API to create lab request
      const response = await mockApi.createLabRequest(newRequest);

      // Update the local state with the new request
      setLabRequests([response, ...labRequests]);
      setFilteredRequests([response, ...filteredRequests]);

      // Reset form
      setFormData({
        patient: "",
        testType: "",
        urgency: "normal",
        specialInstructions: "",
        requiredDate: "",
      });

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error creating lab request:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Request Lab Tests</Title>
        <SearchContainer>
          <FaSearch />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </PageHeader>

      {showSuccess && (
        <SuccessMessage
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <FaCheck /> Lab test request successfully submitted
        </SuccessMessage>
      )}

      <FormContainer>
        <h2>New Lab Test Request</h2>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="patient">Patient</Label>
              <Select
                id="patient"
                name="patient"
                value={formData.patient}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="testType">Test Type</Label>
              <Select
                id="testType"
                name="testType"
                value={formData.testType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Test Type</option>
                {testTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="urgency">Urgency</Label>
              <Select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                required
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="emergency">Emergency</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="requiredDate">Required By Date</Label>
              <Input
                type="date"
                id="requiredDate"
                name="requiredDate"
                value={formData.requiredDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <TextArea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              placeholder="Enter any special instructions or requirements for the test"
            />
          </FormGroup>

          <Button type="submit" variant="primary">
            <FaFlask /> Submit Request
          </Button>
        </form>
      </FormContainer>

      <RequestsContainer>
        <h2>My Lab Test Requests</h2>

        {filteredRequests.length === 0 ? (
          <Card>
            <p>No lab test requests found.</p>
          </Card>
        ) : (
          <RequestsTable>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Test Type</th>
                <th>Request Date</th>
                <th>Required By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.patient.name}</td>
                  <td>{request.testType}</td>
                  <td>{formatDate(request.requestDate)}</td>
                  <td>{formatDate(request.requiredDate)}</td>
                  <td>
                    <StatusBadge className={request.status}>
                      {request.status === "pending" && "Pending"}
                      {request.status === "in-progress" && "In Progress"}
                      {request.status === "completed" && "Completed"}
                    </StatusBadge>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() =>
                        window.alert(
                          "View details functionality will be implemented soon"
                        )
                      }
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </RequestsTable>
        )}
      </RequestsContainer>
    </PageContainer>
  );
};

export default RequestLabTest;
