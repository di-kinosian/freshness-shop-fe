import {
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Select as SelectMUI,
} from "@mui/material";
import { useState } from "react";
import { Options } from "./types";

interface Props {
  width?: number;
  options: Options[];
  getParams?: (value: string) => void;
}

export const Select = ({ width, options, getParams }: Props) => {
  const [selectValue, setSelectValue] = useState("");

  const handleChange = (event: SelectChangeEvent): void => {
    const value = event.target.value as string;
    setSelectValue(value);
    getParams?.(value);
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
