import { RootState } from "../../redux/app/store";

interface Route {
  path: string;
  breadcrumb: string | ((state: RootState) => string);
}

export const getProductDetailsRoute = (id: string) =>
  `${ROUTES.PRODUCTS.path}/${id}`;

export const ROUTES: Record<string, Route> = {
  HOME: {
    path: "/",
    breadcrumb: "Homepage",
  },
  PRODUCTS: {
    path: "/products",
    breadcrumb: "All products",
  },
  PRODUCT_DETAILS: {
    path: "/products/:productId",
    breadcrumb: (state: RootState) => state.product.product?.title || "",
  },
  CHECKOUT: {
    path: "/checkout",
    breadcrumb: "Checkout page",
  },
};
