import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { Button } from "../Button/Button";
import { makeStyles } from "@mui/styles";

interface Props extends PropsWithChildren {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  onConfirm?: () => void;
}

export const ConfirmationDialog: React.FC<Props> = ({
  isOpen: openDialog,
  onClose,
  title = "Confirm your action",
  children,
  className,
  onConfirm,
}) => {
  const classes = useStyles();

  const handleConfirm = (): void => {
    onConfirm?.();
    onClose();
  };

  return (
    <MuiDialog open={openDialog} onClose={onClose}>
      <DialogTitle className="font-bold m-auto">{title}</DialogTitle>
      <DialogContent className={className}>{children}</DialogContent>
      <DialogActions classes={{ root: classes.root }}>
        <Button color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

const useStyles = makeStyles(() => {
  return {
    root: {
      "&.MuiDialogActions-root": {
        padding: "0 24px 16px 24px",
      },
      "&.MuiDialogContent-root": {
        paddingBottom: 0,
      },
    },
  };
});
