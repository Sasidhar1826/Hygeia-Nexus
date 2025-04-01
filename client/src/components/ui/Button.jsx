import styled from "styled-components";
import { motion } from "framer-motion";

const Button = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(1.5)}
    ${(props) => props.theme.spacing(3)};
  background-color: ${(props) =>
    props.variant === "secondary"
      ? "transparent"
      : props.variant === "danger"
      ? props.theme.colors.status.error
      : props.theme.colors.primary.main};
  color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.colors.text.primary
      : props.theme.colors.primary.contrastText};
  border: ${(props) =>
    props.variant === "secondary"
      ? `1px solid ${props.theme.colors.border}`
      : "none"};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};
  gap: ${(props) => props.theme.spacing(1)};

  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary"
        ? props.theme.colors.background.default
        : props.variant === "danger"
        ? "#d32f2f"
        : props.theme.colors.primary.light};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    font-size: 1rem;
  }
`;

export default Button;
