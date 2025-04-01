import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: ${(props) => props.theme.spacing(3)};
`;

const Icon = styled(motion.div)`
  font-size: 5rem;
  color: ${(props) => props.theme.colors.primary.main};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text.primary};
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 600px;
`;

const BackButton = styled(Link)`
  display: flex;
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
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Icon
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <FaExclamationTriangle />
      </Icon>
      <Title>404 - Page Not Found</Title>
      <Message>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Message>
      <BackButton to="/">
        <FaArrowLeft />
        Back to Home
      </BackButton>
    </NotFoundContainer>
  );
};

export default NotFound;
