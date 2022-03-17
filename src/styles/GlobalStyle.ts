import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
    color: #776e65;
  }
  
  .App{
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #faf8ef;

    h1{
      font-size: 80px;
      font-weight: bold;
    }
  }
`;
