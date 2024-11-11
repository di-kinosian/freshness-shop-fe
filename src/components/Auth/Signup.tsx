import FormField from "../FormComponents/FormField";
import { Button } from "../Button/Button";
import { ButtonSize, ButtonVariant } from "../../main/types/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "./validation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/app/store";
import { useAppSelector } from "../../main/hooks";
import { useEffect } from "react";
import {
  clearSignupError,
  signupUser,
} from "../../redux/features/auth/authSlise";
import { useToast } from "../Toast/ToastContext";
import { MESSAGES } from "../../main/constants/messages";

interface Props {
  onClose: () => void;
  onOpenLogin: () => void;
}

export const Signup: React.FC<Props> = ({ onClose, onOpenLogin }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
  });

  const { openToast } = useToast();

  const dispatch: AppDispatch = useDispatch();
  const { signupError } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearSignupError());
  }, [dispatch, onClose]);

  const onSubmit = async () => {
    const formData = getValues();

    dispatch(signupUser(formData))
      .unwrap()
      .then(() => {
        openToast({
          content: MESSAGES.SIGNUP.SUCCESS,
          variant: "success",
        });
        onOpenLogin();
      })
      .catch((error: string) => {
        openToast({
          content: error,
          variant: "error",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <FormField
          label="firstName"
          placeholder="firstName"
          {...register("firstName")}
          error={errors.firstName && errors.firstName.message}
        />
        <FormField
          label="lastName"
          placeholder="lastName"
          {...register("lastName")}
          error={errors.lastName && errors.lastName.message}
        />
        <FormField
          label="email"
          placeholder="email"
          {...register("email")}
          error={errors.email && errors.email.message}
        />
        <FormField
          label="password"
          placeholder="password"
          {...register("password")}
          error={errors.password && errors.password.message}
        />
        <FormField
          label="phoneNumber"
          placeholder="phoneNumber"
          {...register("phoneNumber")}
          error={errors.phoneNumber && errors.phoneNumber.message}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          color={ButtonVariant.PRIMARY}
          size={ButtonSize.MEDIUM}
        >
          Signup
        </Button>
        {signupError && (
          <span className="text-errorText text-center font-bold">
            {signupError}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <span>If you have an account, </span>
        <a
          href=""
          className="text-link underline"
          onClick={(event) => {
            event.preventDefault();
            onOpenLogin();
          }}
        >
          login
        </a>
      </div>
    </form>
  );
};
