import PopoverMUI from "@mui/material/Popover";
import { makeStyles } from "@mui/styles";
import { ReactNode } from "react";

interface Props {
  anchorEl: HTMLButtonElement | SVGSVGElement | null;
  onClose: () => void;
  children: ReactNode;
  top?: number;
  left?: number;
}

export const Popover = ({ anchorEl, onClose, children, top, left }: Props) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const classes = useStyles();

  return (
    <PopoverMUI
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      classes={classes}
      anchorOrigin={{
        vertical: top || 40,
        horizontal: left || "left",
      }}
    >
      {children}
    </PopoverMUI>
  );
};

const useStyles = makeStyles(() => {
  return {
    paper: {
      boxShadow: "none",
      borderRadius: "0px",
    },
  };
});
