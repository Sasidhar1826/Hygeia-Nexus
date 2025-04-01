import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${(props) => props.theme.typography.fontFamily};
    background-color: ${(props) => props.theme.colors.background.default};
    color: ${(props) => props.theme.colors.text.primary};
    transition: background-color ${(props) => props.theme.transitions.default};
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${(props) => props.theme.spacing(2)};
  }

  p {
    margin-bottom: ${(props) => props.theme.spacing(2)};
  }

  button, a {
    transition: all ${(props) => props.theme.transitions.default};
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background.default};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary.light};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.primary.main};
  }
`;

export default GlobalStyles;
