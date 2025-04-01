import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaHospital,
  FaUserMd,
  FaCalendarAlt,
  FaVideo,
  FaFileMedical,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaHeartbeat,
  FaNotesMedical,
  FaPrescriptionBottleAlt,
  FaStethoscope,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const HomeContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  padding: ${(props) => props.theme.spacing(3)};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: ${(props) => props.theme.spacing(6)}
      ${(props) => props.theme.spacing(3)};
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  & > img,
  & > svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  max-width: 600px;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.light};
  }

  svg {
    margin-left: ${(props) => props.theme.spacing(1)};
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: ${(props) => props.theme.colors.primary.main};
  }

  svg {
    margin-left: ${(props) => props.theme.spacing(1)};
  }
`;

const Section = styled.section`
  padding: ${(props) => props.theme.spacing(8)}
    ${(props) => props.theme.spacing(3)};
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing(6)};
  color: ${(props) => props.theme.colors.text.primary};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: ${(props) => props.theme.colors.primary.main};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(4)};
`;

const FeatureCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(4)};
  box-shadow: ${(props) => props.theme.shadows.medium};
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary.main}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};

  svg {
    font-size: 2rem;
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const FeatureDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const FeatureLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.theme.colors.primary.main};
  text-decoration: none;
  font-weight: 600;

  svg {
    margin-left: ${(props) => props.theme.spacing(0.5)};
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const StatsSection = styled.section`
  background-color: ${(props) => props.theme.colors.primary.main};
  color: white;
  padding: ${(props) => props.theme.spacing(8)}
    ${(props) => props.theme.spacing(3)};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing(4)};
  max-width: 1200px;
  margin: 0 auto;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
`;

const TestimonialsSection = styled(Section)`
  background-color: ${(props) => props.theme.colors.background.default};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${(props) => props.theme.spacing(4)};
