import FormField from "../FormComponents/FormField";
import { Button } from "../Button/Button";
import { ButtonSize, ButtonVariant } from "../../types/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";

interface Props {
  contentText?: string;
  onClose: () => void;
}

export const Login: React.FC<Props> = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    const formData = getValues();
    console.log("onSubmit");

    console.log(formData, "formData");
    //form obj for login and sent to BE
  };

  console.log(register("email"));

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
        <span>If you don’t have an account, </span>
        <a href="/signup" className="text-blue-500 underline">
          sign up
        </a>
      </div>
      <div></div>
    </form>
  );
};
