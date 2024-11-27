import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("Description");

  return (
    <>
      <div className="w-full p-2 flex justify-between border-b border-grayBorder">
        {["Description", "Reviews", "Questions"].map((tab) => (
          <span
            key={tab}
            className={twMerge(
              "text-xl font-semibold text-black relative cursor-pointer",
              activeTab === tab ? "text-black" : "text-gray-500",
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </span>
        ))}
      </div>
      <div>
        <div>Hard text for the full description</div>
        <br></br>
        <div>
          We work hard to ensure that the fruit and vegetables we sell are fresh
          and high in quality. If we don’t grow them ourselves, we source them
          from carefully chosen suppliers, preferring to buy locally whenever
          possible.
        </div>
      </div>
    </>
  );
};
