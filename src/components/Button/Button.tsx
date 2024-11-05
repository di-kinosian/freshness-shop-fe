import { Button as MuiButton, ButtonProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
interface Props extends ButtonProps {
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  variant = "contained",
  ...props
}) => {
  const classes = useStyles(props.color);

  return (
    <MuiButton classes={classes} variant={variant} {...props}>
      {children}
    </MuiButton>
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
      "&.MuiButton-containedSizeSmall": {
        height: theme.button.sizes.small.height,
        padding: theme.button.sizes.small.padding,
      },
      "&.MuiButton-containedSizeMedium": {
        height: theme.button.sizes.medium.height,
        padding: theme.button.sizes.medium.padding,
      },
      "&.MuiButton-containedSizeLarge": {
        height: theme.button.sizes.large.height,
        padding: theme.button.sizes.large.padding,
      },
    },
  };
});
