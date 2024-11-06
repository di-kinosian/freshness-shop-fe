import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main/main-page";
import { Checkout } from "./pages/Checkout/checkout-page";
import { ProductDetails } from "./pages/ProductDetails/product-details-page";
import { Layout } from "./components/Layout/layout.component";
import { ROUTES } from "./constants/routes-constants";
import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<Main />} />
            <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
            <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;
