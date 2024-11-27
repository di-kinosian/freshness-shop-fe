import { matchPath, useLocation } from "react-router-dom";
import { ROUTES } from "../../../main/constants/routes.constants";
import { useAppSelector } from "../../../main/hooks";
import Typography from "@mui/material/Typography";
import BreadcrumbsMUI from "@mui/material/Breadcrumbs";
import { useMemo } from "react";
import { BreadcrumbType } from "./types";
import { BreadcrumbLink } from "./BreadcrumbsLink";

export const Breadcrumbs = () => {
  const location = useLocation();
  const state = useAppSelector((state) => state);

  const breadcrumbs = useMemo<BreadcrumbType[]>(() => {
    const parts = location.pathname.split("/");

    return parts.map<BreadcrumbType>((_, index) => {
      const pathname = index === 0 ? "/" : parts.slice(0, index + 1).join("/");
      const route = Object.values(ROUTES).find((r) =>
        matchPath(r.path, pathname),
      );

      return {
        breadcrumbText:
          typeof route?.breadcrumb === "function"
            ? route?.breadcrumb(state)
            : route?.breadcrumb || "",
        pathname: pathname,
      };
    });
  }, [state, location]);

  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="h-12 flex items-center w-full max-w-[1200px] mx-auto">
      <BreadcrumbsMUI aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = breadcrumbs.length === index + 1;

          return isLast ? (
            <Typography
              sx={{ color: "text.primary" }}
              key={breadcrumb.pathname}
            >
              {breadcrumb.breadcrumbText}
            </Typography>
          ) : (
            <BreadcrumbLink key={breadcrumb.pathname} {...breadcrumb} />
          );
        })}
      </BreadcrumbsMUI>
    </div>
  );
};
