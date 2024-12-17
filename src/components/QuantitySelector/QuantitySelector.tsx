import { IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { PALETTE } from "../../main/constants/palette";

interface Props {
  quantity: number;
  handleDecreaseQuantity: () => void;
  handleIncreaseQuantity: () => void;
}

export const QuantitySelector = ({
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  quantity,
}: Props) => (
  <div className="flex gap-3">
    <IconButton sx={{ padding: 0 }} onClick={handleDecreaseQuantity}>
      <RemoveCircleOutlineIcon sx={{ color: PALETTE.neutralGreenBg }} />
    </IconButton>
    <div>{quantity}</div>
    <AddCircleOutlineIcon
      onClick={handleIncreaseQuantity}
      sx={{ color: PALETTE.neutralGreenBg }}
    />
  </div>
);
