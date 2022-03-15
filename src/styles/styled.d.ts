import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    body: {
      backgroundColor: string;
      color: string;
      fontFamily: string;
      fontWeight: string;
      height: string;

      colors: {
        board: string;
        empty: string;
        two: string;
        four: string;
        eight: string;
        sixteen: string;
      };
    };
  }
}
