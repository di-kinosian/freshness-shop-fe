import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductRating } from "../../components/Product/ProductRating";
import { Button } from "../../components/Button/Button";
import { twMerge } from "tailwind-merge";
import {
  clearProduct,
  getProduct,
} from "../../redux/features/products/productsSlice";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../main/hooks";
import { RelatedProducts } from "../../components/Carousel/RelatedProducts";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";

export const ProductDetails = () => {
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState<string>("Description");
  const dispatch: AppDispatch = useDispatch();
  const { product } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(getProduct({ _id: productId }));
    }
    return () => {
      dispatch(clearProduct());
    };
  }, []);

  if (!product) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-[1fr,1fr] gap-10">
        <ImageGallery
          images={[
            "https://a.allegroimg.com/s180/11742c/2598a0204fea9692397b52f0e75c/GROVIJ-KOMP-YuTER-I7-64GB-DDR4-RAM-512SSD-WIN10",
            "https://a.allegroimg.com/s180/11742c/2598a0204fea9692397b52f0e75c/GROVIJ-KOMP-YuTER-I7-64GB-DDR4-RAM-512SSD-WIN10",
            "https://a.allegroimg.com/s180/11742c/2598a0204fea9692397b52f0e75c/GROVIJ-KOMP-YuTER-I7-64GB-DDR4-RAM-512SSD-WIN10",
            "https://a.allegroimg.com/s180/11742c/2598a0204fea9692397b52f0e75c/GROVIJ-KOMP-YuTER-I7-64GB-DDR4-RAM-512SSD-WIN10",
            "https://a.allegroimg.com/s180/11742c/2598a0204fea9692397b52f0e75c/GROVIJ-KOMP-YuTER-I7-64GB-DDR4-RAM-512SSD-WIN10",
          ]}
        />

        <div className="flex flex-col gap-12 items-start">
          <div className="flex flex-col gap-4 h-[50px]">
            <h1 className="text-3xl font-bold text-black">{product?.title}</h1>
            <div className="flex item-center gap-4">
              <ProductRating value={product?.rating ?? 0} />
              <span className="text-grayText">{`(10 customers reviewed)`}</span>
            </div>
          </div>
          <div>{product?.description}</div>
          <div className="grid grid-cols-[1fr,1fr] gap-x-16 gap-y-4 w-full">
            <div className="grid grid-cols-[1fr,2fr] gap-8">
              <span className="text-grayText">Country</span>
              <span>{product?.country}</span>
            </div>
            <div className="grid grid-cols-[1fr,2fr] gap-8">
              <span className="text-grayText">Category</span>
              <span>{product?.country}</span>
            </div>
            <div className="grid grid-cols-[1fr,2fr] gap-8">
              <span className="text-grayText">Brand</span>
              <span>{product?.brand}</span>
            </div>
            {product?.additionalInformation?.map((item) => (
              <div className="grid grid-cols-[1fr,2fr] gap-8" key={item.key}>
                <div className="text-grayText">{item.key}</div>
                <div className="">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="h-[89px] border border-grayBorder rounded-2xl flex items-center justify-between px-[24px] w-full">
            <div>
              <div className="text-2xl font-bold text-black">{`${product?.price} USD`}</div>
              <div>800 USD</div>
            </div>
            <div className="flex">
              <Button>+ Add to card</Button>
            </div>
          </div>
          <Button variant="text">
            <div className="font-bold flex gap-1 items-center">
              <img src="/like.svg" />
              <span>Add to my wish list</span>
            </div>
          </Button>
          <div className="w-full p-2 flex justify-between border-b border-grayBorder">
            {["Description", "Reviews", "Questions"].map((tab) => (
              <span
                key={tab}
                className={twMerge(
                  "text-xl font-semibold text-black relative cursor-pointer",
                  activeTab === tab ? "text-black" : "text-gray-500",
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-black rounded-full" />
                )}
              </span>
            ))}
          </div>
          <div>
            <div>Hard text for the full description</div>
            <br></br>
            <div>
              We work hard to ensure that the fruit and vegetables we sell are
              fresh and high in quality. If we don’t grow them ourselves, we
              source them from carefully chosen suppliers, preferring to buy
              locally whenever possible.
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts />
    </div>
  );
};
