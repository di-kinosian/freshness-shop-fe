import { useNavigate } from "react-router-dom";
import { ButtonSize, ButtonVariant } from "../../main/types/enums";
import { Button } from "../Button/Button";
import { getProductDetailsRoute } from "../../main/constants/routes.constants";
import { Product } from "../../redux/features/products/types";
import { ProductRating } from "./ProductRating";
import { formatMoney } from "../../main/helpers";

interface Props {
  product: Product;
}

export const ProductItem: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const goToPDP = (productId: string): void => {
    navigate(getProductDetailsRoute(productId));
  };

  return (
    <div className="border border-basicGray rounded-lg grid grid-cols-[220px,2fr,1fr] gap-[26px]">
      <img
        src="https://tse3.mm.bing.net/th?id=OIP.5cV6Bxiey16ZNKucbF2r0QHaHa&pid=Api"
        alt=""
        className="rounded-lg h-[220px]"
      />
      <div className="flex flex-col justify-between py-6">
        <div className="flex flex-col items-start gap-2">
          <div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <span className="text-grayText text-sm text-left">
              {product.description}
            </span>
          </div>
          <ProductRating value={product?.rating ?? 0} size="small" />
        </div>

        <div className="grid grid-[1fr,1fr] gap-x-16 gap-y-1 w-full text-sm">
          <div className="grid grid-cols-[1fr,2fr] gap-8">
            <span className="text-grayText">Country</span>
            <span className="text-gray-600">{product?.country}</span>
          </div>
          <div className="grid grid-cols-[1fr,2fr] gap-8">
            <span className="text-grayText">Brand</span>
            <span className="text-gray-600">{product?.brand}</span>
          </div>
          {product?.additionalInformation?.map((item) => (
            <div className="grid grid-cols-[1fr,2fr] gap-8" key={item.key}>
              <div className="text-grayText">{item.key}</div>
              <div className="text-gray-600">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-6 flex flex-col justify-between items-start pr-6">
        <div className="text-lg font-bold">{formatMoney(product.price)}</div>
        <div className="flex flex-col gap-2">
          <Button
            color={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
            className="w-[164px] flex gap-2"
            onClick={() => goToPDP(product._id)}
          >
            <span>Product Detail</span>
            <img src="/vector-button.svg" alt="" />
          </Button>
          <Button
            color={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            className="flex gap-1"
          >
            <img src="/like.svg" />
            <span>Add to wish list</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
