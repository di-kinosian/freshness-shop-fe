import { Rating } from "@mui/material";
import { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

export const RatingFilter = () => {
  const ratings = [5, 4, 3, 2, 1];
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const handleCheckboxChange = (rating: number): void => {
    setSelectedRatings((prev) =>
      prev?.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-lg">Rating</span>
      <div className="flex flex-col gap-2">
        {ratings.map((rating) => (
          <div key={rating} className="flex items-center gap-1">
            <Checkbox
              onChange={handleCheckboxChange}
              value={rating}
              selectedData={selectedRatings}
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
