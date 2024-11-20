import { FocusEvent, useEffect, useState } from "react";
import { Slider } from "@mui/material";
import FormField from "../FormComponents/FormField";
import { makeStyles } from "@mui/styles";
import { PriceRange, SelectedFilters } from "./types";

interface Props {
  availableRange?: PriceRange;
  value: SelectedFilters["price"];
  onChange: (range: SelectedFilters["price"]) => void;
}

export const PriceFilter = ({ availableRange, onChange, value }: Props) => {
  const [minInputValue, setMinInputValue] = useState<string>(
    value.min.toString(),
  );
  const [maxInputValue, setMaxInputValue] = useState<string>(
    value.max.toString(),
  );
  const classes = useStyles();

  useEffect(() => {
    setMinInputValue(value.min.toString());
    setMaxInputValue(value.max.toString());
  }, [value]);

  const handleSliderChange = (_: Event, newValue: number | number[]): void => {
    const [min, max] = newValue as number[];
    onChange({ min, max });
    setMinInputValue(min.toString());
    setMaxInputValue(max.toString());
  };

  if (!availableRange) return null;

  const onMaxInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    let max = Number(e.target.value);

    if (max > availableRange.max) {
      max = availableRange.max;
    } else if (max < value.min) {
      max = value.min;
    }

    setMaxInputValue(max.toString());
    onChange({ min: value.min, max });
  };

  const onMinInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    let min = Number(e.target.value);

    if (min < availableRange.min) {
      min = availableRange.min;
    } else if (min > value.max) {
      min = value.max;
    }
    setMinInputValue(min.toString());
    onChange({ max: value.max, min });
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg">Price</span>
      <div className="px-3">
        <Slider
          value={[value.min, value.max]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={availableRange.min}
          max={availableRange.max}
          className="text-neutralGreenBg h-[6px]"
          classes={{ root: classes.root }}
        />
      </div>
      <div className="flex gap-4 items-center">
        <FormField
          label="Min"
          value={minInputValue}
          onChange={(e) => setMinInputValue(e.target.value)}
          onBlur={onMinInputBlur}
          className="w-[109px]"
          type="number"
        />
        <span className="mt-[23px]">-</span>
        <FormField
          label="Max"
          value={maxInputValue}
          onBlur={onMaxInputBlur}
          onChange={(e) => setMaxInputValue(e.target.value)}
          className="w-[109px]"
          type="number"
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => {
  return {
    root: {
      "& .MuiSlider-thumb": {
        backgroundColor: "white",
      },
      "& .MuiSlider-rail": {
        backgroundColor: "#ccc",
      },
    },
  };
});
