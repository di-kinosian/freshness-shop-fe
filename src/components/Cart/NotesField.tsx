import Label from "@components/FormComponents/Label";
import { FormControl } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { BillingFormData } from "./types";

type Props = {
  control: Control<BillingFormData>;
  errors: FieldErrors<BillingFormData>;
};

export const NotesField = ({ control, errors }: Props) => (
  <div className="flex flex-col gap-6">
    <div>
      <h2 className="text-2xl font-semibold">Additional informations</h2>
      <span className="text-sm text-grayText">
        Need something else? We will make it for you!
      </span>
    </div>
    <Controller
      control={control}
      name="notes"
      render={({ field }) => {
        return (
          <FormControl variant="standard" className="items-start">
            <Label>Order notes</Label>
            <textarea
              value={field.value}
              className="border border-basicGray rounded-2xl bg-neutralGrayBg min-h-[110px] w-full px-[20px] py-2 outline-none"
              placeholder="Need a specific delivery day? Sending a gitf? Let’s say ..."
              onChange={field.onChange}
            />
            {errors.notes && (
              <span className="text-red-500">{errors.notes.message}</span>
            )}
          </FormControl>
        );
      }}
    />
  </div>
);
