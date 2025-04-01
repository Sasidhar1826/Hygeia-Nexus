import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import styled from "styled-components";

// Import all animation JSON files
import loadingAnimation from "../../assets/loading-animation.json";
import modalAnimation from "../../assets/modal-animation.json";
import emptyStateAnimation from "../../assets/empty-state.json";

const AnimationWrapper = styled.div`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "200px"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.margin || "0"};
`;

const animations = {
  loading: loadingAnimation,
  modal: modalAnimation,
  emptyState: emptyStateAnimation,
};

/**
 * A component for displaying various animations in the application
 *
 * @param {Object} props
 * @param {string} props.type - The type of animation to display ('loading', 'modal', 'emptyState')
 * @param {string} props.width - The width of the animation container
 * @param {string} props.height - The height of the animation container
 * @param {string} props.margin - The margin around the animation container
 * @param {Object} props.style - Additional styles to apply to the animation
 * @param {boolean} props.loop - Whether the animation should loop (default: true)
 * @param {boolean} props.autoplay - Whether the animation should play automatically (default: true)
 * @returns {React.ReactElement}
 */
const AnimationContainer = ({
  type = "loading",
  width,
  height,
  margin,
  style = {},
  loop = true,
  autoplay = true,
}) => {
  if (!animations[type]) {
    console.warn(`Animation type '${type}' not found`);
    return null;
  }

  return (
    <AnimationWrapper width={width} height={height} margin={margin}>
      <Player
        src={animations[type]}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%", ...style }}
      />
    </AnimationWrapper>
  );
};

export default AnimationContainer;
