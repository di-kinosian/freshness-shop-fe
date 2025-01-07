import { Autocomplete } from "@components/FormComponents/Autocomplete";
import Label from "@components/FormComponents/Label";
import { FormControl, FormHelperText } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { BillingFormData } from "../../types";
import { Options } from "../../../../main/types/interfaces";

interface Props {
  control: Control<BillingFormData>;
  label: string;
  options: Options[];
  error?: string;
  placeholder: string;
  disabled?: boolean;
  name: keyof BillingFormData;
}

export const AutocompleteFormField = ({
  control,
  label,
  options,
  error,
  placeholder,
  disabled,
  name,
}: Props) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => {
      return (
        <FormControl variant="standard" className="items-start" error={!!error}>
          <Label>{label}</Label>
          <Autocomplete
            options={options}
            value={field.value as string}
            onChange={field.onChange}
            ref={field.ref}
            placeholder={placeholder}
            disabled={disabled}
          />
          {error && (
            <FormHelperText className="text-red-600">{error}</FormHelperText>
          )}
        </FormControl>
      );
    }}
  />
);
