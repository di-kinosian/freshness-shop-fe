export const ProductPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {[...Array(6)].map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </div>
  );
};

export const ProductItemSkeleton = () => {
  return (
    <div className="w-full border border-basicGray rounded-lg grid grid-cols-1 sm:grid-cols-[1fr,2fr,1fr] gap-4 sm:gap-[26px]">
      <div className="w-full flex items-center justify-center">
        <div className="h-[200px] sm:h-[250px] bg-gray-300 rounded-lg w-full"></div>
      </div>
      <div className="flex flex-col justify-between p-4 sm:py-6">
        <div className="flex flex-col items-start gap-2">
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-2/3 sm:w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 sm:h-5 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm w-full">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr,2fr] gap-4 sm:gap-8"
            >
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 sm:py-6 flex flex-col justify-between items-start pr-4 sm:pr-6 gap-2 sm:gap-3">
        <div className="w-full flex flex-col gap-2 sm:gap-3">
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-2/5 sm:w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-full sm:w-[164px]"></div>
      </div>
    </div>
  );
};
