import React from "react";

export const OrderCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-12 w-full min-h-[300px] mt-12">
      {[...Array(3)].map((_, index) => (
        <div
          className="border rounded-lg px-6 py-4 flex flex-col gap-3 animate-pulse"
          key={index}
        >
          <div className="grid grid-cols-[150px,1fr] gap-6">
            {[...Array(5)].map((_, index) => (
              <React.Fragment key={index}>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
