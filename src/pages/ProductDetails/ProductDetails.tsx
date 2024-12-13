import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ProductRating } from "../../components/Product/ProductRating";
import { Button } from "../../components/Button/Button";
import { clearProduct } from "../../redux/features/products/productsSlice";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import { RelatedProducts } from "../../components/Carousel/RelatedProducts";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import {
  galleryImages,
  noProductImg,
} from "../../main/constants/images.constants";
import { ProductParameters } from "./ProductParameters";
import { ProductTabs } from "./ProductTabs";
import { calculateOriginalPrice, formatMoney } from "../../main/helpers";
import { ControlContainer } from "../../components/ControlContainer/ControlContainer";
import { Select } from "../../components/Select/Select";
import { ControlSize } from "../../main/types/enums";
import { unitOptions } from "../../main/constants/filter.sort.data";
import {
  addToWishList,
  deleteFromWishList,
} from "../../redux/features/auth/authSlise";
import WishListIcon from "../../components/Product/WishListIcon";
import { twMerge } from "tailwind-merge";
import { getProduct } from "../../redux/features/products/productThunks";

export const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { product } = useAppSelector((state) => state.product);
  const wishList = useAppSelector((state) => state.auth.user?.wishList);

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

  if (!product) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-10">
        <ImageGallery images={galleryImages} noProductImg={noProductImg} />
        <div className="flex flex-col gap-12 items-start">
          <div className="flex flex-col gap-4 h-[50px]">
            <h1 className="text-3xl font-bold text-black">{product?.title}</h1>
            <div className="flex item-center gap-4">
              <ProductRating value={product?.rating ?? 0} />
              <span className="text-grayText">{`(10 customers reviewed)`}</span>
            </div>
          </div>
          <div>{product?.description}</div>
          <ProductParameters product={product} />
          <div className="p-4 border border-grayBorder rounded-2xl flex sm:flex-row md:flex-col lg:flex-row md:items-start md:gap-4 justify-between lg:w-full sm:w-full md:w-full ">
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
                {product.discount &&
                  calculateOriginalPrice(product?.price, product.discount)}
              </div>
            </div>
            <div className="flex gap-3">
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
              <Button>+ Add to card</Button>
            </div>
          </div>
          <Button variant="text" onClick={updateWishList}>
            <div className="font-bold flex gap-1 items-center">
              <WishListIcon isInWishList={isInWishList as boolean} />
              <span>{isInWishList ? "Product added" : "Add to wish list"}</span>
            </div>
          </Button>

          <ProductTabs />
        </div>
      </div>
      <RelatedProducts />
    </div>
  );
};
