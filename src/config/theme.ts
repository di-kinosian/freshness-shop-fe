import { createTheme } from "@mui/material/styles";

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

export const theme = createTheme({
  input: {
    background: {
      default: "rgba(249, 249, 249, 1)",
    },
    border: {
      default: "1px solid rgba(209, 209, 209, 1)",
      radius: "12px",
    },
    height: "42px",
    padding: "0 20px",
  },

  button: {
    background: {
      primary: "rgba(106, 152, 60, 1)",
      secondary: "rgba(245, 245, 245, 1)",
    },
    color: {
      primary: "white",
      secondary: "black",
    },
    borderRadius: "12px",
    border: {
      primary: "2px solid rgba(70, 118, 10, 1)",
      secondary: "none",
    },
    sizes: {
      small: { height: "36px", padding: "0 10px" },
      medium: { height: "47px", padding: "0 14px" },
      large: { height: "56px", padding: "0 46px" },
    },
  },
});