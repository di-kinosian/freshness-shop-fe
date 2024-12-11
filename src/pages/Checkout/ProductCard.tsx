import { IconButton, Tooltip } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { PALETTE } from "../../main/constants/palette";

export const ProductCard = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncreaseQuantity = (): void => {
    setQuantity((prev) => (prev = prev + 1));
  };

  const handleDecreaseQuantity = (): void => {
    setQuantity((prev) => (prev = prev - 1));
  };

  return (
    <div className="w-full pb-4 border-b border-neutralGrayBg grid grid-cols-[1fr,2fr,1fr] max-h-[150px]">
      <div className="rounded-md h-[67px] w-[100px] bg-neutralGrayBg"></div>
      <div className="w-full flex flex-col gap-2">
        <div className="text-sm font-semibold">
          Mobile Phone Apple iPhone 14 Pro Max 128GB Gold (MQ9R3)
        </div>
        <div className="text-grayText text-xs">
          Screen (6.7", OLED (Super Retina XDR), 2796x1290) /
        </div>
        <div className="text-sm text-neutralGreenBg font-semibold">
          1,174.75 USD
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <Tooltip title="Delete">
          <DeleteOutlineIcon fontSize="medium" />
        </Tooltip>
        <div className="flex gap-3">
          <IconButton sx={{ padding: 0 }} disabled={quantity === 1}>
            <RemoveCircleOutlineIcon
              onClick={handleDecreaseQuantity}
              sx={{ color: PALETTE.neutralGreenBg }}
            />
          </IconButton>
          <div className="">{quantity}</div>
          <AddCircleOutlineIcon
            onClick={handleIncreaseQuantity}
            sx={{ color: PALETTE.neutralGreenBg }}
          />
        </div>
      </div>
    </div>
  );
};
