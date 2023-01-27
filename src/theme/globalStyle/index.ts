import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  div#root{
    max-width: 100vw;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    width: 100vw;
    height: 100vh;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    min-height: 100vh;
    
  }
`;
