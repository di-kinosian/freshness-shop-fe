import { FormControl } from "@mui/material";
import Label from "./Label";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
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
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl variant="standard" className="items-start w-full">
          {label && <Label>{label}</Label>}
          <textarea
            value={field.value}
            className="border border-basicGray rounded-2xl bg-neutralGrayBg min-h-[110px] w-full px-[20px] py-2 outline-none"
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
