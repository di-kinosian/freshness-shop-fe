import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/app/store";
import { useAppSelector } from "../../main/hooks";
import { useEffect } from "react";
import { Button } from "../Button/Button";
import { ButtonVariant } from "../../main/types/enums";
import { deleteFromWishList } from "../../redux/features/auth/authSlise";
import { getWishList } from "../../redux/features/products/productThunks";
import { WishListItem } from "./WishListItem";

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
          <WishListItem
            product={product}
            onDelete={handleDelete}
            key={product._id}
          />
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
