import React, { ReactNode } from "react";
import { MainHeader } from "../MainHeader/MainHeader";
import { Categories } from "../Categories/Categories";
import { Sreadcrumbs } from "../Breadcrumbs/Breadcrumbs";

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
      <div className="max-h-[556px] flex-col gap-8">Footer</div>
    </div>
  );
};
