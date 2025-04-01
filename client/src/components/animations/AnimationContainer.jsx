import React from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height || "200px"};
  width: ${({ width }) => width || "100%"};
  margin: ${({ margin }) => margin || "0"};
`;

/**
 * AnimationContainer component for displaying animations
 * @param {string} type - Type of animation: "loading", "emptyState", "success", "error", "modal"
 * @param {string} height - Height of the container
 * @param {string} width - Width of the container
 * @param {string} margin - Margin of the container
 * @param {function} onComplete - Callback function when animation completes
 * @param {Object} playerProps - Additional props for the Lottie Player
 */
const AnimationContainer = ({
  type = "loading",
  height,
  width,
  margin,
  onComplete,
  playerProps = {},
}) => {
  const getAnimationSrc = () => {
    switch (type) {
      case "loading":
        return "/loading-animation.json";
      case "emptyState":
        return "/empty-state.json";
      case "success":
        return "/success-animation.json";
      case "error":
        return "/error-animation.json";
      case "modal":
        return "/modal-animation.json";
      default:
        return "/loading-animation.json";
    }
  };

  const getLoop = () => {
    // Loading animations should loop, others typically play once
    return ["loading"].includes(type);
  };

  return (
    <Container height={height} width={width} margin={margin}>
      <Player
        src={getAnimationSrc()}
        loop={getLoop()}
        autoplay
        style={{ height: "100%", width: "100%" }}
        onComplete={onComplete}
        {...playerProps}
      />
    </Container>
  );
};

export default AnimationContainer;
