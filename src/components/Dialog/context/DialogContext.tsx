import React, { createContext, useContext, useState, ReactNode } from "react";
import { Dialog } from "../Dialog";

type DialogDataType = {
  title: string;
  className?: string;
  content: ReactNode;
};

interface DialogContextType {
  isOpen: boolean;
  dialogData: DialogDataType | null;
  openDialog: (data: DialogDataType) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<DialogDataType | null>(null);

  const openDialog = (data: DialogDataType): void => {
    setDialogData(data);
    setIsOpen(true);
  };

  const closeDialog = (): void => {
    setIsOpen(false);
    setDialogData(null);
  };

  return (
    <DialogContext.Provider
      value={{ isOpen, openDialog, closeDialog, dialogData }}
    >
      {children}
      <Dialog
        isOpen={isOpen}
        onClose={closeDialog}
        className={dialogData?.className}
        title={dialogData?.title}
      >
        {dialogData?.content}
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  return context;
};