`;

const TestimonialCard = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(4)};
  box-shadow: ${(props) => props.theme.shadows.medium};
  position: relative;

  &:before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 4rem;
    color: ${(props) => props.theme.colors.primary.main}20;
    font-family: Georgia, serif;
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f3f4f6;
  margin-right: ${(props) => props.theme.spacing(2)};

  & > img,
  & > svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

const AuthorRole = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ContactSection = styled(Section)`
  background-color: ${(props) => props.theme.colors.background.paper};
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing(4)};
`;

const ContactCard = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing(3)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) => props.theme.colors.background.default};
  box-shadow: ${(props) => props.theme.shadows.small};
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary.main}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${(props) => props.theme.spacing(2)};

  svg {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const ContactTitle = styled.h3`
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const ContactInfo = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
`;

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <HomeContainer>
      <HeroSection>
        <HeroBackground>
          <img src="/images/hospital-hero.jpg.png" alt="Hospital" />
        </HeroBackground>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Advanced Healthcare at Your Fingertips
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the future of healthcare with our comprehensive hospital
            management system. Book appointments, consult with specialists, and
            manage your medical records all in one place.
          </HeroSubtitle>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {isAuthenticated ? (
              <PrimaryButton to="/dashboard">
                Go to Dashboard <FaArrowRight />
              </PrimaryButton>
            ) : (
              <>
                <PrimaryButton to="/login">
                  Sign In <FaArrowRight />
                </PrimaryButton>
                <SecondaryButton to="/signup">
                  Create Account <FaArrowRight />
                </SecondaryButton>
              </>
            )}
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Our Services</SectionTitle>
        <FeaturesGrid>
          <FeatureCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FeatureIcon>
              <FaStethoscope />
            </FeatureIcon>
            <FeatureTitle>Online Consultations</FeatureTitle>
            <FeatureDescription>
              Connect with healthcare professionals from the comfort of your
              home and get expert medical advice.
            </FeatureDescription>
            <FeatureLink to="/consultations">
              Learn More <FaArrowRight />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FeatureIcon>
              <FaCalendarAlt />
            </FeatureIcon>
            <FeatureTitle>Appointment Scheduling</FeatureTitle>
            <FeatureDescription>
              Book appointments with doctors, specialists, or for medical
              procedures with our easy-to-use scheduling system.
            </FeatureDescription>
            <FeatureLink to="/appointments">
              Book Now <FaArrowRight />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <FeatureIcon>
              <FaHeartbeat />
            </FeatureIcon>
            <FeatureTitle>Health Monitoring</FeatureTitle>
            <FeatureDescription>
              Track your vital signs, medication schedule, and health metrics
              for better management of chronic conditions.
            </FeatureDescription>
            <FeatureLink to="/health-monitoring">
              Start Tracking <FaArrowRight />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <FeatureIcon>
              <FaNotesMedical />
            </FeatureIcon>
            <FeatureTitle>Digital Medical Records</FeatureTitle>
            <FeatureDescription>
              Access your complete medical history, test results, and
              prescriptions in one secure digital platform.
            </FeatureDescription>
            <FeatureLink to="/medical-records">
              View Records <FaArrowRight />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <FeatureIcon>
              <FaVideo />
            </FeatureIcon>
            <FeatureTitle>Telemedicine</FeatureTitle>
            <FeatureDescription>
              Connect with specialists through video consultations for remote
              diagnosis and follow-up appointments.
            </FeatureDescription>
            <FeatureLink to="/telemedicine">
              Connect Now <FaArrowRight />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <FeatureIcon>
              <FaPrescriptionBottleAlt />
            </FeatureIcon>
            <FeatureTitle>Medication Management</FeatureTitle>
            <FeatureDescription>
              Receive reminders for medication, refill prescriptions online, and
              track your medication history.
            </FeatureDescription>
            <FeatureLink to="/medications">
              Manage Medications <FaArrowRight />
            </FeatureLink>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <StatsSection>
        <StatsGrid>
          <StatItem>
            <StatNumber>50+</StatNumber>
            <StatLabel>Specialist Doctors</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>10+</StatNumber>
            <StatLabel>Departments</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>5000+</StatNumber>
            <StatLabel>Happy Patients</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>15+</StatNumber>
            <StatLabel>Years of Service</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <TestimonialsSection>
        <SectionTitle>What Our Patients Say</SectionTitle>
        <TestimonialsGrid>
          <TestimonialCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TestimonialText>
              The online appointment booking system saved me so much time. I was
              able to find a specialist, book an appointment, and have a video
              consultation all within the same day!
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>
                <img src="/images/patient1.jpg" alt="Sarah Johnson" />
              </AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Sarah Johnson</AuthorName>
                <AuthorRole>Patient</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <TestimonialText>
              Having all my medical records in one place has been a
              game-changer. I can easily share my history with new doctors and
              track my health progress over time.
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>
                <img src="/images/patient2.jpg" alt="Michael Rodriguez" />
              </AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Michael Rodriguez</AuthorName>
                <AuthorRole>Patient</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <TestimonialText>
              The telemedicine feature has been invaluable for managing my
              chronic condition. I can have regular check-ins with my doctor
              without having to travel to the hospital.
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>
                <img src="/images/patient3.jpg" alt="Emily Chen" />
              </AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Emily Chen</AuthorName>
                <AuthorRole>Patient</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialsGrid>
      </TestimonialsSection>

      <ContactSection>
        <SectionTitle>Contact Us</SectionTitle>
        <ContactGrid>
          <ContactCard>
            <ContactIcon>
              <FaPhone />
            </ContactIcon>
            <ContactTitle>Phone</ContactTitle>
            <ContactInfo>+1 (555) 123-4567</ContactInfo>
            <ContactInfo>+1 (555) 987-6543</ContactInfo>
          </ContactCard>

          <ContactCard>
            <ContactIcon>
              <FaEnvelope />
            </ContactIcon>
            <ContactTitle>Email</ContactTitle>
            <ContactInfo>info@medicare.com</ContactInfo>
            <ContactInfo>support@medicare.com</ContactInfo>
          </ContactCard>

          <ContactCard>
            <ContactIcon>
              <FaMapMarkerAlt />
            </ContactIcon>
            <ContactTitle>Location</ContactTitle>
            <ContactInfo>123 Healthcare Avenue</ContactInfo>
            <ContactInfo>Medical District, NY 10001</ContactInfo>
          </ContactCard>
        </ContactGrid>
      </ContactSection>
    </HomeContainer>
  );
};

export default Home;
