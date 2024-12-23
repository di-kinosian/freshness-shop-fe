import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../main/constants/routes.constants";
import { Button } from "@components/Button/Button";

export const EmptyCheckout = () => {
  const navigate = useNavigate();
  const goToMainPage = (): void => {
    navigate(ROUTES.PRODUCTS.path);
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col gap-3 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="Empty Cart"
          className="w-32 h-32 mx-auto"
        />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Your cart is empty
        </h1>
        <p className="mt-2 text-gray-600">
          It looks like you haven’t added anything to your cart yet.
        </p>
      </div>
      <Button onClick={goToMainPage}>Continue Shopping</Button>
    </div>
  );
};
