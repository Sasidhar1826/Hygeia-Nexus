import styled from "styled-components";
import React from "react";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const StyledInput = styled.input`
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid
    ${(props) => (props.error ? props.theme.colors.status.error : "#E2E8F0")};
  font-size: 16px;
  transition: all ${(props) => props.theme.transitions.default};
  background-color: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.error
        ? props.theme.colors.status.error
        : props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.error
          ? props.theme.colors.status.error + "30"
          : props.theme.colors.primary.main + "30"};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.disabled};
  }
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.status.error};
  font-size: 12px;
  margin-top: ${(props) => props.theme.spacing(0.5)};
`;

const Input = ({ label, error, ...props }) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput error={error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
