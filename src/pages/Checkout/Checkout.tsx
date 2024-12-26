import { BillingForm } from "@components/Cart/BillingForm";
import { OrderSection } from "../../components/Cart/OrderSection";

export const Checkout = () => {
  return (
    <div className="grid grid-cols-1 customCheckout:grid-cols-[1fr,1fr] gap-8 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col gap-4 w-full">
        <div>
          <h2 className="text-2xl font-semibold">Billing info</h2>
          <span className="text-sm text-grayText">
            Please enter your billing info
          </span>
        </div>
        <BillingForm />
      </div>
      <OrderSection />
    </div>
  );
};
