import React, { ReactNode } from "react";
import { MainHeader } from "./MainHeader/MainHeader";
import { Categories } from "./Categories/Categories";
import { Breadcrumbs } from "./Breadcrumbs/Breadcrumbs";
import { Footer } from "./Footer/Footer";
import { useAuth } from "../Auth/useAuth";

interface IProps {
  children: ReactNode;
}

export const Layout: React.FC<IProps> = ({ children }) => {
  useAuth();

  return (
    <div className="mx-auto flex flex-col min-h-screen">
      <div className="h-12 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto h-full">
          <div className="flex gap-5">
            <div className="text-neutralGreenBg cursor-pointer">
              Chat with us
            </div>
            <div>+380932016730</div>
            <div>info@freshness.com</div>
          </div>
          <div className="flex gap-5">
            <div className="text-neutralGreenBg cursor-pointer">Blog</div>
            <div className="text-neutralGreenBg cursor-pointer">About Us</div>
            <div className="text-neutralGreenBg cursor-pointer">Careers</div>
          </div>
        </div>
      </div>
      <MainHeader />
      <Categories />
      <Breadcrumbs />
      <div className="flex flex-col gap-16">
        <div className="flex-grow w-full max-w-[1200px] mx-auto">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};
