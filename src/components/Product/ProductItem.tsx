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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Tooltip } from "@mui/material";
import { addToCart, editQuantity } from "../../redux/features/cart/cartSlice";
import { QuantitySelector } from "@components/QuantitySelector/QuantitySelector";

interface Props {
  product: Product;
  isInCart: boolean;
  wishList?: string[];
  cartProduct?: { product: Product; quantity: number };
}

export const ProductItem: React.FC<Props> = ({
  product,
  wishList,
  isInCart,
  cartProduct,
}) => {
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

  const addProductToCart = (): void => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const goToPDP = (productId: string): void => {
    navigate(getProductDetailsRoute(productId));
  };

  const handleIncreaseQuantity = (): void => {
    if (cartProduct) {
      const newQuantity = cartProduct.quantity + 1;
      updateQuantity(newQuantity);
    }
  };

  const handleDecreaseQuantity = (): void => {
    if (cartProduct) {
      const newQuantity = cartProduct.quantity - 1;
      if (newQuantity > 0) {
        updateQuantity(newQuantity);
      }
    }
  };

  const updateQuantity = (quantity: number): void => {
    if (cartProduct) {
      dispatch(
        editQuantity({
          productId: cartProduct.product._id,
          quantity,
        }),
      );
    }
  };

  return (
    <div className="border border-basicGray rounded-lg grid grid-cols-1 customSm:grid-cols-[240px,2fr,1fr] gap-4 sm:gap-[26px] p-4 w-full">
      <div
        className="w-full flex items-center justify-center"
        onClick={() => goToPDP(product._id)}
      >
        <img
          src={product.images[0]}
          alt="Product image"
          className="rounded-lg max-h-[200px] sm:max-h-[250px] object-contain"
        />
      </div>
      <div
        className="flex flex-col justify-between py-4 sm:py-6 gap-4"
        onClick={() => goToPDP(product._id)}
      >
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-md sm:text-lg font-semibold">{product.title}</h3>
          <span className="text-grayText text-sm text-left">
            {product.description ? product.description.slice(0, 60) : ""}
          </span>
          <ProductRating value={product?.rating ?? 0} size="small" />
        </div>
        <div className="hidden mobileSm:grid gap-x-8 gap-y-2 text-sm w-full">
          <div className="grid grid-cols-2">
            <span className="text-grayText">Country</span>
            <span className="text-gray-600">{product?.country}</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-grayText">Brand</span>
            <span className="text-gray-600">{product?.brand}</span>
          </div>
          {product?.additionalInformation?.slice(2, 3).map((item) => (
            <div className="grid grid-cols-2" key={item.key}>
              <span className="text-grayText">{item.key}</span>
              <span className="text-gray-600">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between items-start gap-4 py-4 sm:py-6">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center w-full">
            <div className="text-md sm:text-lg font-bold">
              {formatMoney(product.price)}
            </div>
            {isInWishList ? (
              <Tooltip title="Delete from wish list">
                <FavoriteIcon fontSize="medium" onClick={updateWishList} />
              </Tooltip>
            ) : (
              <Tooltip title="Add to wish list">
                <FavoriteBorderIcon
                  fontSize="medium"
                  onClick={updateWishList}
                />
              </Tooltip>
            )}
          </div>
          {product.discount ? (
            <div className="text-sm font-semibold text-grayText line-through">
              {calculateOriginalPrice(product.price, product.discount)}
            </div>
          ) : null}
          <div className="text-sm text-grayText">Delivery in 1 day</div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {isInCart ? (
            <QuantitySelector
              quantity={cartProduct?.quantity || 1}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />
          ) : (
            <Button
              color={ButtonVariant.PRIMARY}
              size={ButtonSize.MEDIUM}
              className="w-full sm:w-[164px] flex gap-2"
              onClick={addProductToCart}
            >
              <span>Add to cart</span>
              <span>+</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
