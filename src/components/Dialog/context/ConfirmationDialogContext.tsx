import React, { createContext, useContext, useState, ReactNode } from "react";
import { ConfirmationDialog } from "../ConfirmationDialog";

type ConfirmationDialogDataType = {
  title?: string;
  className?: string;
  content: ReactNode;
  onConfirm?: () => void;
};

interface ConfirmationDialogContextType {
  isOpen: boolean;
  dialogData: ConfirmationDialogDataType | null;
  openConfirmationDialog: (data: ConfirmationDialogDataType) => void;
  closeConfirmationDialog: () => void;
}

const ConfirmationDialogContext = createContext<
  ConfirmationDialogContextType | undefined
>(undefined);

export const ConfirmationDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogData, setDialogData] =
    useState<ConfirmationDialogDataType | null>(null);

  const openConfirmationDialog = (data: ConfirmationDialogDataType): void => {
    setDialogData(data);
    setIsOpen(true);
  };

  const closeConfirmationDialog = (): void => {
    setIsOpen(false);
    setDialogData(null);
  };

  return (
    <ConfirmationDialogContext.Provider
      value={{
        isOpen,
        openConfirmationDialog,
        closeConfirmationDialog,
        dialogData,
      }}
    >
      {children}
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={closeConfirmationDialog}
        className={dialogData?.className}
        title={dialogData?.title}
        onConfirm={dialogData?.onConfirm}
      >
        {dialogData?.content}
      </ConfirmationDialog>
    </ConfirmationDialogContext.Provider>
  );
};

export const useConfirmationDialog = (): ConfirmationDialogContextType => {
  const context = useContext(ConfirmationDialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  return context;
};
