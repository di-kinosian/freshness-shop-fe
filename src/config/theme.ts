import { createTheme } from "@mui/material/styles";

export interface ButtonStyles {
  border: string;
  background: string;
}

export interface ButtonConfig {
  primary: ButtonStyles;
  secondary: ButtonStyles;
  radius: string;
}

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
    };
    button: {
      primary: ButtonStyles;
      secondary: ButtonStyles;
      radius: string;
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
    };
    button?: {
      primary?: ButtonStyles;
      secondary?: ButtonStyles;
      radius?: string;
    };
  }
}

export const theme = createTheme({
  // typography: {
  //   fontFamily: "Poppins, Open Sans, Arial, sans-serif",
  //   caption: {
  //     fontWeight: 400,
  //     fontFamily: "Open Sans",
  //     fontSize: "12px",
  //   },
  //   bodyDefault: {
  //     fontWeight: 400,
  //     fontFamily: "Open Sans",
  //     fontSize: "14px",
  //   },
  //   subtitle: { fontFamily: "Poppins, sans-serif" },
  // },
  input: {
    background: {
      default: "rgba(249, 249, 249, 1)",
    },
    border: {
      default: "rgba(209, 209, 209, 1)",
      radius: "12px",
    },
  },

  button: {
    primary: {
      border: "2px solid rgba(70, 118, 10, 1)",
      background: "rgba(106, 152, 60, 1)",
    },
    secondary: {
      border: "2px solid transparent",
      background: "rgba(245, 245, 245, 1)",
    },
    radius: "12px",
  },
});
