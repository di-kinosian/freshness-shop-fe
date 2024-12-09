import { Button } from "../Button/Button";
import { ButtonSize, ButtonVariant } from "../../main/types/enums";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/app/store";
import { logout } from "../../redux/features/auth/authSlise";

interface Props {
  onClose: () => void;
}

export const Logout: React.FC<Props> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogOut = (): void => {
    dispatch(logout);
    onClose();
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <span>Do you want to log out?</span>
      <div className="flex gap-4 w-full">
        <Button
          className="w-full"
          color={ButtonVariant.PRIMARY}
          size={ButtonSize.MEDIUM}
          onClick={handleLogOut}
        >
          Log out
        </Button>
        <Button
          className="w-full"
          color={ButtonVariant.SECONDARY}
          size={ButtonSize.MEDIUM}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
