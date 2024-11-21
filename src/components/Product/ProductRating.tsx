import { Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  value: number;
}

export const ProductRating: React.FC<Props> = ({ value }) => {
  const classes = useStyles();
  return (
    <Rating
      value={value}
      size="medium"
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
