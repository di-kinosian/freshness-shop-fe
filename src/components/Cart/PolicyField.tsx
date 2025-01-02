import { Checkbox } from "@components/Checkbox/Checkbox";
import { FormControl, FormHelperText } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { BillingFormData } from "./types";

interface Props {
  control: Control<BillingFormData>;
  name: keyof BillingFormData;
  checkboxMessage: string;
  error?: string;
}

export const PolicyField = ({
  control,
  name,
  checkboxMessage,
  error,
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormControl variant="standard" className="items-start">
            <div className="flex items-start gap-1">
              <Checkbox
                onChange={field.onChange}
                checked={!!field.value}
                value={field.value}
              />
              <span>{checkboxMessage}</span>
            </div>
            {error && (
              <FormHelperText className="text-red-600">
                {error || ""}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};
