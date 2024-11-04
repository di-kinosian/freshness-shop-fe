import { InputBase, InputBaseProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: "100%",
      backgroundColor: theme.input?.background.default,
      borderRadius: theme.input?.border.radius,
      height: theme.input.height,
      border: theme.input.border.default,
      padding: theme.input.padding,
    },
  };
});

export default function Input(props: InputBaseProps) {
  const classes = useStyles(props);

  return <InputBase classes={{ root: classes.root }} {...props} />;
}
