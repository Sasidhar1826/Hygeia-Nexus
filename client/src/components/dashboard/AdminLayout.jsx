import React from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

// Loading fallback component
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    }}
  >
    <Player
      autoplay
      loop
      src="/loading-animation.json"
      style={{ width: "200px", height: "200px" }}
    />
  </div>
);

const AdminLayout = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  );
};

export default AdminLayout;
