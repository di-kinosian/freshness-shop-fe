import { Product } from "@redux/features/products/types";

interface Props {
  product: Product;
}

export const DescriptionTab = ({ product }: Props) => (
  <div>
    <div>The full description of the product</div>
    <br></br>
    {product.description ? (
      <div>{product.fullDescription || product.description}</div>
    ) : (
      <div>The description of this product has not been added yet.</div>
    )}
  </div>
);
