import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlise";
import productsReducer from "../features/products/productsSlice";
import filtersReducer from "../features/filters/filtersSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import contriesReducer from "../features/countries/countriesSlice";
import cartReducer from "../features/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};

const persisteAuthReducer = persistReducer(persistConfig, authReducer);
const persisteFiltersReducer = persistReducer(
  {
    key: "filters",
    storage,
  },
  filtersReducer,
);
const persisteCategoriesReducer = persistReducer(
  {
    key: "categories",
    storage,
  },
  categoriesReducer,
);

const store = configureStore({
  reducer: {
    auth: persisteAuthReducer,
    categories: persisteCategoriesReducer,
    filters: persisteFiltersReducer,
    product: productsReducer,
    cart: cartReducer,
    countries: contriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
