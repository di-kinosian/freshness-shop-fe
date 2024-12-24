import { Control, Controller } from "react-hook-form";
import { BillingFormData } from "../../types";
import { TextareaFormField } from "@components/FormComponents/TextareaFormField";

type Props = {
  control: Control<BillingFormData>;
};

export const NotesFormField = ({ control }: Props) => (
  <Controller
    control={control}
    name="notes"
    render={({ field, fieldState }) => {
      return (
        <TextareaFormField
          value={field.value || ""}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      );
    }}
  />
);
