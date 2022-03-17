import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  body: {
    backgroundColor: "#FAF8EF",
    color: "#776E65",
    fontFamily: "Clear Sans, Helvetica Neue, Arial, sans-serif",
    fontWeight: "bold",
    height: "100vh",
  },
  button: {
    dark: "#8f7a66",
    light: "#bbada0",
  },
  font: {
    dark: "#776E65",
    light: "#f9f6f2",
  },
  tile: {
    board: "#bbada0",
    empty: "rgba(238, 228, 218, 0.35)",
    two: "#EEE4DA",
    four: "#EEE1C9",
    eight: "#F3B27A",
    sixteen: "#F69664",
    thirtytwo: "#f77c5f",
    sixtyfour: "#f75f3b",
    oneTwoEight: "#edd073",
    twoFiveSix: "#edcc62",
    fiveOneTwo: "#edc950",
    oneOhTwoFour: "#edc53f",
    twoOhFourEight: "#edc22e",
  },
};

export { theme };

// 256: {
//   color: #f9f6f2;
//   background: #edcc62;
//   box-shadow: 0 0 30px 10px rgb(243 215 116 / 32%), inset 0 0 0 1px rgb(255 255 255 / 19%);
//   font-size: 45px;
// }

// 512: {
//   color: #f9f6f2;
//   background: #edc950;
//   box-shadow: 0 0 30px 10px rgb(243 215 116 / 40%), inset 0 0 0 1px rgb(255 255 255 / 24%);
//   font-size: 45px;
// }

// 1024: {
//   color: #f9f6f2;
//   background: #edc53f;
//   box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.285714);
//   font-size: 35px;
// }

// 2048: {
//   color: #f9f6f2;
//   background: #edc22e;
//   box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.555556), inset 0 0 0 1px rgba(255, 255, 255, 0.333333);
//   font-size: 35px;
// }
