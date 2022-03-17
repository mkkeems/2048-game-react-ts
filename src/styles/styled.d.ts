import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    body: {
      backgroundColor: string;
      color: string;
      fontFamily: string;
      fontWeight: string;
      height: string;
    };
    button: {
      dark: string;
      light: string;
    };
    font: {
      dark: string;
      light: string;
    };
    tile: {
      board: string;
      empty: string;
      two: string;
      four: string;
      eight: string;
      sixteen: string;
      thirtytwo: string;
      sixtyfour: string;
      oneTwoEight: string;
      twoFiveSix: string;
      fiveOneTwo: string;
      oneOhTwoFour: string;
      twoOhFourEight: string;
    };
  }
}
