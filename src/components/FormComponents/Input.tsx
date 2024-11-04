import { InputBase, InputBaseProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      backgroundColor: theme.input?.background.default,
      borderRadius: theme.input?.border.radius,
      height: "42px",
      border: "1px solid rgba(209, 209, 209, 1)",
      padding: "0 20px",
      
    },
  };
});

export default function Input(props: InputBaseProps) {
  const classes = useStyles(props);

  return <InputBase classes={{root: classes.root}}  {...props} />;
}
