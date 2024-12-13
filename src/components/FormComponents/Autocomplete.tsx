import { TextField, Theme } from "@mui/material";
import AutocompleteMUI from "@mui/material/Autocomplete";
import { Options } from "../../main/types/interfaces";
import { makeStyles } from "@mui/styles";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { getCities } from "../../redux/features/countries/countriesSlice";

interface Props {
  options: Options[];
  value?: string;
  onChange?: (value: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  placeholder: string;
}

export const Autocomplete = ({
  options,
  value,
  onChange,
  inputRef,
  placeholder,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (value: string): void => {
    onChange?.(value || "");
    dispatch(getCities({ country: value }));
  };

  return (
    <>
      <input type="hidden" value={value || ""} ref={inputRef} />
      <AutocompleteMUI
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
    </>
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
