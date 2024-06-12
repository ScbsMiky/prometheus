import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      bluePrimary: string;
      blueSecondary: string;
      blueTertiary: string;
      blueQuartiary: string;
    
      bg: string;
      whitePrimary: string;
      whiteSecondary: string;
      whiteTertiary: string;
      whiteQuartiary: string;
    }
  };
};