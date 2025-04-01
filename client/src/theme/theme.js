export const theme = {
  colors: {
    // Primary colors
    primary: {
      main: "#4A90E2",
      light: "#5DADE2",
    },
    // Background colors
    background: {
      default: "#F5F8FA",
      paper: "#FFFFFF",
      card: "#E3F2FD",
      success: "#D1F2EB",
    },
    // Accent colors
    accent: {
      main: "#FFA726",
    },
    // Text colors
    text: {
      primary: "#333333",
      secondary: "#666666",
      disabled: "#999999",
    },
    // Status colors
    status: {
      success: "#4CAF50",
      warning: "#FF9800",
      error: "#F44336",
      info: "#2196F3",
    },
    // Dark mode colors
    dark: {
      background: "#121212",
      paper: "#1E1E1E",
      card: "#2D3748",
      text: "#E2E8F0",
    },
    // Border
    border: "#E0E0E0",
  },
  typography: {
    fontFamily: "'Nunito', 'Inter', sans-serif",
    h1: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  spacing: (multiplier = 1) => `${8 * multiplier}px`,
  borderRadius: {
    small: "8px",
    medium: "12px",
    large: "16px",
    circle: "50%",
  },
  shadows: {
    small: "0 2px 8px rgba(0,0,0,0.05)",
    medium: "0 4px 12px rgba(0,0,0,0.05)",
    large: "0 8px 16px rgba(0,0,0,0.08)",
  },
  transitions: {
    default: "300ms ease-in-out",
  },
  zIndex: {
    modal: 1000,
    dropdown: 100,
    header: 90,
    footer: 10,
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: {
      default: theme.colors.dark.background,
      paper: theme.colors.dark.paper,
      card: theme.colors.dark.card,
      success: "#1E3D39",
    },
    text: {
      primary: theme.colors.dark.text,
      secondary: "#A0AEC0",
      disabled: "#718096",
    },
  },
};
