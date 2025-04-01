import styled from "styled-components";
import { motion } from "framer-motion";

const getButtonSize = (size, theme) => {
  switch (size) {
    case "small":
      return `
        padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
        font-size: 0.8rem;
      `;
    case "large":
      return `
        padding: ${theme.spacing(2)} ${theme.spacing(4)};
        font-size: 1rem;
      `;
    default: // medium
      return `
        padding: ${theme.spacing(1.5)} ${theme.spacing(3)};
        font-size: 0.9rem;
      `;
  }
};

const getButtonVariant = (variant, theme) => {
  switch (variant) {
    case "secondary":
      return `
        background-color: transparent;
        color: ${theme.colors.text.primary};
        border: 1px solid ${theme.colors.border};
        
        &:hover {
          background-color: ${theme.colors.background.default};
        }
      `;
    case "danger":
      return `
        background-color: ${theme.colors.status.error};
        color: white;
        border: none;
        
        &:hover {
          background-color: #d32f2f;
        }
      `;
    case "warning":
      return `
        background-color: ${theme.colors.status.warning};
        color: white;
        border: none;
        
        &:hover {
          background-color: #f57c00;
        }
      `;
    case "success":
      return `
        background-color: ${theme.colors.status.success};
        color: white;
        border: none;
        
        &:hover {
          background-color: #388e3c;
        }
      `;
    default: // primary
      return `
        background-color: ${theme.colors.primary.main};
        color: white;
        border: none;
        
        &:hover {
          background-color: ${theme.colors.primary.light};
        }
      `;
  }
};

const Button = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};
  gap: ${(props) => props.theme.spacing(1)};

  ${(props) => getButtonSize(props.size, props.theme)}
  ${(props) => getButtonVariant(props.variant, props.theme)}

  &:hover {
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
