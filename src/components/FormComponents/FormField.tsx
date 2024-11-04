import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import Input from "./Input";
import Label from "./Label";
import { makeStyles } from "@mui/styles";

interface IFieldProps {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const FormField: React.FC<IFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const classes = useStyles();
  return (
    <FormControl variant="standard" error={true} classes={classes}>
      <Label htmlFor="input1" error={error ? true : false}>
        {label}
      </Label>
      <Input
        id="input1"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <FormHelperText>{error}</FormHelperText>}{" "}
    </FormControl>
  );
};

const useStyles = makeStyles(() => {
  return {
    root: {
      alignItems: "flex-start",
    },
  };
});

export default FormField;
