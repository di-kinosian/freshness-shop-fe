import { Rating } from "@mui/material";
import { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

export const RatingFilter = () => {
  const ratings = [5, 4, 3, 2, 1];
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const handleCheckboxChange =
    (rating: number) =>
    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setSelectedRatings((prev) =>
        !checked
          ? prev.filter((r) => r !== Number(rating))
          : [...prev, Number(rating)],
      );
    };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-lg">Rating</span>
      <div className="flex flex-col gap-2">
        {ratings.map((rating) => (
          <div key={rating} className="flex items-center gap-1">
            <Checkbox
              checked={selectedRatings.includes(rating)}
              onChange={handleCheckboxChange(rating)}
            />
            <Rating
              name={`rating-${rating}`}
              value={rating}
              size="small"
              readOnly={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
