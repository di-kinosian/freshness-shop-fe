import { IconButton, Tooltip } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { PALETTE } from "../../main/constants/palette";
import { Cart } from "../../redux/features/cart/types";
import { formatMoney } from "../../main/helpers";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import {
  deleteFromCart,
  editQuantity,
} from "../../redux/features/cart/cartSlice";
import { useState } from "react";

interface Props {
  productItem: Cart;
}

export const ProductCard = ({ productItem }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(productItem.quantity || 1);

  const handleIncreaseQuantity = (): void => {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity);
    setQuantity(newQuantity);
  };

  const handleDecreaseQuantity = (): void => {
    const newQuantity = quantity - 1;

    if (newQuantity > 0) {
      updateQuantity(newQuantity);
      setQuantity(newQuantity);
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

  return (
    <div className="w-full pb-4 border-b border-separator grid grid-cols-[1fr,2fr,1fr]">
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
          {formatMoney(productItem.product.price)}
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <Tooltip title="Delete">
          <DeleteOutlineIcon fontSize="medium" onClick={deleteProduct} />
        </Tooltip>
        <div className="flex gap-3">
          <IconButton
            sx={{ padding: 0 }}
            disabled={productItem.quantity === 1}
            onClick={handleDecreaseQuantity}
          >
            <RemoveCircleOutlineIcon sx={{ color: PALETTE.neutralGreenBg }} />
          </IconButton>
          <div>{quantity}</div>
          <AddCircleOutlineIcon
            onClick={handleIncreaseQuantity}
            sx={{ color: PALETTE.neutralGreenBg }}
          />
        </div>
      </div>
    </div>
  );
};
