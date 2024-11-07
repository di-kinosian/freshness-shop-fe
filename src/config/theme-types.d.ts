import "@mui/material/styles";

export interface Font {
  fontWeight?: number;
  fontFamily?: "Open Sans" | "Poppins";
  fontSize?: string;
}

export interface Typography {
  caption?: Font;
  bodyDefault?: Font;
}

declare module "@mui/material/styles" {
  interface Theme {
    input: {
      background: {
        default: string;
      };
      border: {
        default: string;
        radius: string;
      };
      height: string;
      padding: string;
    };

    button: {
      background: {
        primary: string;
        secondary: string;
      };
      color: {
        primary: string;
        secondary: string;
      };
      borderRadius: string;
      border: {
        primary: string;
        secondary: string;
      };
      sizes: {
        small: { height: string; padding: string };
        medium: { height: string; padding: string };
        large: { height: string; padding: string };
      };
    };
  }

  interface ThemeOptions {
    input?: {
      background?: {
        default?: string;
      };
      border?: {
        default?: string;
        radius?: string;
      };
      height?: string;
      padding?: string;
    };

    button?: {
      background?: {
        primary?: string;
        secondary?: string;
      };
      color?: {
        primary?: string;
        secondary?: string;
      };
      borderRadius?: string;
      border?: {
        primary: string;
        secondary: string;
      };
      sizes?: {
        small?: { height: string; padding: string };
        medium?: { height: string; padding: string };
        large?: { height: string; padding: string };
      };
    };
  }
}
