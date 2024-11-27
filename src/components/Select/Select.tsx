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
}

export const Select = ({ width, options }: Props) => {
  const [selectValue, setSelectValue] = useState("Select");

  const handleChange = (event: SelectChangeEvent): void => {
    setSelectValue(event.target.value as string);
  };

  return (
    <FormControl variant="standard" sx={{ m: 0, width: width || 50 }}>
      <SelectMUI
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectValue}
        onChange={handleChange}
        disableUnderline={true}
        defaultValue="Select"
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  );
};
