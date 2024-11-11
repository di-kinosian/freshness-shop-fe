import React, { createContext, useContext, useState, ReactNode } from "react";
import { Toast, ToastVariant } from "./Toast";


type ToastDataType = {
  content: string | null;
  duration?: number;
  variant: ToastVariant;
};

interface ToastContextType {
  isOpen: boolean;
  toastData: ToastDataType | null;
  openToast: (data: ToastDataType) => void;
  closeToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastData, setToastData] = useState<ToastDataType | null>(null);

  const openToast = (data: ToastDataType) => {
    setToastData(data);
    setIsOpen(true);
  };

  const closeToast = () => {
    setIsOpen(false);
    setToastData(null);
  };

  return (
    <ToastContext.Provider value={{ isOpen, openToast, closeToast, toastData }}>
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
