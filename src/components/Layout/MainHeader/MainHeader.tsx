import { useState } from "react";
import { Login } from "../../Auth/Login";
import { Dialog } from "../../Dialog/Dialog";

export const MainHeader = () => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setLoginOpen(true);
  };

  const onCloseLogin = () => {
    setLoginOpen(false);
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
      <Dialog
        title="Login"
        onClose={onCloseLogin}
        isOpen={loginOpen}
        className="w-[400px]"
      >
        <Login onClose={onCloseLogin} />
      </Dialog>
    </div>
  );
};
