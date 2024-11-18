import { useState } from "react";
import { Slider } from "@mui/material";
import FormField from "../FormComponents/FormField";
import { makeStyles } from "@mui/styles";

export const PriceFilter = () => {
  const [priceRange, setPriceRange] = useState<number[]>([300, 600]);

  const classes = useStyles();

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
  ): void => {
    setPriceRange(newValue as number[]);
  };

  const handleInputChange = (type: "min" | "max", value: string): void => {
    const numericValue = parseInt(value, 10) || 0;
    setPriceRange((prev) =>
      type === "min"
        ? [Math.min(numericValue, prev[1]), prev[1]]
        : [prev[0], Math.max(numericValue, prev[0])],
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg">Price</span>
      <div className="px-3">
        <Slider
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          className="text-neutralGreenBg h-[6px]"
          classes={{ root: classes.root }}
        />
      </div>
      <div className="flex gap-4 items-center">
        <FormField
          label="Min"
          value={priceRange[0].toString()}
          onChange={(e) => handleInputChange("min", e.target.value)}
          width="w-[109px]"
        />
        <span className="mt-[23px]">-</span>
        <FormField
          label="Max"
          value={priceRange[1].toString()}
          onChange={(e) => handleInputChange("max", e.target.value)}
          width="w-[109px]"
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
