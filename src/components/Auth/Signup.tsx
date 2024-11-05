import FormField from "../FormComponents/FormField";
import axios, { AxiosError } from "axios";
import { Button } from "../Button/Button";
import { ButtonSize, ButtonVariant } from "../../types/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "./validation";
import { useState } from "react";

const url = import.meta.env.VITE_APP_BE_URL;

interface Props {
  onClose: () => void;
  onOpenLogin: () => void;
}

export const Singup: React.FC<Props> = ({ onClose, onOpenLogin }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");

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

  const handleErrorMessage = (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        setErrorMessage("An account with this email already exists.");
      } else {
        setErrorMessage("Signup failed. Please try again later.");
      }
    } else {
      setErrorMessage("Network error. Please check your connection.");
    }
    console.error("Signup error:", error);
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
      <Button
        type="submit"
        className="w-full"
        color={ButtonVariant.PRIMARY}
        size={ButtonSize.MEDIUM}
      >
        Singup
      </Button>
      <div className="flex flex-col items-center">
        <span className="text-errorText font-bold">{errorMessage}</span>
        <span>If you have an account, </span>
        <a
          href="/signup"
          className="text-link underline"
          onClick={(event) => {
            event.preventDefault();
            onOpenLogin();
            onClose();
          }}
        >
          login
        </a>
      </div>
    </form>
  );
};
