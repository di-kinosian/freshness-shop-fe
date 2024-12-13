import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/app/store";
import { useAppSelector } from "../../redux/app/hooks";
import { useEffect } from "react";
import { Button } from "../Button/Button";
import { ButtonVariant } from "../../main/types/enums";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFromWishList } from "../../redux/features/auth/authSlise";
import { formatMoney } from "../../main/helpers";
import { getWishList } from "../../redux/features/products/productThunks";

interface Props {
  onClose: () => void;
}

export const WishList = ({ onClose }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { wishList, isWishListLoading } = useAppSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  if (isWishListLoading && !wishList.length) {
    return "Loading...";
  }

  const handleDelete = (id: string): void => {
    dispatch(deleteFromWishList({ productId: id })).then(() => {
      dispatch(getWishList());
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3 items-center text-xl">
        <span className="font-bold">Total:</span>
        <div>{wishList.length}</div>
      </div>
      <div className="flex flex-col gap-[34px] items-start">
        {wishList?.map((product) => (
          <div
            key={product._id}
            className="border border-basicGray rounded-lg w-full flex cursor-pointer"
          >
            <img
              src={product.images[0]}
              alt="Product image"
              className="rounded-lg w-[100px]"
            />
            <div className="p-3 flex items-center w-full">
              <div className="flex flex-col content-center gap-2">
                <div>
                  <div className="font-semibold">{product.title}</div>
                  <div className="text-sm text-grayText">
                    {product.description
                      ? product.description.slice(0, 100)
                      : ""}
                  </div>
                </div>
                <div>{formatMoney(product.price)}</div>
              </div>
              <DeleteIcon
                fontSize="small"
                className="ml-auto"
                onClick={() => handleDelete(product._id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 w-full justify-center">
        <Button>Buy now</Button>
        <Button color={ButtonVariant.SECONDARY} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};