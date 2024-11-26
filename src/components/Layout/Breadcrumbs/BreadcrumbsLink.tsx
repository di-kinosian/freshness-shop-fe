import { useNavigate } from "react-router-dom";
import LinkMUI from "@mui/material/Link";
import { BreadcrumbType } from "./types";

export const BreadcrumbLink = ({
  breadcrumbText,
  pathname,
}: BreadcrumbType) => {
  const navigate = useNavigate();
  const onNavigate: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    navigate(pathname);
  };

  return (
    <LinkMUI
      underline="hover"
      color="inherit"
      href={pathname}
      onClick={onNavigate}
    >
      {breadcrumbText}
    </LinkMUI>
  );
};
