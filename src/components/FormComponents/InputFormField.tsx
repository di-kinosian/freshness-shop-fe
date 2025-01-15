import { Control, Controller } from "react-hook-form";
import { BillingFormFields } from "../../main/types/enums";
import { BillingFormData } from "@components/Cart/types";
import FormField from "./FormField";

interface Props {
  name: BillingFormFields;
  label: string;
  placeholder?: string;
  control: Control<BillingFormData>;
}

export const InputFormField = ({
  name,
  label,
  control,
  placeholder,
}: Props) => {
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
};
