export const lightTheme = {
  colors: {
    primary: {
      main: "#2563EB",
      light: "#3B82F6",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F3F4F6",
      paper: "#FFFFFF",
      card: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
      disabled: "#9CA3AF",
    },
    status: {
      success: "#10B981",
      successLight: "#D1FAE5",
      warning: "#F59E0B",
      warningLight: "#FEF3C7",
      error: "#EF4444",
      errorLight: "#FEE2E2",
      info: "#3B82F6",
      infoLight: "#DBEAFE",
    },
    border: "#E5E7EB",
  },
  spacing: (multiplier = 1) => `${multiplier * 0.5}rem`,
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
    round: "50%",
  },
  shadows: {
    small: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    medium:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    large:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  transitions: {
    default: "0.3s ease",
    fast: "0.15s ease",
    slow: "0.5s ease",
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

export const darkTheme = {
  colors: {
    primary: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#111827",
      paper: "#1F2937",
      card: "#1F2937",
    },
    text: {
      primary: "#F9FAFB",
      secondary: "#D1D5DB",
      disabled: "#6B7280",
    },
    status: {
      success: "#10B981",
      successLight: "#064E3B",
      warning: "#F59E0B",
      warningLight: "#78350F",
      error: "#EF4444",
      errorLight: "#7F1D1D",
      info: "#3B82F6",
      infoLight: "#1E3A8A",
    },
    border: "#374151",
  },
  spacing: (multiplier = 1) => `${multiplier * 0.5}rem`,
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
    round: "50%",
  },
  shadows: {
    small: "0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.36)",
    medium:
      "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)",
    large:
      "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
  },
  transitions: {
    default: "0.3s ease",
    fast: "0.15s ease",
    slow: "0.5s ease",
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};
