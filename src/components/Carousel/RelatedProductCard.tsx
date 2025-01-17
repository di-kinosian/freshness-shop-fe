import { ButtonSize } from "../../main/types/enums";
import { Button } from "../Button/Button";
import "keen-slider/keen-slider.min.css";

interface Props {
  imageURL: string;
  title: string;
  description: string;
  price: string;
  onClick: () => void;
}

export const RelatedProductCard = ({
  imageURL,
  title,
  description,
  price,
  onClick,
}: Props) => (
  <div
    className="grid grid-col-[2fr,1fr,1fr] gap-6 keen-slider__slide cursor-pointer"
    style={{ pointerEvents: "all" }}
    onClick={onClick}
  >
    <img
      src={imageURL}
      alt="Related img for product"
      className="h-[180px] rounded-2xl"
    />
    <div className="flex flex-col gap-2.5">
      <span className="font-semibold text-base">{title}</span>
      <span className="text-sm text-gray-500">{description ? description.slice(0,60) : ''}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="font-bold text-xl">{price}</span>
      <Button size={ButtonSize.SMALL} >
        Buy now
      </Button>
    </div>
  </div>
);
