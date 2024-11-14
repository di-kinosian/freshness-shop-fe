import { ButtonSize, ButtonVariant } from "../../main/types/enums";
import { Button } from "../Button/Button";

export interface AdditionalInfoType {
  key: string;
  value: string | number;
}

interface Props {
  title: string;
  description: string;
  raiting?: number;
  price: number;
  additionalInformation?: AdditionalInfoType[] | null;
}

export const ProductItem: React.FC<Props> = ({
  title,
  description,
  additionalInformation,
  price,
}) => {
  return (
    <div className="border border-basicGray rounded-lg grid grid-cols-[220px_250px_200px] gap-[26px] h-[220px]">
      {/* Image Section */}
      <div className="bg-basicGray rounded-lg"></div>
      {/* Second Section */}
      <div className="flex flex-col justify-between py-6">
        {/* Title and Description */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-gray-500 text-sm text-left">{description}</span>
        </div>
        {/* Product information will replace on map */}
        <div className="flex flex-col items-start gap-[6px]">
          {/* <p className="text-sm">
            Freshness: <span className="text-green-500">New (Extra fresh)</span>
          </p>
          <p className="text-sm">
            Farm: <span className="text-gray-700">Grocery Tarm Fields</span>
          </p>
          <p className="text-sm">
            Delivery: <span className="text-gray-700">Europe</span>
          </p>
          <p className="text-sm">
            Stock: <span className="text-green-500">320 pcs</span>
          </p> */}

          {additionalInformation?.map((item) => (
            <div className="text-sm flex justify-between w-[170px]">
              <div>{item.key}</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Third Section */}
      <div className="py-6 flex flex-col justify-between items-start pr-6">
        <div className="text-lg font-bold">{`${price} USD`}</div>
        <div className="flex flex-col gap-2">
          <Button
            color={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
            className="w-[164px]"
          >
            Product Detail
          </Button>
          <Button color={ButtonVariant.SECONDARY} size={ButtonSize.MEDIUM}>
            Add to wish list
          </Button>
        </div>
      </div>
    </div>
  );
};
