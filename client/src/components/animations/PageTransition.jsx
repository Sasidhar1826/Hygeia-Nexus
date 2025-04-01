import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Animation variants for the main page container
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// Animation variants for child elements
export const childVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  out: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

/**
 * PageTransition component for adding smooth transitions between pages
 * Wrap your page content with this component to add enter/exit animations
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The page content
 * @param {Object} props.variants - Custom animation variants (optional)
 * @param {Object} props.transition - Custom transition settings (optional)
 */
const PageTransition = ({
  children,
  variants = pageVariants,
  transition,
  ...rest
}) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  variants: PropTypes.object,
  transition: PropTypes.object,
};

export default PageTransition;
