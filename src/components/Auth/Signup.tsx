import FormField from "../FormComponents/FormField";
import axios, { AxiosError } from "axios";
import { Button } from "../Button/Button";
import { ButtonSize, ButtonVariant } from "../../types/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "./validation";
import { useState } from "react";
import { MESSAGES } from "../../constants/messages";

const url = import.meta.env.VITE_APP_BE_URL;

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
    reset,
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async () => {
    const formData = getValues();
    try {
      const response = await axios.post(`${url}/users/signup`, formData);
      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError;
      handleErrorMessage(axiosError);
    }
    reset();
  };

  const handleErrorMessage = (error: AxiosError): void => {
    if (axios.isAxiosError(error) && error.response) {
      setErrorMessage(
        error.response.status === 400
          ? MESSAGES.ERROR.ACCOUNT_ALREADY_EXISTS
          : MESSAGES.ERROR.SIGNUP_FAILED,
      );
    } else {
      setErrorMessage(MESSAGES.ERROR.NETWORK_ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <FormField
          label="First name"
          placeholder="firstName"
          {...register("firstName")}
          error={errors.firstName && errors.firstName.message}
        />
        <FormField
          label="Last name"
          placeholder="lastName"
          {...register("lastName")}
          error={errors.lastName && errors.lastName.message}
        />
        <FormField
          label="Email"
          placeholder="email"
          {...register("email")}
          error={errors.email && errors.email.message}
        />
        <FormField
          label="Password"
          placeholder="password"
          {...register("password")}
          error={errors.password && errors.password.message}
        />
        <FormField
          label="Phone number"
          placeholder="phoneNumber"
          {...register("phoneNumber")}
          error={errors.phoneNumber && errors.phoneNumber.message}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        color={ButtonVariant.PRIMARY}
        size={ButtonSize.MEDIUM}
      >
        Signup
      </Button>
      <div className="flex flex-col items-center">
        <span className="text-errorText font-bold">{errorMessage}</span>
        <span>If you have an account, </span>
        <div
          className="text-link underline color-link cursor-pointer"
          onClick={() => onOpenLogin()}
        >
          login
        </div>
      </div>
    </form>
  );
};
