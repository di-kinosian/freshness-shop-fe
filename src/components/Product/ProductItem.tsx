import { useNavigate } from "react-router-dom";
import { ButtonSize, ButtonVariant } from "../../main/types/enums";
import { Button } from "../Button/Button";
import { getProductDetailsRoute } from "../../main/constants/routes.constants";
import { Product } from "../../redux/features/products/types";
import { ProductRating } from "./ProductRating";
import { calculateOriginalPrice, formatMoney } from "../../main/helpers";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import {
  addToWishList,
  deleteFromWishList,
} from "../../redux/features/auth/authSlise";
import WishListIcon from "./WishListIcon";
import { twMerge } from "tailwind-merge";

interface Props {
  product: Product;
  wishList?: string[];
}

export const ProductItem: React.FC<Props> = ({ product, wishList }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const isInWishList = wishList?.includes(product._id);

  const updateWishList = (): void => {
    if (isInWishList) {
      dispatch(deleteFromWishList({ productId: product._id }));
    } else {
      dispatch(addToWishList({ productId: product._id }));
    }
  };

  const goToPDP = (productId: string): void => {
    navigate(getProductDetailsRoute(productId));
  };

  return (
    <div className="border border-basicGray rounded-lg grid grid-cols-[1fr,1fr,1fr] customSm:grid-cols-[240px,2fr,1fr] gap-[26px]">
      <img
        src="https://cdn.pixabay.com/photo/2017/06/14/17/41/galaxy-s8-2402805_1280.jpg"
        alt="Product image"
        className="rounded-lg h-full"
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
      <div className="py-6 flex flex-col justify-between items-start pr-6 gap-3">
        <div>
          <div className="text-lg font-bold">{formatMoney(product.price)}</div>
          <div
            className={twMerge(
              "text-sm font-semibold text-grayText",
              product.discount ? "line-through" : "none",
            )}
          >
            {product.discount &&
              calculateOriginalPrice(product.price, product.discount)}
          </div>
        </div>
        <div className="text-sm text-grayText">Delivery in 1 day</div>
        <div className="flex flex-col gap-2">
          <Button
            color={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
            className="w-[164px] flex gap-2"
            onClick={() => goToPDP(product._id)}
          >
            <span>Product Detail</span>
            <img src="/vector-button.svg" alt="Vector right for button" />
          </Button>
          <Button
            color={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            className="flex gap-1"
            onClick={updateWishList}
          >
            <WishListIcon isInWishList={isInWishList as boolean} />
            <span>{isInWishList ? "Product added" : "Add to wish list"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
