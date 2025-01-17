import React from "react";

export type FooterData = {
  title: string;
  links: string[];
};

export const FooterSection: React.FC<{ footerData: FooterData }> = ({
  footerData,
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-black">
      {footerData.title}
    </h3>
    <ul className="space-y-2">
      {footerData.links.map((link, index) => (
        <li key={index}>
          <span className="text-neutralGreenBg hover:underline">{link}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const ProductTags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-black">Product tags</h3>
    <div className="flex flex-wrap gap-4 font-semibold">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-tagsGray text-gray-700 px-[14px] py-[4px] rounded-[12px] text-sm cursor-pointer"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export const Copyright: React.FC<{ text: string }> = ({ text }) => (
  <span className="text-gray-600">{text}</span>
);
