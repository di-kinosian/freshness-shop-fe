import { Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { QuantitySelector } from "@components/QuantitySelector/QuantitySelector";
import { Cart } from "@redux/features/cart/types";
import { AppDispatch } from "@redux/app/store";
import { deleteFromCart, editQuantity } from "@redux/features/cart/cartSlice";
import { formatMoney } from "../../../../main/helpers";

interface Props {
  productItem: Cart;
}

export const ProductCard = ({ productItem }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const handleIncreaseQuantity = (): void => {
    const newQuantity = productItem?.quantity + 1;
    updateQuantity(newQuantity);
  };

  const handleDecreaseQuantity = (): void => {
    const newQuantity = productItem?.quantity - 1;
    if (newQuantity > 0) {
      updateQuantity(newQuantity);
    }
  };

  const deleteProduct = (): void => {
    dispatch(deleteFromCart({ productId: productItem.product._id }));
  };

  const updateQuantity = (quantity: number): void => {
    dispatch(
      editQuantity({
        productId: productItem.product._id,
        quantity,
      }),
    );
  };

  const totalPrice = productItem.product.price * (productItem.quantity || 1);

  return (
    <div className="w-full pb-4 border-b border-separator grid grid-cols-[1fr,2fr,1fr] gap-2">
      <div className="w-full flex justify-center">
        <img
          src={productItem.product.images[0]}
          className="rounded-md max-h-[100px] "
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="text-sm font-semibold">{productItem.product.title}</div>
        <div className="text-grayText text-xs">
          {productItem.product.description
            ? productItem.product.description.slice(0, 60)
            : ""}
        </div>
        <div className="text-sm text-neutralGreenBg font-semibold">
          {formatMoney(totalPrice)}
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <Tooltip title="Delete">
          <DeleteOutlineIcon fontSize="medium" onClick={deleteProduct} />
        </Tooltip>
        <QuantitySelector
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          quantity={productItem.quantity || 1}
        />
      </div>
    </div>
  );
};
