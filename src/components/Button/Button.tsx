import { Button as MuiButton, ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props extends ButtonProps {
  q?: string;
}

export const Button: React.FC<Props> = ({
  children,
  variant = "contained",
  ...props
}) => {
  const classes = useStyles(props.color);
  return (
    <MuiButton
      classes={classes}
      variant={variant}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

const useStyles = makeStyles(() => {
  return {
    root: {
      "&.MuiButtonBase-root": {
        boxShadow: "none",
        width: "fit-content",
        borderRadius: "12px",
        padding: "0 46px",
      },
      "&.MuiButton-colorSecondary": {
        backgroundColor: "rgba(245, 245, 245, 1)",
        color: "black",
        border: "none",
      },
      "&.MuiButton-colorPrimary": {
        backgroundColor: "rgba(106, 152, 60, 1)",
        color: "white",
        border: "2px solid rgba(70, 118, 10, 1)",
      },
      "&.MuiButton-containedSizeSmall": {
        height: "36px",
      },
      "&.MuiButton-containedSizeMedium": {
        height: "47px",
      },
      "&.MuiButton-containedSizeLarge": {
        height: "56px",
      },
    },
  };
});
