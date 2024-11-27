import { useEffect, useState } from "react";
import { Login } from "../../Auth/Login";
import { Signup } from "../../Auth/Signup";
import { useDialog } from "../../Dialog/context/DialogContext";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../main/constants/routes.constants";

export const MainHeader = () => {
  const { openDialog, closeDialog } = useDialog();
  const [hasShadow, setHasShadow] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const goToMainPage = (): void => {
    navigate(ROUTES.HOME.path);
  };

  return (
    <div
      className={twMerge(
        "bg-white sticky top-0 z-10",
        hasShadow ? "border-b border-gray-300" : "",
      )}
    >
      <div className="h-16 flex justify-between items-center max-w-[1200px] w-full mx-auto">
        <img
          src="/freshnesecom.svg"
          alt="Logo freshnesecom"
          onClick={goToMainPage}
          className="cursor-pointer"
        />
        <div>Search component</div>
        <div className="flex gap-10">
          <img
            src="/ic-actions-user.svg"
            alt="User icon"
            onClick={handleOpenLogin}
            className="cursor-pointer"
          />
          <div className="relative">
            <img
              src="/ic-ecommerce-basket.svg"
              alt="Shopping basket icon"
              className="cursor-pointer"
            />
            <img
              src="/group.svg"
              alt="Badge icon"
              className="cursor-pointer absolute top-[12px] right-[9px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
