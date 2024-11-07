import axios, { AxiosError } from "axios";
import FormField from "../FormComponents/FormField";
import { Button } from "../Button/Button";
import { ButtonSize, ButtonVariant } from "../../types/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";
import { useState } from "react";
import { MESSAGES } from "../../constants/messages";

const url = import.meta.env.VITE_APP_BE_URL;

interface Props {
  onClose: () => void;
}

export const Login: React.FC<Props> = ({ onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async () => {
    const formData = getValues();
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      setErrorMessage("");
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorMessage(
        axiosError.response && axiosError.status === 401
          ? MESSAGES.ERROR.ACCOUNT_NOT_FOUND
          : MESSAGES.ERROR.LOGIN_FAILED,
      );
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
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
        {errorMessage && (
          <span className="m-auto text-errorText font-bold">
            Account not found. Please sign up.
          </span>
        )}
        <span>If you don’t have an account, </span>
        <a
          href=""
          className="text-link underline"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          sign up
        </a>
      </div>
    </form>
  );
};
