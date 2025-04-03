import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import AnimationContainer from "../components/animations/AnimationContainer";
import PageTransition from "../components/animations/PageTransition";
import { childVariants } from "../components/animations/PageTransition";
import mockApi from "../services/mockApi";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

const ActionButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(4)};
  box-shadow: ${(props) => props.theme.shadows.small};
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: ${(props) => props.theme.spacing(1)};
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const PatientList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const PatientCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.small};
  padding: ${(props) => props.theme.spacing(3)};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) => props.theme.shadows.medium};
  }
`;

const PatientInfo = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const PatientName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const PatientDetail = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const ActionIconButton = styled.button`
  background: none;
  border: none;
  color: ${(props) =>
    props.variant === "delete"
      ? props.theme.colors.status.error
      : props.theme.colors.primary.main};
  cursor: pointer;
  font-size: 1rem;
  padding: ${(props) => props.theme.spacing(0.5)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(6)};
`;

const EmptyStateText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: ${(props) => props.theme.spacing(2)};
  font-size: 1rem;
`;

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch patients from mockApi
    const fetchPatients = async () => {
      try {
        setLoading(true);
        // Fetch real patient data from mockApi
        const response = await mockApi.getPatients();
        console.log("Fetched patients from API:", response);

        // Format patients data to match the expected structure
        const formattedPatients = response.map((patient) => ({
          id: patient._id,
          firstName: patient.firstName || patient.name.split(" ")[0],
          lastName:
            patient.lastName || patient.name.split(" ").slice(1).join(" "),
          gender: patient.gender || "Not specified",
          age: patient.age || calculateAge(patient.dateOfBirth) || 30,
          contactNumber: patient.contactNumber || "Not provided",
          email: patient.email || "Not provided",
          address: {
            city:
              typeof patient.address === "string"
                ? patient.address.split(",")[1]?.trim() || "Unknown"
                : "Unknown",
            state:
              typeof patient.address === "string"
                ? patient.address.split(",")[2]?.trim() || "Unknown"
                : "Unknown",
          },
          bloodGroup: patient.bloodGroup || "Not specified",
          lastVisit: patient.lastVisit || "2024-01-01",
        }));

        setPatients(formattedPatients);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(false);
        // Show error message to user
        alert("Failed to load patients data. Please try again later.");
      }
    };

    fetchPatients();
  }, []);

  // Helper function to calculate age from birth date
  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you might want to fetch filtered data from the server
    // For now, we're just filtering the client-side data
  };

  return (
    <PageTransition>
      <PageHeader>
        <Title>Patients</Title>
        <ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <FaUserPlus /> Add New Patient
        </ActionButton>
      </PageHeader>

      <motion.div variants={childVariants}>
        <form onSubmit={handleSearch}>
          <SearchContainer>
            <FaSearch style={{ margin: "0 10px", color: "#666" }} />
            <SearchInput
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">Search</SearchButton>
          </SearchContainer>
        </form>
      </motion.div>

      {loading ? (
        <AnimationContainer type="loading" height="300px" width="100%" />
      ) : filteredPatients.length > 0 ? (
        <PatientList>
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              variants={childVariants}
              whileHover={{ y: -5 }}
            >
              <PatientInfo>
                <PatientName>{`${patient.firstName} ${patient.lastName}`}</PatientName>
                <PatientDetail>
                  Age: {patient.age} | Gender: {patient.gender}
                </PatientDetail>
                <PatientDetail>Blood Group: {patient.bloodGroup}</PatientDetail>
                <PatientDetail>Email: {patient.email}</PatientDetail>
                <PatientDetail>Contact: {patient.contactNumber}</PatientDetail>
                <PatientDetail>
                  Location: {patient.address.city}, {patient.address.state}
                </PatientDetail>
                <PatientDetail>Last Visit: {patient.lastVisit}</PatientDetail>
              </PatientInfo>
              <CardActions>
                <ActionIconButton
                  as={Link}
                  to={`/dashboard/patients/${patient.id}`}
                >
                  <FaEye />
                </ActionIconButton>
                <ActionIconButton>
                  <FaEdit />
                </ActionIconButton>
                <ActionIconButton variant="delete">
                  <FaTrash />
                </ActionIconButton>
              </CardActions>
            </PatientCard>
          ))}
        </PatientList>
      ) : (
        <EmptyState>
          <AnimationContainer
            type="emptyState"
            height="200px"
            width="100%"
            margin="0 auto"
          />
          <EmptyStateText>
            No patients found. Try adjusting your search or add a new patient.
          </EmptyStateText>
        </EmptyState>
      )}
    </PageTransition>
  );
};

export default Patients;
