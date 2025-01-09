import { Product } from "../../redux/features/products/types";

interface Props {
  product: Product;
}

export const ProductParameters = ({ product }: Props) => (
  <div className="grid grid-cols-[1fr,1fr,1fr,1fr] gap-x-8 gap-y-4 w-full">
    <span className="text-grayText">Country</span>
    <span className="text-right">{product?.country}</span>
    <span className="text-grayText">Category</span>
    <span className="text-right">{product?.country}</span>
    <span className="text-grayText">Brand</span>
    <span className="text-right">{product?.brand}</span>
    {product?.additionalInformation?.map((item) => (
      <>
        <div className="text-grayText">{item.key}</div>
        <div className="text-right">{item.value}</div>
      </>
    ))}
  </div>
);
