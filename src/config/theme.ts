import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiDialog: {
      defaultProps: {
        container: document.getElementById("root"),
      },
    },
    MuiModal: {
      defaultProps: {
        container: document.getElementById("root"),
      },
    },
  },
  input: {
    background: {
      default: "rgba(249, 249, 249, 1)",
    },
    border: {
      default: "1px solid rgba(209, 209, 209, 1)",
      radius: "12px",
    },
    height: "42px",
    padding: "5px 20px",
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
