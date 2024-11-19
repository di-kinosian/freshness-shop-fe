import { ButtonSize, ButtonVariant } from "../../main/types/enums";
import { AdditionalInfoType } from "../../main/types/types";
import { Button } from "../Button/Button";

interface Props {
  title: string;
  description: string;
  rating?: number;
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
    <div className="border border-basicGray rounded-lg grid grid-cols-[220px,2fr,1fr] gap-[26px] h-[220px]">
      <div className="bg-basicGray rounded-lg"></div>
      <div className="flex flex-col justify-between py-6">
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-gray-500 text-sm text-left">{description}</span>
        </div>
        <div className="flex flex-col items-start gap-[6px]">
          {additionalInformation?.map((item) => (
            <div
              className="text-sm flex justify-between w-[170px]"
              key={item.key}
            >
              <div>{item.key}</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
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
          <Button color={ButtonVariant.SECONDARY} size={ButtonSize.SMALL}>
            Add to wish list
          </Button>
        </div>
      </div>
    </div>
  );
};
