import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaHospital, FaSearch } from "react-icons/fa";
import api from "../services/api";
import Card from "../components/ui/Card";

const DepartmentsContainer = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
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
    flex: 1;
    border: none;
    background: transparent;
    padding: ${(props) => props.theme.spacing(1)};
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text.primary};

    &:focus {
      outline: none;
    }
  }
`;

const DepartmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const DepartmentCard = styled(motion(Card))`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const DepartmentImage = styled.div`
  height: 200px;
  background-image: url(${(props) =>
    props.image || "https://via.placeholder.com/300x200?text=Department"});
  background-size: cover;
  background-position: center;
  border-top-left-radius: ${(props) => props.theme.borderRadius.medium};
  border-top-right-radius: ${(props) => props.theme.borderRadius.medium};
`;

const DepartmentContent = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DepartmentName = styled.h2`
  font-size: 1.2rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.primary.main};
`;

const DepartmentDescription = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  flex: 1;
`;

const ViewDoctorsButton = styled(Link)`
  display: inline-block;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.status.error};
`;

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const response = await api.get("/departments");
        setDepartments(response.data);
        setFilteredDepartments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Failed to load departments. Please try again later.");
        setLoading(false);
      }
    };

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

  if (loading) {
    return <LoadingMessage>Loading departments...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <DepartmentsContainer>
      <Header>
        <Title>Medical Departments</Title>
        <SearchContainer>
          <FaSearch />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </Header>

      {filteredDepartments.length === 0 ? (
        <ErrorMessage>No departments found matching your search.</ErrorMessage>
      ) : (
        <DepartmentsGrid>
          {filteredDepartments.map((department) => (
            <DepartmentCard
              key={department._id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <DepartmentImage image={department.image} />
              <DepartmentContent>
                <DepartmentName>{department.name}</DepartmentName>
                <DepartmentDescription>
                  {department.description}
                </DepartmentDescription>
                <ViewDoctorsButton to={`/doctors?department=${department._id}`}>
                  View Doctors
                </ViewDoctorsButton>
              </DepartmentContent>
            </DepartmentCard>
          ))}
        </DepartmentsGrid>
      )}
    </DepartmentsContainer>
  );
};

export default Departments;
