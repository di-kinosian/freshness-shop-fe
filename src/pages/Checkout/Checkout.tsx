import { OrderSection } from "../../components/Cart/OrderSection";

export const Checkout = () => {
  return (
    <div className="grid grid-cols-[1fr,1fr] gap-8 max-w-[1200px] mx-auto w-full">
      <div>Left side</div>
      <OrderSection />
    </div>
  );
};
