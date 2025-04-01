import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyles from "./GlobalStyles";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      ...(isDarkMode && {
        background: theme.colors.dark.background,
        paper: theme.colors.dark.paper,
        card: theme.colors.dark.card,
        text: {
          primary: theme.colors.dark.text,
          secondary: theme.colors.dark.text,
          disabled: theme.colors.dark.text,
        },
      }),
    },
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
