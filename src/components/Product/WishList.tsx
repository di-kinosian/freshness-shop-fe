import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/app/store";
import { useAppSelector } from "../../main/hooks";
import { getWishList } from "../../redux/features/products/productsSlice";
import { useEffect } from "react";
import { Button } from "../Button/Button";
import { ButtonVariant } from "../../main/types/enums";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFromWishList } from "../../redux/features/auth/authSlise";

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

  if (isWishListLoading) {
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
              src="https://cdn.pixabay.com/photo/2017/06/14/17/41/galaxy-s8-2402805_1280.jpg"
              alt="Product image"
              className="rounded-lg w-[80px] h-[73px]"
            />
            <div className="p-3 flex items-center w-full">
              <div className="flex flex-col content-center">
                <div className="font-semibold">{product.title}</div>
                <div className="text-sm text-grayText">
                  {product.description}
                </div>
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
          Cansel
        </Button>
      </div>
    </div>
  );
};
