import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/app/store";
import { useAppSelector } from "../../../redux/app/hooks";
import { useEffect, useState } from "react";
import { Button } from "../../Button/Button";
import { ButtonVariant } from "../../../main/types/enums";
import { deleteFromWishList } from "../../../redux/features/auth/authSlise";
import { getWishList } from "../../../redux/features/products/productThunks";
import { WishListItem } from "./WishListItem";
import { addToCart } from "@redux/features/cart/cartSlice";
import { WishListSkeleton } from "./WishListSkeleton";
import { formatMoney } from "../../../main/helpers";

interface Props {
  onClose: () => void;
  goToCart: () => void;
  goToMainPage: () => void;
}

export const WishList = ({ onClose, goToCart, goToMainPage }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { wishList, isWishListLoading } = useAppSelector(
    (state) => state.product,
  );
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const result = wishList.reduce((acc, product) => {
      return (acc = acc + product.price);
    }, 0);
    setTotal(result);
  }, [wishList]);

  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  if (isWishListLoading && !wishList.length) {
    return (
      <>
        {[...Array(5)].map(() => (
          <WishListSkeleton />
        ))}
      </>
    );
  }

  const handleDelete = (id: string): void => {
    dispatch(deleteFromWishList({ productId: id })).then(() => {
      dispatch(getWishList());
    });
  };

  const addProductToCart = async () => {
    await wishList.map((product) => {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
      dispatch(deleteFromWishList({ productId: product._id })).then(() => {
        dispatch(getWishList());
      });
    });
    onClose();
    goToCart();
  };

  const goToProductsPage = (): void => {
    onClose();
    goToMainPage();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-[34px] items-start">
        {wishList.length ? (
          wishList?.map((product) => {
            return (
              <WishListItem
                product={product}
                onDelete={handleDelete}
                key={product._id}
              />
            );
          })
        ) : (
          <div className="flex flex-col gap-3 text-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-download-in-svg-png-gif-file-formats--online-shop-store-shopping-site-marketplace-states-pack-windows-interface-illustrations-9824480.png"
              alt="Empty Cart"
              className="w-32 h-32 mx-auto"
            />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              Your wish list is empty
            </h1>
            <p className="mt-2 text-gray-600">
              It looks like you haven’t added anything to your wish list yet.
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <span className="font-bold">Total price:</span>
        <span className="text-neutralGreenBg font-bold">
          {formatMoney(total)}
        </span>
      </div>
      <div className="flex gap-3 w-full justify-center">
        {wishList.length ? (
          <Button onClick={addProductToCart}>Buy now</Button>
        ) : (
          <Button onClick={goToProductsPage}>Go to products</Button>
        )}
        <Button color={ButtonVariant.SECONDARY} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
