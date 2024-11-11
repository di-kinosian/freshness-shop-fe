import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main/main-page";
import { Checkout } from "./pages/Checkout/checkout-page";
import { Layout } from "./components/Layout/Layout";
import { ThemeProvider } from "@mui/styles";
import { theme } from "./config/theme";
import { ProductDetails } from "./pages/ProductDetails/product-details-page";
import { ROUTES } from "./main/constants/routes-constants";
import { StyledEngineProvider } from "@mui/material";
import { DialogProvider } from "./components/Dialog/DialogContext";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import { ToastProvider } from "./components/Toast/ToastContext";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ToastProvider>
            <DialogProvider>
              <Layout>
                <Router>
                  <Routes>
                    <Route path={ROUTES.HOME} element={<Main />} />
                    <Route
                      path={ROUTES.PRODUCT_DETAILS}
                      element={<ProductDetails />}
                    />
                    <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                  </Routes>
                </Router>
              </Layout>
            </DialogProvider>
          </ToastProvider>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
