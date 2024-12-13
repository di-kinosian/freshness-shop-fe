import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { billingValidationShema } from "./validation";
import FormField from "@components/FormComponents/FormField";
import { Button } from "@components/Button/Button";
import { ButtonVariant } from "../../main/types/enums";
import { Autocomplete } from "@components/FormComponents/Autocomplete";
import { FormControl } from "@mui/material";
import { twMerge } from "tailwind-merge";
import Label from "@components/FormComponents/Label";
import { useEffect, useMemo } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import {
  getCountries,
} from "../../redux/features/countries/countriesSlice";
import { useAppSelector } from "../../redux/app/hooks";
import {
  transformCitiesToOptions,
  transformCountriesToOptions,
} from "../../main/helpers";
import { selectCities, selectCountries } from "../../redux/features/countries/selectors";

export const BillingForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    resolver: yupResolver(billingValidationShema),
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const dispatch: AppDispatch = useDispatch();
  const countries = useAppSelector(selectCountries);
  const cities = useAppSelector(selectCities);

  const onSubmit = async () => {
    const data = getValues();
  };

  const countriesOptions = useMemo(
    () => transformCountriesToOptions(countries),
    [countries],
  );

  const citiesOptions = useMemo(
    () => transformCitiesToOptions(cities),
    [cities],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7 max-w-[500px]"
    >
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
          label="Phone number"
          placeholder="phoneNumber"
          {...register("phoneNumber")}
          error={errors.phoneNumber && errors.phoneNumber.message}
        />
        <FormField
          label="Address"
          placeholder="address"
          {...register("address")}
          error={errors.address && errors.address.message}
        />
        <Controller
          control={control}
          name="country"
          render={({ field }) => {
            return (
              <FormControl
                variant="standard"
                className={twMerge("items-start")}
              >
                <Label>{"State / Country"}</Label>
                <Autocomplete
                  options={countriesOptions}
                  value={field.value}
                  onChange={field.onChange}
                  inputRef={field.ref}
                  placeholder="country"
                />
                {errors.country && (
                  <span className="text-red-500">{errors.country.message}</span>
                )}
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="city"
          render={({ field }) => {
            return (
              <FormControl
                variant="standard"
                className={twMerge("items-start")}
              >
                <Label>{"Town / City"}</Label>
                <Autocomplete
                  options={citiesOptions}
                  value={field.value}
                  onChange={field.onChange}
                  inputRef={field.ref}
                  placeholder="city"
                />
                {errors.city && (
                  <span className="text-red-500">{errors.city.message}</span>
                )}
              </FormControl>
            );
          }}
        />
        <FormField
          label="Zip / Postal Code"
          placeholder="zip code"
          {...register("zipCode")}
          error={errors.zipCode && errors.zipCode.message}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button type="submit" color={ButtonVariant.SECONDARY}>
          Submit
        </Button>
      </div>
    </form>
  );
};
