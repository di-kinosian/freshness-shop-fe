import React, { ReactNode } from "react";
import { MainHeader } from "../MainHeader/main-header.component";
import { Categories } from "../Categories/categories.component";
import { Sreadcrumbs } from "../Breadcrumbs/breadcrumbs.component";
import { Footer } from "../Footer/footer.component";

interface ILayout {
  children: ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="w-full px-[45px] mx-auto flex flex-col min-h-screen">
      <div className="h-[48px] px-[45px] flex items-center justify-between border-b border-style: solid border-gray-200">
        <div className="flex gap-5">
          <div className="text-linkGreen cursor-pointer">Chat with us</div>
          <div>+380932016730</div>
          <div>info@freshness.com</div>
        </div>
        <div className="flex gap-5">
          <div className="text-linkGreen cursor-pointer">Blog</div>
          <div className="text-linkGreen cursor-pointer">About Us</div>
          <div className="text-linkGreen cursor-pointer">Careers</div>
        </div>
      </div>
      <MainHeader />
      <Categories />
      <Sreadcrumbs />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
