import { Login } from "../../Auth/Login";
import { Signup } from "../../Auth/Signup";
import { useDialog } from "../../Dialog/DialogContext";

export const MainHeader = () => {
  const { openDialog, closeDialog } = useDialog();

  const handleOpenLogin = () => {
    openDialog({
      title: "Login",
      content: <Login onClose={closeDialog} onOpenSignup={handleOpenSignup} />,
      className: "w-[400px]",
    });
  };

  const handleOpenSignup = () => {
    openDialog({
      title: "Sign up",
      content: <Signup onClose={closeDialog} onOpenLogin={handleOpenLogin} />,
      className: "w-[400px]",
    });
  };

  return (
    <div className="px-[45px] h-[64px] flex justify-between items-center">
      <div>Freedom</div>
      <div>Search component</div>
      <div className="flex gap-[16px]">
        <div onClick={handleOpenLogin} className="cursor-pointer">
          icon
        </div>
        <div>icon</div>
      </div>
    </div>
  );
};
