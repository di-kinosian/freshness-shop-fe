import { Dialog as MuiDialog, DialogContent, DialogTitle } from "@mui/material";
import { PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Dialog: React.FC<Props> = ({
  isOpen: openDialog,
  onClose,
  title,
  children,
  className,
}) => {
  return (
    <MuiDialog open={openDialog} onClose={onClose}>
      <DialogTitle className="font-bold m-auto">{title}</DialogTitle>
      <DialogContent className={className}>{children}</DialogContent>
    </MuiDialog>
  );
};
