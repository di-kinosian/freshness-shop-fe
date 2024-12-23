import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { billingValidationShema } from "./validation";
import FormField from "@components/FormComponents/FormField";
import { Button } from "@components/Button/Button";
import { BillingFormFields, ButtonVariant } from "../../main/types/enums";
import { Autocomplete } from "@components/FormComponents/Autocomplete";
import { FormControl } from "@mui/material";
import { twMerge } from "tailwind-merge";
import Label from "@components/FormComponents/Label";
import { useEffect, useMemo } from "react";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import {
  getCities,
  getCountries,
} from "../../redux/features/location/locationSlice";
import { useAppSelector } from "../../redux/app/hooks";
import {
  transformCitiesToOptions,
  transformCountriesToOptions,
} from "../../main/helpers";
import {
  selectCities,
  selectCountries,
} from "../../redux/features/location/selectors";

interface BillingFormFieldProps {
  name: BillingFormFields;
  label: string;
}

export const BillingForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    resetField,
  } = useForm({
    resolver: yupResolver(billingValidationShema),
  });

  const country = watch("country");
  const dispatch: AppDispatch = useDispatch();
  const countries = useAppSelector(selectCountries);
  const cities = useAppSelector(selectCities);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (country) {
      dispatch(getCities(country));
    } else {
      resetField("city");
    }
  }, [country]);

  const onSubmit = async () => {};

  const countriesOptions = useMemo(
    () => transformCountriesToOptions(countries),
    [countries],
  );

  const citiesOptions = useMemo(
    () => transformCitiesToOptions(cities),
    [cities],
  );

  const BillingFormField = ({ name, label }: BillingFormFieldProps) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormField
            label={label}
            placeholder={label}
            {...field}
            error={fieldState.error?.message}
          />
        )}
      />
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7 max-w-[500px]"
    >
      <div className="flex flex-col gap-4">
        <BillingFormField
          name={BillingFormFields.FirstName}
          label="First name"
        />
        <BillingFormField name={BillingFormFields.LastName} label="Last name" />
        <BillingFormField name={BillingFormFields.Email} label="Email" />
        <BillingFormField
          name={BillingFormFields.PhoneNumber}
          label="Phone number"
        />
        <BillingFormField name={BillingFormFields.Address} label="Address" />
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
                  placeholder={country ? "city" : "select country"}
                  disabled={!country}
                />
                {errors.city && (
                  <span className="text-red-500">{errors.city.message}</span>
                )}
              </FormControl>
            );
          }}
        />
        <BillingFormField
          name={BillingFormFields.ZipCode}
          label="Zip / Postal Code"
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
