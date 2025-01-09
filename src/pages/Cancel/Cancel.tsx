import { Button } from "@components/Button/Button";
import { ButtonVariant } from "../../main/types/enums";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../main/constants/routes.constants";

export const Cancel = () => {
  const navigate = useNavigate();

  const goToMainPage = (): void => {
    navigate(ROUTES.PRODUCTS.path);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-500">Payment Cancelled</h1>
        <p className="text-gray-600 mt-4">
          It looks like you’ve cancelled your payment. No worries — you can always
          try again later!
        </p>

        <div className="mt-6 space-y-4">
          <Button onClick={goToMainPage} className="w-full">
            Back to Shop
          </Button>
          <Button color={ButtonVariant.SECONDARY} className="w-full">
            Contact Support
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Need help? Check our{" "}
          <a href="/faq" className="underline text-blue-500">
            FAQs
          </a>
          .
        </p>
      </div>
    </div>
  );
};
