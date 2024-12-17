import { useCallback, useEffect, useState } from "react";
import { Login } from "../../Auth/Login";
import { Signup } from "../../Auth/Signup";
import { useDialog } from "../../Dialog/context/DialogContext";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../main/constants/routes.constants";
import { useAppSelector } from "../../../redux/app/hooks";
import UserIcon from "../../Icons/UserIcon";
import { Popover } from "../../Popover/Popover";
import LogoutIcon from "@mui/icons-material/Logout";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PersonIcon from "@mui/icons-material/Person";
import { Logout } from "../../Auth/Logout";
import { WishList } from "../../Product/WishList";
import { Search } from "../../Search/Search";
import { selectAccessToken } from "../../../redux/features/auth/selectors";

export const MainHeader = () => {
  const { openDialog, closeDialog } = useDialog();
  const [hasShadow, setHasShadow] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const navigate = useNavigate();

  const token = useAppSelector(selectAccessToken);
  const isLogin = !!token;

  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserIconClick = (
    event: React.MouseEvent<SVGSVGElement>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = useCallback((): void => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleOpenLogin = (): void => {
    handleUserMenuClose();
    openDialog({
      title: "Log in",
      content: <Login onClose={closeDialog} onOpenSignup={handleOpenSignup} />,
      className: "w-[400px]",
    });
  };

  const handleOpenSignup = (): void => {
    handleUserMenuClose();
    openDialog({
      title: "Sign up",
      content: <Signup onClose={closeDialog} onOpenLogin={handleOpenLogin} />,
      className: "w-[400px]",
    });
  };

  const handleOpenLogout = (): void => {
    handleUserMenuClose();
    openDialog({
      title: "Log out",
      content: <Logout onClose={closeDialog} />,
      className: "w-[400px]",
    });
  };

  const handleOpenWishList = (): void => {
    handleUserMenuClose();
    openDialog({
      title: "Wish list",
      content: <WishList onClose={closeDialog} />,
    });
  };

  const goToMainPage = (): void => {
    navigate(ROUTES.HOME.path);
  };

  return (
    <>
      <div
        className={twMerge(
          "bg-white sticky top-0 z-10",
          hasShadow && "border-b border-gray-300",
        )}
      >
        <div className="h-16 flex justify-between items-center max-w-[1200px] w-full mx-auto">
          <img
            src="/freshness-shop-fe/freshnesecom.svg"
            alt="Logo freshnesecom"
            onClick={goToMainPage}
            className="cursor-pointer hidden md:block"
          />
          <Search />
          <div className="flex gap-10">
            <UserIcon
              isLogin={isLogin}
              className="cursor-pointer"
              onClick={isLogin ? handleUserIconClick : handleOpenLogin}
            />
            <div className="relative">
              <img
                src="/freshness-shop-fe/ic-ecommerce-basket.svg"
                alt="Shopping basket icon"
                className="cursor-pointer"
              />
              <img
                src="/freshness-shop-fe/group.svg"
                alt="Badge icon"
                className="cursor-pointer absolute top-[12px] right-[9px]"
              />
            </div>
          </div>
        </div>
      </div>
      <Popover onClose={handleUserMenuClose} anchorEl={anchorEl} left={-24}>
        <div className="px-6 py-2 border border-basicGray rounded-md">
          {isLogin && (
            <ul className="space-y-2">
              <li className="cursor-pointer flex gap-2 items-center">
                <PersonIcon fontSize="small" />
                <span>Profile</span>
              </li>
              <li
                className="cursor-pointer flex gap-2 items-center"
                onClick={handleOpenWishList}
              >
                <ChecklistIcon fontSize="small" />
                <span>Wish list</span>
              </li>
              <li
                className="cursor-pointer flex gap-2 items-center"
                onClick={handleOpenLogout}
              >
                <LogoutIcon fontSize="small" />
                <span>Log out</span>
              </li>
            </ul>
          )}
        </div>
      </Popover>
    </>
  );
};
