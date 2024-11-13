import { Snackbar, SnackbarProps } from "@mui/material";
import { twMerge } from "tailwind-merge";
import { ToastVariant } from "../../main/types/enums";

interface IProps extends SnackbarProps {
  variant: ToastVariant;
}

export const Toast: React.FC<IProps> = ({
  open,
  onClose,
  children,
  variant,
  ...props
}) => (
  <Snackbar
    onClose={onClose}
    open={open}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    className={twMerge(
      "px-6 py-4 border rounded-2xl right-9 bottom-9 text-white font-bold",
      variant === "success" ? "bg-green-400 border-green-600" : "",
      variant === "error" ? "bg-red-400 border-red-700" : "",
    )}
    {...props}
  >
    {children}
  </Snackbar>
);
