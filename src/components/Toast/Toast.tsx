import { Snackbar, SnackbarProps } from "@mui/material";
import cn from "clsx";

export type ToastVariant = "success" | "error";

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
    className={cn(
      "px-6 py-4 border rounded-2xl right-9 bottom-9 text-white font-bold",
      {
        "bg-green-400 border-green-600": variant === "success",
        "bg-red-400 border-red-700": variant === "error",
      },
    )}
    {...props}
  >
    {children}
  </Snackbar>
);
