import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * A wrapper component that provides consistent page transition animations
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered within the transition
 * @param {Object} props.variants - Custom animation variants (optional)
 * @returns {React.ReactElement}
 */
const PageTransition = ({
  children,
  variants = defaultPageVariants,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Default animation variants for page transitions
export const defaultPageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

// Child element variants for staggered animations
export const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  variants: PropTypes.object,
};

export default PageTransition;
