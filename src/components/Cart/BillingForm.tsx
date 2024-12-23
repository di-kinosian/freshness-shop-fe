import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { billingValidationShema } from "./validation";
import FormField from "@components/FormComponents/FormField";
import { Button } from "@components/Button/Button";

import { BillingFormFields, ButtonVariant } from "../../main/types/enums";
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
import { NotesField } from "./NotesField";
import { LocationField } from "./LocationFields";
import { CheckboxField } from "./PolicyField";
import { MESSAGES } from "../../main/constants/messages";
import { createOrder } from "@redux/features/orders/ordersSlice";
import { selectCart } from "@redux/features/cart/selectors";
import { OrderStatus, PaymentStatus } from "@redux/features/orders/type";

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
    getValues,
    resetField,
  } = useForm({
    resolver: yupResolver(billingValidationShema),
    defaultValues: {
      agreeToPolicy: false,
      agreeToEmails: false,
    },
  });

  const country = watch("country");
  const dispatch: AppDispatch = useDispatch();
  const countries = useAppSelector(selectCountries);
  const cities = useAppSelector(selectCities);
  const cart = useAppSelector(selectCart);

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

  const totalAmount = cart.reduce((acc, item) => {
    return (acc = acc + item.product.price);
  }, 0);

  const onSubmit = async () => {
    const data = getValues();
    await dispatch(
      createOrder({
        billingInfo: data,
        paymentStatus: PaymentStatus.UNPAID,
        products: cart,
        status: OrderStatus.PENDING,
        totalAmount: totalAmount,
      }),
    );
  };

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
      className="flex flex-col gap-16 max-w-[500px]"
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
        <LocationField
          name="country"
          control={control}
          locationOptions={countriesOptions}
          error={errors.country ? errors.country.message : ""}
          label="State / Country"
          placeholder="country"
        />
        <LocationField
          name="city"
          control={control}
          locationOptions={citiesOptions}
          error={errors.city ? errors.city.message : ""}
          label="Town / City"
          placeholder={country ? "city" : "select country"}
          disabled={!country}
        />
        <BillingFormField
          name={BillingFormFields.ZipCode}
          label="Zip / Postal Code"
        />
      </div>
      <NotesField control={control} errors={errors} />
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">Confirmation</h2>
          <span className="text-sm text-grayText">
            We are getting to the end. Just few clicks and your order is ready!
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <CheckboxField
            control={control}
            name="agreeToEmails"
            text={MESSAGES.CHECKBOX.MARKETING_AGREEMENT}
          />
          <CheckboxField
            control={control}
            name="agreeToPolicy"
            error={errors.agreeToPolicy?.message || ""}
            text={MESSAGES.CHECKBOX.TERMS_AND_CONDITIONS}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          color={ButtonVariant.PRIMARY}
          className="w-[200px]"
        >
          Complete
        </Button>
      </div>
    </form>
  );
};
