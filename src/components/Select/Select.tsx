import {
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Select as SelectMUI,
} from "@mui/material";
import { useState } from "react";
import { Options } from "../../main/types/interfaces";

interface Props {
  width?: number;
  options: Options[];
  value?: string;
  onChange?: (value: string) => void;
}

export const Select = ({
  width,
  options,
  onChange: onChange,
  value,
}: Props) => {
  const [selectValue, setSelectValue] = useState<string>(value || "");

  const handleChange = (event: SelectChangeEvent): void => {
    const value = event.target.value as string;
    setSelectValue(value);
    onChange?.(value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 0, width: width || 50 }}>
      <SelectMUI
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectValue}
        onChange={handleChange}
        disableUnderline={true}
      >
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  );
};
