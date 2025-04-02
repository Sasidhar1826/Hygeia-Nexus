import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// Create a motion component that properly forwards refs
const MotionComponent = forwardRef((props, ref) => {
  return <motion.div ref={ref} {...props} />;
});

const CardWrapper = styled(MotionComponent)`
  background-color: ${(props) => props.theme.colors.background.card};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: ${(props) => props.theme.shadows.medium};
  transition: all ${(props) => props.theme.transitions.default};
  position: relative;
  overflow: hidden;
  height: ${(props) => (props.fullHeight ? "100%" : "auto")};

  ${(props) =>
    props.interactive &&
    css`
      cursor: pointer;
      &:hover {
        box-shadow: ${props.theme.shadows.large};
        transform: translateY(-2px);
      }
      &:active {
        transform: translateY(0);
      }
    `}

  ${(props) => {
    switch (props.variant) {
      case "outlined":
        return css`
          background-color: transparent;
          border: 1px solid ${props.theme.colors.border};
          box-shadow: none;
        `;
      case "elevation":
        return css`
          box-shadow: ${props.theme.shadows.medium};
        `;
      case "primary":
        return css`
          background-color: ${props.theme.colors.primary.light};
          border-left: 4px solid ${props.theme.colors.primary.main};
        `;
      case "success":
        return css`
          background-color: ${props.theme.colors.success.light};
          border-left: 4px solid ${props.theme.colors.success.main};
        `;
      case "warning":
        return css`
          background-color: ${props.theme.colors.warning.light};
          border-left: 4px solid ${props.theme.colors.warning.main};
        `;
      case "error":
        return css`
          background-color: ${props.theme.colors.error.light};
          border-left: 4px solid ${props.theme.colors.error.main};
        `;
      default:
        return "";
    }
  }}
  
  ${(props) => {
    switch (props.size) {
      case "small":
        return css`
          padding: ${props.theme.spacing(2)};
        `;
      case "large":
        return css`
          padding: ${props.theme.spacing(4)};
        `;
      default:
        return css`
          padding: ${props.theme.spacing(3)};
        `;
    }
  }}
  
  ${(props) =>
    props.noPadding &&
    css`
      padding: 0;
    `}
    
  ${(props) =>
    props.bordered &&
    css`
      border: 1px solid ${props.theme.colors.border};
    `}
`;

const Card = forwardRef(
  (
    {
      children,
      variant = "default",
      size = "medium",
      interactive = false,
      fullHeight = false,
      noPadding = false,
      bordered = false,
      className,
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <CardWrapper
        ref={ref}
        variant={variant}
        size={size}
        interactive={interactive}
        fullHeight={fullHeight}
        noPadding={noPadding}
        bordered={bordered}
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </CardWrapper>
    );
  }
);

Card.displayName = "Card";

Card.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "default",
    "outlined",
    "elevation",
    "primary",
    "success",
    "warning",
    "error",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  interactive: PropTypes.bool,
  fullHeight: PropTypes.bool,
  noPadding: PropTypes.bool,
  bordered: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
