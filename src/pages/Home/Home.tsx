import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../main/constants/routes.constants";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.PRODUCTS.path);
  }, [navigate]);

  return null;
};
