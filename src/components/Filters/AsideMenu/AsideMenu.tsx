import { Box, Drawer } from "@mui/material";
import { AsideFilter } from "../AsideFilter";

interface Props {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export const AsideMenu = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Box sx={{ width: 350, padding: "16px 16px" }} role="presentation">
        <AsideFilter inMenu={true} />
      </Box>
    </Drawer>
  );
};
