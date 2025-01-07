import { Product } from "../../redux/features/products/types";

interface Props {
  product: Product;
}

export const ProductParameters = ({ product }: Props) => (
  <>
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
          <div>{item.value}</div>
        </div>
      ))}
    </div>
  </>
);
