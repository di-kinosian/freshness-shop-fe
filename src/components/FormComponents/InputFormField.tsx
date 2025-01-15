import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import FormField from "./FormField";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  control: Control<T>;
  rows?: number;
}

export function InputFormField<T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  rows,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          rows={rows}
          label={label}
          placeholder={placeholder || label}
          {...field}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
