import React, { forwardRef } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import Input from "./Input";
import Label from "./Label";
import { twMerge } from "tailwind-merge";

interface IProps {
  label?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string;
  name?: string;
  className?: string;
  rows?: number;
  type?: string;
}

const FormField = forwardRef<HTMLInputElement, IProps>(
  (
    {
      label,
      value,
      onChange,
      placeholder,
      error,
      name,
      className,
      type,
      onBlur,
      rows,
    },
    ref,
  ) => {
    return (
      <FormControl
        variant="standard"
        error={!!error}
        className={twMerge("items-start", className)}
      >
        <Label htmlFor={name}>{label}</Label>
        <Input
          rows={rows}
          name={name}
          id={name}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          onBlur={onBlur}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  },
);

export default FormField;
