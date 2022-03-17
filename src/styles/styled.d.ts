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
    tile: {
      smallNum: string;
      bigNum: string;
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
