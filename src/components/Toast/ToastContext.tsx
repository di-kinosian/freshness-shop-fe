import React, { createContext, useContext, useState, ReactNode } from "react";
import { Toast } from "./Toast";
import { ToastVariant } from "../../main/types/enums";

type ToastDataType = {
  content: string | null;
  variant: ToastVariant;
  duration?: number;
};

interface ToastContextType {
  isOpen: boolean;
  toastData: ToastDataType | null;
  closeToast: () => void;
  openSuccessToast: (content: string) => void;
  openErrorToast: (content: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastDataType | null>(null);

  const openSuccessToast = (content: string): void => {
    setToastData({
      variant: ToastVariant.SUCCESS,
      content,
    });
    setIsOpen(true);
  };

  const openErrorToast = (content: string): void => {
    setToastData({
      variant: ToastVariant.ERROR,
      content,
    });
    setIsOpen(true);
  };

  const closeToast = (): void => {
    setIsOpen(false);
    setToastData(null);
  };

  return (
    <ToastContext.Provider
      value={{
        isOpen,
        openSuccessToast,
        openErrorToast,
        closeToast,
        toastData,
      }}
    >
      {children}
      {isOpen && toastData?.content && (
        <Toast
          open={isOpen}
          onClose={closeToast}
          variant={toastData.variant}
          autoHideDuration={toastData.duration || 6000}
        >
          <div>{toastData?.content}</div>
        </Toast>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
