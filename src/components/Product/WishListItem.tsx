import { Tooltip } from "@mui/material";
import { formatMoney } from "../../main/helpers";
import { Product } from "../../redux/features/products/types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Props {
  product: Product;
  onDelete: (id: string) => void;
}

export const WishListItem = ({ product, onDelete }: Props) => (
  <div className="w-full pb-4 border-b border-separator grid grid-cols-[1fr,2fr,1fr]">
    <div className="w-full flex justify-center">
      <img src={product.images[0]} className="rounded-md max-h-[100px] " />
    </div>
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm font-semibold">{product.title}</div>
      <div className="text-grayText text-xs">
        {product.description ? product.description.slice(0, 60) : ""}
      </div>
      <div className="text-sm text-neutralGreenBg font-semibold">
        {formatMoney(product.price)}
      </div>
    </div>
    <div className="flex flex-col justify-between items-end">
      <Tooltip title="Delete">
        <DeleteOutlineIcon
          fontSize="medium"
          onClick={() => onDelete(product._id)}
        />
      </Tooltip>
    </div>
  </div>
);
