import { Checkbox as CheckboxMUI, CheckboxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PALETTE } from "../../main/constants/palette";

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const classes = useStyles();
  return (
    <CheckboxMUI
      color="primary"
      classes={{ root: classes.root }}
      {...props}
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
