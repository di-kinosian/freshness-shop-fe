import { TextField, Theme } from "@mui/material";
import AutocompleteMUI from "@mui/material/Autocomplete";
import { Options } from "../../main/types/interfaces";
import { makeStyles } from "@mui/styles";

interface Props {
  options: Options[];
  value?: string;
  onChange?: (value: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  placeholder: string;
  disabled?: boolean;
}

export const Autocomplete = ({
  options,
  value,
  onChange,
  inputRef,
  placeholder,
  disabled,
}: Props) => {
  const classes = useStyles();

  const handleChange = (value: string): void => {
    onChange?.(value || "");
  };

  const selectedOption =
    options.find((option) => option.value === value) || null;

  return (
    <AutocompleteMUI
      ref={inputRef}
      disabled={disabled}
      value={selectedOption}
      options={options}
      id="grid-choose-pesticide"
      clearOnEscape
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
      classes={{ root: classes.root }}
      onChange={(_, newValue) => {
        handleChange(newValue?.value as string);
      }}
    />
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        backgroundColor: theme.input?.background.default,
        borderRadius: theme.input?.border.radius,
        height: theme.input.height,
        border: theme.input.border.default,
        padding: theme.input.padding,
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  };
});
