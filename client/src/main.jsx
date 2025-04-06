import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Log which API mode we're using
console.log(
  `🚀 App starting with API mode: ${
    import.meta.env.VITE_USE_MOCK_API === "true" ? "MOCK" : "REAL"
  }`
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
