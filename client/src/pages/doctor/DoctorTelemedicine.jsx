import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaVideo, FaCalendarAlt, FaClock, FaTools } from "react-icons/fa";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
  padding: ${(props) => props.theme.spacing(3)};
`;

const ComingSoonContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
  background-color: ${(props) => props.theme.colors.background.default};
`;

const IconContainer = styled.div`
  font-size: 64px;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  color: ${(props) => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const Subtitle = styled.h2`
  font-size: 20px;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 600px;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing(3)};
  margin: ${(props) => props.theme.spacing(4)} 0;
  width: 100%;
  max-width: 800px;
`;

const FeatureCard = styled(Card)`
  padding: ${(props) => props.theme.spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  svg {
    font-size: 32px;
    margin-bottom: ${(props) => props.theme.spacing(2)};
    color: ${(props) => props.theme.colors.primary.main};
  }

  h3 {
    margin-bottom: ${(props) => props.theme.spacing(1)};
    font-size: 18px;
  }

  p {
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 14px;
  }
`;

const DoctorTelemedicine = () => {
  return (
    <PageContainer>
      <ComingSoonContainer
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <IconContainer>
          <FaVideo />
          <FaTools />
        </IconContainer>
        <Title>Telemedicine Dashboard Coming Soon</Title>
        <Subtitle>
          We're working hard to bring you a powerful telemedicine platform for
          managing your virtual appointments with patients.
        </Subtitle>

        <FeatureList>
          <FeatureCard>
            <FaVideo />
            <h3>Video Consultations</h3>
            <p>
              Conduct high-quality video appointments with your patients from
              anywhere
            </p>
          </FeatureCard>

          <FeatureCard>
            <FaCalendarAlt />
            <h3>Appointment Management</h3>
            <p>
              Easily schedule, reschedule and manage all your telemedicine
              appointments
            </p>
          </FeatureCard>

          <FeatureCard>
            <FaClock />
            <h3>Efficient Workflow</h3>
            <p>
              Streamlined interface designed for busy healthcare professionals
            </p>
          </FeatureCard>
        </FeatureList>

        <Button
          variant="primary"
          size="large"
          onClick={() => alert("This feature will be available soon!")}
        >
          Notify Me When Available
        </Button>
      </ComingSoonContainer>
    </PageContainer>
  );
};

export default DoctorTelemedicine;
