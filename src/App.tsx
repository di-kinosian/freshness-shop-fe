import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main/main-page";
import { Checkout } from "./pages/Checkout/checkout-page";
import { Layout } from "./components/Layout/Layout";
import { ThemeProvider } from "@mui/styles";
import { theme } from "./config/theme";
import { ProductDetails } from "./pages/ProductDetails/product-details-page";
import { ROUTES } from "./constants/routes-constants";
import "./App.css";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
}

export default App;
