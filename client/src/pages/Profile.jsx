import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import mockApi from "../services/mockApi";
import Card from "../components/ui/Card";

const ProfileContainer = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ProfileCard = styled(Card)`
  padding: ${(props) => props.theme.spacing(4)};
`;

const ProfileSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(4)};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing(3)};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const InfoLabel = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const InfoValue = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const EditButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: ${(props) => props.theme.spacing(2)};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
  }

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(3)};
`;

const CancelButton = styled(EditButton)`
  background-color: ${(props) => props.theme.colors.text.disabled};

  &:hover {
    background-color: ${(props) => props.theme.colors.text.secondary};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const AppointmentsList = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const AppointmentItem = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) => props.theme.colors.background.paper};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  box-shadow: ${(props) => props.theme.shadows.small};
`;

const AppointmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const AppointmentTitle = styled.h3`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const AppointmentStatus = styled.span`
  font-size: 0.8rem;
  padding: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) => {
    switch (props.status) {
      case "scheduled":
        return props.theme.colors.status.info + "20";
      case "completed":
        return props.theme.colors.status.success + "20";
      case "cancelled":
        return props.theme.colors.status.error + "20";
      default:
        return props.theme.colors.text.disabled + "20";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "scheduled":
        return props.theme.colors.status.info;
      case "completed":
        return props.theme.colors.status.success;
      case "cancelled":
        return props.theme.colors.status.error;
      default:
        return props.theme.colors.text.disabled;
    }
  }};
`;

const AppointmentDetails = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const NoAppointments = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-style: italic;
`;

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        contactNumber: user.contactNumber || "",
      });

      // Fetch user's appointments using mockApi
      const fetchAppointments = async () => {
        try {
          console.log("Fetching appointments for user:", user._id);

          // For development environment, instead of filtering by user ID that doesn't match mock data,
          // return a few sample appointments
          const mockAppointments = [
            {
              _id: "1",
              appointmentDate: new Date(
                new Date().setDate(new Date().getDate() + 3)
              )
                .toISOString()
                .split("T")[0],
              startTime: "10:00 AM",
              endTime: "10:30 AM",
              reason: "Annual Checkup",
              status: "confirmed",
              doctor: {
                _id: "2",
                name: "Dr. Sarah Johnson",
                specialization: "Cardiology",
              },
            },
            {
              _id: "2",
              appointmentDate: new Date(
                new Date().setDate(new Date().getDate() - 5)
              )
                .toISOString()
                .split("T")[0],
              startTime: "02:00 PM",
              endTime: "02:30 PM",
              reason: "Follow-up Consultation",
              status: "completed",
              doctor: {
                _id: "2",
                name: "Dr. Sarah Johnson",
                specialization: "Cardiology",
              },
            },
          ];

          console.log("Returning mock appointments:", mockAppointments);
          setAppointments(mockAppointments);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching appointments:", error);
          setLoading(false);
        }
      };

      fetchAppointments();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting profile update:", formData);
      // Using updateUserProfile from AuthContext which handles the localStorage update
      const updatedUser = await updateUserProfile(formData);
      console.log("Profile updated successfully:", updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Display an error message to the user (in a real app, you'd show this in the UI)
      alert(`Failed to update profile: ${error.message || "Unknown error"}`);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  if (!user) {
    return (
      <ProfileContainer>
        <ProfileHeader>
          <Title>Profile</Title>
          <Subtitle>Loading user information...</Subtitle>
        </ProfileHeader>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Title>My Profile</Title>
        <Subtitle>View and manage your personal information</Subtitle>
      </ProfileHeader>

      <ProfileCard>
        <ProfileSection>
          <SectionTitle>
            <FaUser />
            Personal Information
          </SectionTitle>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </FormGroup>

              <ButtonGroup>
                <EditButton type="submit" whileTap={{ scale: 0.95 }}>
                  <FaSave />
                  Save Changes
                </EditButton>
                <CancelButton
                  type="button"
                  onClick={() => setIsEditing(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes />
                  Cancel
                </CancelButton>
              </ButtonGroup>
            </form>
          ) : (
            <>
              <ProfileInfo>
                <InfoItem>
                  <InfoLabel>Full Name</InfoLabel>
                  <InfoValue>{user.name}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Email Address</InfoLabel>
                  <InfoValue>{user.email}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Contact Number</InfoLabel>
                  <InfoValue>{user.contactNumber || "Not provided"}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Account Type</InfoLabel>
                  <InfoValue>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </InfoValue>
                </InfoItem>
              </ProfileInfo>

              <EditButton
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEdit />
                Edit Profile
              </EditButton>
            </>
          )}
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>
            <FaEnvelope />
            My Appointments
          </SectionTitle>

          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <AppointmentsList>
              {appointments.map((appointment) => (
                <AppointmentItem key={appointment._id}>
                  <AppointmentHeader>
                    <AppointmentTitle>
                      {appointment.doctor?.name || "Doctor"} -
                      {appointment.reason || "Consultation"}
                    </AppointmentTitle>
                    <AppointmentStatus status={appointment.status}>
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </AppointmentStatus>
                  </AppointmentHeader>
                  <AppointmentDetails>
                    <p>Date: {formatDate(appointment.appointmentDate)}</p>
                    <p>
                      Time: {formatTime(appointment.startTime)} -
                      {formatTime(appointment.endTime)}
                    </p>
                    <p>Type: {appointment.type || "In-person"}</p>
                    <p>Reason: {appointment.reason}</p>
                  </AppointmentDetails>
                </AppointmentItem>
              ))}
            </AppointmentsList>
          ) : (
            <NoAppointments>
              You don't have any appointments yet.
            </NoAppointments>
          )}
        </ProfileSection>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
