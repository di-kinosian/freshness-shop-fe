import { Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  value: number;
  size?: "medium" | "large" | "small";
}

export const ProductRating: React.FC<Props> = ({ value, size = "medium" }) => {
  const classes = useStyles();
  return (
    <Rating
      value={value}
      size={size}
      readOnly={true}
      classes={{ root: classes.root }}
    />
  );
};

const useStyles = makeStyles(() => {
  return {
    root: {
      color: "black",
    },
  };
});
