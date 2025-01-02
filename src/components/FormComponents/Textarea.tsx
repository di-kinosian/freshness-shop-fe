import { TextField, TextFieldProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  rows?: number;
  value: string;
  placeholder?: string;
  onChange: () => void;
}

type CombinedProps = Props & TextFieldProps;

const Textarea: React.FC<CombinedProps> = ({
  rows = 3,
  value,
  placeholder,
  onChange,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <TextField
      classes={{ root: classes.root }}
      multiline={!!rows}
      minRows={rows}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Textarea;

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      "&.MuiTextField-root": {
        width: "100%",
        backgroundColor: theme.input?.background.default,
        borderRadius: theme.input?.border.radius,
        border: theme.input.border.default,
        padding: theme.input.padding,
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "none",
        },
      },
    },
  };
});
