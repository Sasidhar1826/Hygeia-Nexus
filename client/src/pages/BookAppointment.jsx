import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaUserMd,
  FaHospital,
  FaMoneyBillWave,
  FaVideo,
} from "react-icons/fa";
import api from "../services/api";
import mockApi from "../services/mockApi";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";

const BookingContainer = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
`;

const BookingHeader = styled.div`
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

const BookingContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${(props) => props.theme.spacing(3)};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DoctorInfoCard = styled(Card)`
  padding: 0;
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
  background-image: url(${(props) => props.image || "/default-doctor.png"});
  background-size: cover;
  background-position: center;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const DoctorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DoctorName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const DoctorSpecialization = styled.p`
  margin: ${(props) => props.theme.spacing(0.5)} 0;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const DoctorDepartment = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.primary.main};
  font-weight: 500;
`;

const DoctorDetails = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(1.5)};

  svg {
    color: ${(props) => props.theme.colors.text.secondary};
    margin-right: ${(props) => props.theme.spacing(1)};
    min-width: 20px;
  }
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-right: ${(props) => props.theme.spacing(1)};
`;

const DetailValue = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
`;

const BookingFormCard = styled(Card)`
  padding: ${(props) => props.theme.spacing(3)};
`;

const FormSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const DateSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const DateButton = styled.button`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.primary.main
        : props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.light
      : props.theme.colors.background.paper};
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.contrastText
      : props.theme.colors.text.primary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      !props.isSelected && props.theme.colors.background.default};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light};
  }
`;

const TimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: ${(props) => props.theme.spacing(1)};
`;

const TimeSlot = styled.button`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.primary.main
        : props.isAvailable
        ? props.theme.colors.border
        : props.theme.colors.status.error};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.light
      : props.isAvailable
      ? props.theme.colors.background.paper
      : props.theme.colors.status.errorLight};
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.contrastText
      : props.isAvailable
      ? props.theme.colors.text.primary
      : props.theme.colors.status.error};
  font-size: 0.8rem;
  cursor: ${(props) => (props.isAvailable ? "pointer" : "not-allowed")};
  opacity: ${(props) => (props.isAvailable ? 1 : 0.7)};

  &:hover {
    background-color: ${(props) =>
      props.isAvailable && !props.isSelected
        ? props.theme.colors.background.default
        : props.isSelected
        ? props.theme.colors.primary.light
        : props.theme.colors.status.errorLight};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.background.paper};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}40;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.background.paper};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}40;
  }
`;

const AppointmentTypeSelector = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const AppointmentTypeButton = styled.button`
  flex: 1;
  padding: ${(props) => props.theme.spacing(1.5)};
  border: 1px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.primary.main
        : props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.light
      : props.theme.colors.background.paper};
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.contrastText
      : props.theme.colors.text.primary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing(0.5)};

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${(props) =>
      !props.isSelected && props.theme.colors.background.default};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light};
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing(1)};
`;

