import { FormControl } from "@mui/material";
import Label from "./Label";

interface Props {
  value: string;
  onChange: () => void;
  error?: string;
}

export const TextareaFormField = ({ value, onChange, error }: Props) => {
  return (
    <FormControl variant="standard" className="items-start">
      <Label>Order notes</Label>
      <textarea
        value={value}
        className="border border-basicGray rounded-2xl bg-neutralGrayBg min-h-[110px] w-full px-[20px] py-2 outline-none"
        placeholder="Need a specific delivery day? Sending a gitf? Let’s say ..."
        onChange={onChange}
      />
      {error && <span className="text-red-500">{error}</span>}
    </FormControl>
  );
};
