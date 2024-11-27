import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";
import { PALETTE } from "../../main/constants/palette";

interface Props {
  page: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

export const PaginationController = ({
  page,
  onPageChange,
  totalPages,
}: Props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(page);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    onPageChange(value);
  };

  return (
    <div className="flex items-center gap-3">
      <Typography>Page:</Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        hidePrevButton
        hideNextButton
        classes={{ root: classes.root }}
      />
    </div>
  );
};

const useStyles = makeStyles(() => {
  return {
    root: {
      "& .MuiPaginationItem-root.Mui-selected": {
        backgroundColor: "white",
        color: PALETTE.neutralGreenBg,
        fontWeight: "bold",
      },
    },
  };
});
