import FormField from "../FormComponents/FormField";
import { Button } from "../Button/Button";
import { ButtonSize, ButtonVariant } from "../../main/types/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "./validation";
import { useDispatch } from "react-redux";
import {
  clearLoginError,
  loginUser,
} from "../../redux/features/auth/authSlise";
import { AppDispatch } from "../../redux/app/store";
import { useAppSelector } from "../../main/hooks";
import { useEffect } from "react";

interface Props {
  onClose: () => void;
  onOpenSignup: () => void;
}

export const Login: React.FC<Props> = ({ onClose, onOpenSignup }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const dispatch: AppDispatch = useDispatch();
  const { loginError } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearLoginError());
  }, [dispatch, onClose]);

  const onSubmit = async () => {
    const formData = getValues();
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        reset();
        onClose();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <FormField
          label="Email"
          placeholder="email"
          {...register("email")}
          error={errors.email && errors.email.message}
        />
        <FormField
          label="Password"
          type="password"
          placeholder="password"
          {...register("password")}
          error={errors.password && errors.password.message}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        color={ButtonVariant.PRIMARY}
        size={ButtonSize.MEDIUM}
      >
        Login
      </Button>
      <div className="flex flex-col items-center">
        <span className="text-errorText font-bold">{loginError || null}</span>
        <span>If you don’t have an account, </span>
        <div
          className="text-link underline color-link cursor-pointer"
          onClick={onOpenSignup}
        >
          sign up
        </div>
      </div>
    </form>
  );
};
