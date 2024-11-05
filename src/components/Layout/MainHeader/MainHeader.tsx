import { useState } from "react";
import { Login } from "../../Auth/Login";
import { Dialog } from "../../Dialog/Dialog";
import { Singup } from "../../Auth/Signup";

export const MainHeader = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const onOpenLogin = () => {
    setLoginOpen(true);
  };

  const onCloseLogin = () => {
    setLoginOpen(false);
  };

  const onOpenSignup = () => {
    setSignupOpen(true);
  };

  const onCloseSignup = () => {
    setSignupOpen(false);
  };
  return (
    <div className="px-[45px] h-[64px] flex justify-between items-center">
      <div>Freedom</div>
      <div>Search component</div>
      <div className="flex gap-[16px]">
        <div onClick={onOpenLogin} className="cursor-pointer">
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
        <Login onClose={onCloseLogin} onOpenSignup={onOpenSignup} />
      </Dialog>
      <Dialog
        title="Sign up"
        onClose={onCloseSignup}
        isOpen={signupOpen}
        className="w-[400px] overflow-auto"
      >
        <Singup onClose={onCloseSignup} onOpenLogin={onOpenLogin} />
      </Dialog>
    </div>
  );
};
