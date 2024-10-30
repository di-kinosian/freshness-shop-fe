import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/Main/main-page";
import { Checkout } from "./pages/Checkout/checkout-page";
import { PDP } from "./pages/PDP/pdp-page";
import { Layout } from "./components/Layout/layout.component";

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/pdp" element={<PDP />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;
