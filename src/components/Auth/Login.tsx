import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import FormField from "../FormComponents/FormField";
import { Button } from "../Button/Button";
import { ButtonSize, ButtonVariant } from "../../types/enums";

interface Props {
  title?: string;
  openDialog: boolean;
  contentText?: string;
  onClose: () => void;
}

export const Login: React.FC<Props> = ({
  openDialog,
  onClose,
  title,
  contentText,
}) => {
 
  return (
    <MuiDialog open={openDialog} onClose={onClose}>
      <DialogTitle sx={{ minWidth: "450px" }}>
        {title}
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <DialogContentText>{contentText}</DialogContentText>
        <FormField label="email" placeholder="email" />
        <FormField label="password" placeholder="password" />
      </DialogContent>
      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button color={ButtonVariant.PRIMARY} size={ButtonSize.SMALL}>
          Login
        </Button>
        <Button
          color={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          onClick={onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
