export const ProductPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-12 animate-pulse">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-[1200px] w-full mx-auto gap-4">
          <div className="h-6 sm:h-8 bg-gray-300 rounded w-1/2 sm:w-1/4"></div>
          <div className="flex gap-2 items-center">
            <div className="h-5 sm:h-6 bg-gray-300 rounded w-6 sm:w-8"></div>
            <div className="h-5 sm:h-6 bg-gray-300 rounded w-12 sm:w-16"></div>
          </div>
        </div>
        <div className="w-full sm:w-[270px]">
          <div className="flex justify-between items-center">
            <div className="h-5 sm:h-6 bg-gray-300 rounded w-[40px] sm:w-[50px]"></div>
            <div className="h-6 sm:h-8 bg-gray-300 rounded w-[120px] sm:w-[170px]"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-[270px,1fr] max-w-full sm:max-w-[1200px] mx-auto w-full">
        <div className="hidden sm:block">
          <div className="flex flex-col gap-4 sm:gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="h-5 sm:h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-6 sm:h-8 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
            <div className="h-5 sm:h-6 bg-gray-300 rounded w-16 sm:w-20"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-[34px] items-center sm:items-end">
          {[...Array(6)].map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full items-center gap-4">
        <div className="w-full sm:flex-1">
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-1/2 sm:w-1/3"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-full sm:w-[200px] mx-auto"></div>
        <div className="flex gap-2 w-full sm:w-auto sm:flex-1 justify-center sm:justify-end">
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-6 sm:w-8"></div>
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-12 sm:w-16"></div>
        </div>
      </div>
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
            <div key={index} className="grid grid-cols-[1fr,2fr] gap-4 sm:gap-8">
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
