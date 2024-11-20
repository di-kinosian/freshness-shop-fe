import { Rating } from "@mui/material";
import { Checkbox } from "../Checkbox/Checkbox";
import { ratings } from "../../main/constants/filters.constants";
import { SelectedFilters } from "./types";

interface Props {
  value: SelectedFilters["rating"];
  onChange: (value: SelectedFilters["rating"]) => void;
}

export const RatingFilter: React.FC<Props> = ({ onChange, value }) => {
  const handleCheckboxChange =
    (rating: number) =>
    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChange(
        !checked
          ? value.filter((r) => r !== Number(rating))
          : [...value, Number(rating)],
      );
    };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-lg">Rating</span>
      <div className="flex flex-col gap-2">
        {ratings.map((rating) => (
          <div key={rating} className="flex items-center gap-1">
            <Checkbox
              checked={value.includes(rating)}
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
