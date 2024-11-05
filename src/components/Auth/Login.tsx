import axios, { AxiosError } from "axios";
import FormField from "../FormComponents/FormField";
import { Button } from "../Button/Button";
import { ButtonSize, ButtonVariant } from "../../types/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";
import { useState } from "react";

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

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async () => {
    const formData = getValues();
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      setErrorMessage("");
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.status === 401) {
        setErrorMessage("Account not found. Please sign up.");
      } else {
        setErrorMessage("Login failed. Please try again later.");
      }
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
          href="/signup"
          className="text-linkColor underline"
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
