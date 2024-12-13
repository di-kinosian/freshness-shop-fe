import { formatMoney } from "../../main/helpers";
import { Product } from "../../redux/features/products/types";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  product: Product;
  onDelete: (id: string) => void;
}

export const WishListItem = ({ product, onDelete }: Props) => {
  return (
    <div
      key={product._id}
      className="border border-basicGray rounded-lg w-full flex cursor-pointer"
    >
      <img
        src="https://cdn.pixabay.com/photo/2017/06/14/17/41/galaxy-s8-2402805_1280.jpg"
        alt="Product image"
        className="rounded-lg w-[100px]"
      />
      <div className="p-3 flex items-center w-full">
        <div className="flex flex-col content-center gap-2">
          <div>
            <div className="font-semibold">{product.title}</div>
            <div className="text-sm text-grayText">{product.description}</div>
          </div>
          <div>{formatMoney(product.price)}</div>
        </div>
        <DeleteIcon
          fontSize="small"
          className="ml-auto"
          onClick={() => onDelete(product._id)}
        />
      </div>
    </div>
  );
};
