import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ProductRating } from "../../components/Product/ProductRating";
import { Button } from "../../components/Button/Button";
import { clearProduct } from "../../redux/features/products/productsSlice";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/app/hooks";
import { RelatedProducts } from "../../components/Carousel/RelatedProducts";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { noProductImg } from "../../main/constants/images.constants";
import { ProductParameters } from "./ProductParameters";
import { ProductTabs } from "./ProductTabs/ProductTabs";
import { calculateOriginalPrice, formatMoney } from "../../main/helpers";
import { ControlContainer } from "../../components/ControlContainer/ControlContainer";
import { Select } from "../../components/Select/Select";
import { ControlSize } from "../../main/types/enums";
import { unitOptions } from "../../main/constants/filter.sort.data";
import {
  addToWishList,
  deleteFromWishList,
} from "../../redux/features/auth/authSlise";
import WishListIcon from "../../components/Product/WishList/WishListIcon";
import { twMerge } from "tailwind-merge";
import { getProduct } from "../../redux/features/products/productThunks";
import { selectProduct } from "../../redux/features/products/selectors";
import { selectWishList } from "../../redux/features/auth/selectors";
import { selectCart } from "../../redux/features/cart/selectors";
import { QuantitySelector } from "@components/QuantitySelector/QuantitySelector";
import { addToCart, editQuantity } from "../../redux/features/cart/cartSlice";
import { ProductDetailPageSkeleton } from "./ProductDetailsSkeleton";

export const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const product = useAppSelector(selectProduct);
  const wishList = useAppSelector(selectWishList);
  const cart = useAppSelector(selectCart);
  const addedProduct = cart.find((item) => item.product._id === productId);
  const isInWishList = wishList?.includes(productId as string);

  useEffect(() => {
    if (productId) {
      dispatch(getProduct({ _id: productId }));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [productId, dispatch]);

  const updateWishList = (): void => {
    if (!productId) return;

    if (isInWishList) {
      dispatch(deleteFromWishList({ productId: productId }));
    } else {
      dispatch(addToWishList({ productId: productId }));
    }
  };

  const addProductToCart = (): void => {
    if (productId) {
      dispatch(addToCart({ productId: productId, quantity: 1 }));
    }
  };

  const handleIncreaseQuantity = (): void => {
    if (addedProduct) {
      const newQuantity = addedProduct?.quantity + 1;
      updateQuantity(newQuantity);
    }
  };

  const handleDecreaseQuantity = (): void => {
    if (addedProduct) {
      const newQuantity = addedProduct?.quantity - 1;
      updateQuantity(newQuantity);
    }
  };

  const updateQuantity = (quantity: number): void => {
    if (addedProduct) {
      dispatch(
        editQuantity({
          productId: addedProduct.product._id,
          quantity,
        }),
      );
    }
  };

  if (!product) {
    return <ProductDetailPageSkeleton />;
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-10">
        <ImageGallery images={product.images} noProductImg={noProductImg} />
        <div className="flex flex-col gap-12 items-start">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-black">{product?.title}</h1>
            <div className="flex item-center gap-4">
              <ProductRating value={product?.rating ?? 0} />
              <span className="text-grayText">{`(10 customers reviewed)`}</span>
            </div>
          </div>
          <div>{product?.description}</div>
          <ProductParameters product={product} />
          <div className="p-4 border border-grayBorder rounded-2xl flex flex-col gap-4 sm:flex-row md:flex-col lg:flex-row md:items-start md:gap-4 justify-between w-full">
            <div>
              <div className="text-2xl font-bold text-black">
                {formatMoney(product?.price)}
              </div>
              <div
                className={twMerge(
                  "text-sm font-semibold text-grayText",
                  product.discount ? "line-through" : "none",
                )}
              >
                {product.discount
                  ? calculateOriginalPrice(product?.price, product.discount)
                  : ""}
              </div>
            </div>
            <div className="flex gap-3 items-center justify-between">
              <div className="w-[170px]">
                <ControlContainer
                  size={ControlSize.LARGE}
                  leftElement={
                    <input
                      className="bg-neutralGrayBg outline-0 w-[35px]"
                      placeholder="1"
                    />
                  }
                  rightElement={
                    <div className="w-full px-4">
                      <Select options={unitOptions} width={85} value="pcs" />
                    </div>
                  }
                />
              </div>
              {addedProduct ? (
                <QuantitySelector
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  quantity={addedProduct.quantity || 1}
                />
              ) : (
                <Button onClick={addProductToCart}>+ Add to card</Button>
              )}
            </div>
          </div>
          <Button variant="text" onClick={updateWishList}>
            <div className="font-bold flex gap-1 items-center">
              <WishListIcon isInWishList={isInWishList as boolean} />
              <span>{isInWishList ? "Product added" : "Add to wish list"}</span>
            </div>
          </Button>
          <ProductTabs product={product} />
        </div>
      </div>
      <RelatedProducts />
    </div>
  );
};
