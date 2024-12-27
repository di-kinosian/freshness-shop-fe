import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import FormField from "./FormField";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
}

export function InputFormField<T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          label={label}
          placeholder={placeholder || label}
          {...field}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
