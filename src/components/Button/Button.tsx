import {
  Button as MuiButton,
  ButtonProps,
  Theme,
  ButtonBase,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props extends ButtonProps {
  className?: string;
}

export const Button: React.FC<Props> = ({ children, variant, ...props }) => {
  const classes = useStyles();

  return (
    <>
      {variant === "text" ? (
        <ButtonBase {...props}>{children}</ButtonBase>
      ) : (
        <MuiButton classes={classes} variant={variant} {...props}>
          {children}
        </MuiButton>
      )}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      "&.MuiButtonBase-root": {
        boxShadow: "none",
        borderRadius: theme.button.borderRadius,
        fontWeight: 700,
        fontSize: "15px",
        fontFamily: "Poppins",
        textTransform: "none",
      },
      "&.MuiButton-colorSecondary": {
        backgroundColor: theme.button.background.secondary,
        color: theme.button.color.secondary,
        border: theme.button.border?.secondary,
      },
      "&.MuiButton-colorPrimary": {
        backgroundColor: theme.button.background.primary,
        color: theme.button.color.primary,
        border: theme.button.border?.primary,
      },
      "&.MuiButton-sizeSmall": {
        height: theme.button.sizes.small.height,
        padding: theme.button.sizes.small.padding,
      },
      "&.MuiButton-sizeMedium": {
        height: theme.button.sizes.medium.height,
        padding: theme.button.sizes.medium.padding,
      },
      "&.MuiButton-sizeLarge": {
        height: theme.button.sizes.large.height,
        padding: theme.button.sizes.large.padding,
      },
    },
  };
});
