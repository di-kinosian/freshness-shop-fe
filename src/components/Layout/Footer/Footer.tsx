import { footerData } from "./footer.data";
import { Copyright, FooterSection, ProductTags } from "./footer.helpers";

export const Footer = () => (
  <footer className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-4 gap-32">
      <FooterSection footerData={footerData.getInTouch} />
      <FooterSection footerData={footerData.connections} />
      <FooterSection footerData={footerData.earnings} />
      <FooterSection footerData={footerData.account} />
    </div>
    <ProductTags tags={footerData.productTags} />
    <Copyright text={footerData.copyright} />
  </footer>
);
