import { FormControl } from "@mui/material";
import Label from "./Label";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import Textarea from "./Textarea";

interface Props<T extends FieldValues> {
  rows?: number;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  control: Control<T>;
}

export function TextareaFormField<T extends FieldValues>({
  label,
  control,
  name,
  placeholder,
  rows,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl variant="standard" className="items-start w-full">
          {label && <Label>{label}</Label>}
          <Textarea
            rows={rows}
            value={field.value}
            placeholder={placeholder}
            onChange={field.onChange}
          />
          {fieldState.error && (
            <span className="text-red-500">{fieldState.error.message}</span>
          )}
        </FormControl>
      )}
    />
  );
}
