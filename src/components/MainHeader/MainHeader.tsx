import { useState } from "react";
import { Login } from "../Auth/Login";

export const MainHeader = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div className="px-[45px] h-[64px] flex justify-between items-center">
      <div>Freedom</div>
      <div>Search component</div>
      <div className="flex gap-[16px]">
        <div onClick={handleOpenDialog} className="cursor-pointer">
          icon
        </div>
        <div>icon</div>
      </div>
      <Login
        openDialog={openDialog}
        onClose={handleCloseDialog}
        title="Login"
      />
    </div>
  );
};
