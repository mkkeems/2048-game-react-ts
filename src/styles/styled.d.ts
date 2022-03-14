import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: "#FAF8EF";
    color: "#776E65";
    fontFamily: "Clear Sans, Helvetica Neue, Arial, sans-serif";
    fontWeight: bold;

    colors: {
      board: "#bbada0";
      empty: "#BBADA0";
      two: "#EEE4DA";
      four: "#EEE1C9";
      eight: "#F3B27A";
      sixteen: "#F69664";
    };
  }
}
