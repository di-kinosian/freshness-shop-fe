import { Checkbox as CheckboxMUI } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PALETTE } from "../../main/constants/palette";

interface Props {
  selectedData: number[];
  value: number;
  onChange: (item: number) => void;
}

export const Checkbox: React.FC<Props> = ({
  selectedData,
  value,
  onChange: handleCheckboxChange,
}) => {
  const classes = useStyles();
  return (
    <CheckboxMUI
      color="primary"
      checked={selectedData.includes(value)}
      onChange={() => handleCheckboxChange(value)}
      classes={{ root: classes.root }}
    />
  );
};

const useStyles = makeStyles(() => {
  return {
    root: {
      color: PALETTE.basicGray,
      padding: 0,
      "&.Mui-checked": {
        color: PALETTE.neutralGreenBg,
      },
    },
  };
});
