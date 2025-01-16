import { InputBase, InputBaseProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { forwardRef } from "react";

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: "100%",
      backgroundColor: theme.input?.background.default,
      borderRadius: theme.input?.border.radius,
      border: theme.input.border.default,
      padding: theme.input.padding,
    },
  };
});

const Input = forwardRef<HTMLInputElement, InputBaseProps>((props, ref) => {
  const classes = useStyles(props);

  return (
    <InputBase
      ref={ref}
      classes={{ root: classes.root }}
      {...props}
      multiline={!!props.rows}
      rows={props.rows}
    />
  );
});

export default Input;
