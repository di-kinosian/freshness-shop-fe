import { useKeenSlider } from "keen-slider/react";
import { RelatedProductCard } from "./RelatedProductCard";
import { useAppSelector } from "../../main/hooks";
import { AppDispatch } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRelatedProducts } from "../../redux/features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import {
  getProductDetailsRoute,
  ROUTES,
} from "../../main/constants/routes.constants";
import { formatMoney } from "../../main/helpers";
import { sliderBreakpoints } from "../../main/constants/media.queries.constants";

export const RelatedProducts = () => {
  const navigate = useNavigate();
  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: sliderBreakpoints,
  });
  const { relatedProducts } = useAppSelector((state) => state.product);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRelatedProducts());
  }, []);

  const goToMainPage = (): void => {
    navigate(ROUTES.PRODUCTS.path);
  };

  const goToPDP = (productId: string): void => {
    navigate(getProductDetailsRoute(productId));
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto grid grid-col-[1fr,2fr] gap-10">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Recommended for you</span>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={goToMainPage}
        >
          <span className="font-semibold">More products</span>
          <img
            src="/vector.svg"
            alt="Vector right"
            className="w-2.5 h-2.5 rotate-[270deg]"
          />
        </div>
      </div>
      {relatedProducts.length && (
        <div ref={ref} className="keen-slider flex">
          {relatedProducts.map((product) => (
            <RelatedProductCard
              key={product._id}
              imageURL="https://a.allegroimg.com/s180/11742c/2598a0204fea9692397b52f0e75c/GROVIJ-KOMP-YuTER-I7-64GB-DDR4-RAM-512SSD-WIN10"
              title={product.title}
              description={product.description}
              price={formatMoney(product.price)}
              onClick={() => goToPDP(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
