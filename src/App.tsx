import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Products } from "./pages/Products/Products";
import { Checkout } from "./pages/Checkout/Checkout";
import { ThemeProvider } from "@mui/styles";
import { theme } from "./config/theme";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { ROUTES } from "./main/constants/routes.constants";
import { StyledEngineProvider } from "@mui/material";
import { DialogProvider } from "./components/Dialog/context/DialogContext";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Home } from "./pages/Home/Home";
import { ConfirmationDialogProvider } from "./components/Dialog/context/ConfirmationDialogContext";
import { Layout } from "@components/Layout/Layout";
import { ToastProvider } from "@components/Toast/ToastContext";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastProvider>
              <ConfirmationDialogProvider>
                <DialogProvider>
                  <Router basename="/freshness-shop-fe">
                    <Layout>
                      <Routes>
                        <Route path={ROUTES.HOME.path} element={<Home />} />
                        <Route
                          path={ROUTES.PRODUCTS.path}
                          element={<Products />}
                        />
                        <Route
                          path={ROUTES.PRODUCT_DETAILS.path}
                          element={<ProductDetails />}
                        />
                        <Route
                          path={ROUTES.CHECKOUT.path}
                          element={<Checkout />}
                        />
                      </Routes>
                    </Layout>
                  </Router>
                </DialogProvider>
              </ConfirmationDialogProvider>
            </ToastProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
