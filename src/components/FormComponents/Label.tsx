import { FormLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ComponentProps } from "react";
import { PALETTE } from "../../constants/palette";

export default function Label(props: ComponentProps<typeof FormLabel>) {
  const classes = useStyles(props);

  return (
    <FormLabel
      {...props}
      classes={{ root: classes.root }}
      className="mb-1 font-bold"
    />
  );
}

const useStyles = makeStyles(() => {
  return {
    root: {
      "&.MuiFormLabel-colorPrimary": {
        color: "black",
      },
      "&.Mui-error": {
        color: PALETTE.errorText,
      },
    },
  };
});
