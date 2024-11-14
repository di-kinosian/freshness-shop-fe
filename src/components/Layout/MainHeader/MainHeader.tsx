import { Login } from "../../Auth/Login";
import { Signup } from "../../Auth/Signup";
import { useDialog } from "../../Dialog/DialogContext";

export const MainHeader = () => {
  const { openDialog, closeDialog } = useDialog();

  const handleOpenLogin = (): void => {
    openDialog({
      title: "Login",
      content: <Login onClose={closeDialog} onOpenSignup={handleOpenSignup} />,
      className: "w-[400px]",
    });
  };

  const handleOpenSignup = (): void => {
    openDialog({
      title: "Sign up",
      content: <Signup onClose={closeDialog} onOpenLogin={handleOpenLogin} />,
      className: "w-[400px]",
    });
  };

  return (
    <div className="h-16 flex justify-between items-center max-w-[1200px] w-full mx-auto bg-white sticky top-0 z-10">
      <div>Freedom</div>
      <div>Search component</div>
      <div className="flex gap-4">
        <div onClick={handleOpenLogin} className="cursor-pointer">
          icon
        </div>
        <div>icon</div>
      </div>
    </div>
  );
};
