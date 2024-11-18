import React, { forwardRef } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import Input from "./Input";
import Label from "./Label";

interface IProps {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  name?: string;
  width?: string;
}

const FormField = forwardRef<HTMLInputElement, IProps>(
  ({ label, value, onChange, placeholder, error, name, width }, ref) => {
    return (
      <FormControl
        variant="standard"
        error={!!error}
        className={`items-start ${width}`}
      >
        <Label htmlFor={name}>{label}</Label>
        <Input
          name={name}
          id={name}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  },
);

export default FormField;