const Checkbox = styled.input`
  margin-right: ${(props) => props.theme.spacing(1)};
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1.5)};
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.status.error};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  font-size: 0.9rem;
  padding: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.theme.colors.status.errorLight};
  border-radius: ${(props) => props.theme.borderRadius.small};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const SuccessMessage = styled.div`
  color: ${(props) => props.theme.colors.status.success};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  font-size: 0.9rem;
  padding: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.theme.colors.status.successLight};
  border-radius: ${(props) => props.theme.borderRadius.small};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [reason, setReason] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Mock available time slots
  const availableTimeSlots = [
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: false },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: false },
    { time: "12:00", available: false },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: false },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
  ];

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        // Use mockApi instead of direct API call
        const response = await mockApi.getDoctorById(doctorId);
        setDoctor(response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctor:", err);
        setError("Failed to load doctor information. Please try again later.");
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTimeSlot || !reason) {
      setError("Please fill in all required fields");
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    if (!user || !user._id) {
      setError("You must be logged in to book an appointment");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Ensure consistent time format (24-hour format without AM/PM)
      const formattedStartTime = selectedTimeSlot;

      // Calculate appointment end time (30 min duration)
      const [hours, minutes] = formattedStartTime.split(":");
      const startTime = new Date(selectedDate);
      startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 30);

      const formattedEndTime = `${endTime
        .getHours()
        .toString()
        .padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`;

      // Format date for appointment
      const appointmentDate = new Date(selectedDate)
        .toISOString()
        .split("T")[0];

      console.log("Creating appointment with times:", {
        date: appointmentDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });

      const appointmentData = {
        patient: user._id,
        doctor: doctorId,
        department: doctor.department._id,
        appointmentDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        reason,
        notes: additionalNotes,
        type: appointmentType,
        status: "pending",
      };

      // Use mockApi instead of direct API call
      const response = await mockApi.createAppointment(appointmentData);
      console.log("Appointment created:", response);

      setSuccess("Appointment booked successfully!");
      setIsSubmitting(false);

      // Redirect to appointments page after 2 seconds
      setTimeout(() => {
        navigate("/dashboard/appointments");
      }, 2000);
    } catch (err) {
      console.error("Error booking appointment:", err);
      setError(
        err.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <BookingContainer>
        <BookingHeader>
          <Title>Loading doctor information...</Title>
        </BookingHeader>
      </BookingContainer>
    );
  }

  if (!doctor) {
    return (
      <BookingContainer>
        <BookingHeader>
          <Title>Doctor Not Found</Title>
          <Subtitle>
            The doctor you're looking for doesn't exist or has been removed.
          </Subtitle>
        </BookingHeader>
        <ErrorMessage>
          <FaInfoCircle />
          {error || "Doctor not found"}
        </ErrorMessage>
      </BookingContainer>
    );
  }

  return (
    <BookingContainer>
      <BookingHeader>
        <Title>Book an Appointment</Title>
        <Subtitle>
          Select your preferred date and time to book an appointment with Dr.{" "}
          {doctor.name}
        </Subtitle>
      </BookingHeader>

      {error && (
        <ErrorMessage>
          <FaInfoCircle />
          {error}
        </ErrorMessage>
      )}

      {success && (
        <SuccessMessage>
          <FaInfoCircle />
          {success}
        </SuccessMessage>
      )}

      <BookingContent>
        <DoctorInfoCard>
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
                <DoctorDepartment>{doctor.department.name}</DoctorDepartment>
              )}
            </DoctorInfo>
          </DoctorHeader>

          <DoctorDetails>
            <DetailItem>
              <FaUserMd />
              <DetailLabel>Experience:</DetailLabel>
              <DetailValue>{doctor.experience || "Not specified"}</DetailValue>
            </DetailItem>

            <DetailItem>
              <FaHospital />
              <DetailLabel>Department:</DetailLabel>
              <DetailValue>
                {doctor.department?.name || "Not specified"}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <FaMoneyBillWave />
              <DetailLabel>Consultation Fee:</DetailLabel>
              <DetailValue>
                ${doctor.consultationFee || "Not specified"}
              </DetailValue>
            </DetailItem>

            {doctor.bio && (
              <DetailItem
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <FaInfoCircle style={{ marginRight: "8px" }} />
                  <DetailLabel>About:</DetailLabel>
                </div>
                <DetailValue style={{ lineHeight: "1.5" }}>
                  {doctor.bio}
                </DetailValue>
              </DetailItem>
            )}
          </DoctorDetails>
        </DoctorInfoCard>

        <BookingFormCard>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>
                <FaCalendarAlt />
                Select Date
              </SectionTitle>
              <DateSelector>
                {availableDates.map((date) => (
                  <DateButton
                    key={date.toISOString()}
                    type="button"
                    isSelected={
                      selectedDate &&
                      new Date(selectedDate).toDateString() ===
                        date.toDateString()
                    }
                    onClick={() => setSelectedDate(date.toISOString())}
                  >
                    {formatDate(date)}
                  </DateButton>
                ))}
              </DateSelector>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <FaClock />
                Select Time
              </SectionTitle>
              <TimeSlots>
                {availableTimeSlots.map((slot) => (
                  <TimeSlot
                    key={slot.time}
                    type="button"
                    isAvailable={slot.available}
                    isSelected={selectedTimeSlot === slot.time}
                    onClick={() =>
                      slot.available && setSelectedTimeSlot(slot.time)
                    }
                    disabled={!slot.available}
                  >
                    {slot.time}
                  </TimeSlot>
                ))}
              </TimeSlots>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <FaInfoCircle />
                Appointment Type
              </SectionTitle>
              <AppointmentTypeSelector>
                <AppointmentTypeButton
                  type="button"
                  isSelected={appointmentType === "in-person"}
                  onClick={() => setAppointmentType("in-person")}
                >
                  <FaUserMd />
                  In-Person
                </AppointmentTypeButton>
                <AppointmentTypeButton
                  type="button"
                  isSelected={appointmentType === "video"}
                  onClick={() => setAppointmentType("video")}
                >
                  <FaVideo />
                  Video Call
                </AppointmentTypeButton>
              </AppointmentTypeSelector>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <FaInfoCircle />
                Appointment Details
              </SectionTitle>
              <FormGroup>
                <Label htmlFor="reason">Reason for Visit *</Label>
                <Input
                  id="reason"
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="E.g., Annual checkup, Consultation, Follow-up"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="notes">Additional Notes</Label>
                <TextArea
                  id="notes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any additional information you'd like the doctor to know"
                />
              </FormGroup>

              <CheckboxGroup>
                <Checkbox
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <CheckboxLabel htmlFor="terms">
                  I agree to the terms and conditions for booking an appointment
                </CheckboxLabel>
              </CheckboxGroup>
            </FormSection>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.95 }}
            >
              <FaCalendarAlt />
              {isSubmitting ? "Booking Appointment..." : "Book Appointment"}
            </SubmitButton>
          </form>
        </BookingFormCard>
      </BookingContent>
    </BookingContainer>
  );
};

export default BookAppointment;
