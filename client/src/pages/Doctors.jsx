import React, { useState, useEffect, forwardRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaSearch,
  FaFilter,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../services/api";
import mockApi from "../services/mockApi";
import Card from "../components/ui/Card";

const DoctorsContainer = styled.div`
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

const FiltersContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const DoctorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
`;

const DoctorCard = styled(motion(Card))`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const DoctorHeader = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spacing(2)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const DoctorAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${(props) =>
    props.image || "/images/doctor-placeholder.jpg"});
  background-size: cover;
  background-position: center;
  margin-right: ${(props) => props.theme.spacing(2)};
  flex-shrink: 0;
`;

const DoctorInfo = styled.div`
  flex: 1;
`;

const DoctorName = styled.h2`
  font-size: 1.2rem;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  color: ${(props) => props.theme.colors.primary.main};
`;

const DoctorSpecialization = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const DoctorDepartment = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const DoctorContent = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DoctorBio = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  flex: 1;
`;

const DoctorFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing(1)};
`;

const ConsultationFee = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

const BookAppointmentButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
  }

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

const Doctors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const departmentId = queryParams.get("department");

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    departmentId || ""
  );
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Use mockApi instead of direct API call
        const response = await mockApi.getDepartments();
        setDepartments(response);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        // Prepare filter parameters
        const filters = {};

        if (selectedDepartment) {
          filters.department = selectedDepartment;
        }

        if (selectedSpecialization) {
          filters.specialization = selectedSpecialization;
        }

        // Use mockApi instead of direct API call
        const response = await mockApi.getDoctors(filters);

        // Ensure we only show active doctors
        const activeDoctors = response.filter(
          (doctor) => doctor.isActive !== false
        );

        setDoctors(activeDoctors);
        setFilteredDoctors(activeDoctors);

        // Extract unique specializations
        const specs = [
          ...new Set(
            activeDoctors.map((doc) => doc.specialization).filter(Boolean)
          ),
        ];
        setSpecializations(specs);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Failed to load doctors. Please try again later.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [selectedDepartment, selectedSpecialization]);

  // Filter doctors based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (doc.specialization &&
            doc.specialization
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (doc.bio && doc.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredDoctors(filtered);
    }
  }, [searchTerm, doctors]);

  // Update URL when department changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedDepartment) {
      params.append("department", selectedDepartment);
    }

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  }, [selectedDepartment, navigate, location.pathname]);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedSpecialization("");
  };

  if (loading) {
    return <LoadingMessage>Loading doctors...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <DoctorsContainer>
      <Header>
        <Title>Our Doctors</Title>
        <SearchContainer>
          <FaSearch />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <FiltersContainer>
        <FilterSelect
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          disabled={specializations.length === 0}
        >
          <option value="">All Specializations</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </FilterSelect>
      </FiltersContainer>

      {filteredDoctors.length === 0 ? (
        <ErrorMessage>No doctors found matching your criteria.</ErrorMessage>
      ) : (
        <DoctorsGrid>
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <DoctorHeader>
                <DoctorAvatar image={doctor.profileImage} />
                <DoctorInfo>
                  <DoctorName>Dr. {doctor.name}</DoctorName>
                  {doctor.specialization && (
                    <DoctorSpecialization>
                      {doctor.specialization}
                    </DoctorSpecialization>
                  )}
                  {doctor.department && (
                    <DoctorDepartment>
                      {typeof doctor.department === "object"
                        ? doctor.department.name
                        : "Department information not available"}
                    </DoctorDepartment>
                  )}
                </DoctorInfo>
              </DoctorHeader>
              <DoctorContent>
                <DoctorBio>
                  {doctor.bio || "No bio available for this doctor."}
                </DoctorBio>
                <DoctorFooter>
                  <ConsultationFee>
                    Fee: ${doctor.consultationFee || "N/A"}
                  </ConsultationFee>
                  <BookAppointmentButton
                    to={`/dashboard/book-appointment/${doctor._id}`}
                  >
                    <FaCalendarAlt />
                    Book Appointment
                  </BookAppointmentButton>
                </DoctorFooter>
              </DoctorContent>
            </DoctorCard>
          ))}
        </DoctorsGrid>
      )}
    </DoctorsContainer>
  );
};

export default Doctors;
