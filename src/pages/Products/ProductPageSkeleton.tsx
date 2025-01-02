export const ProductPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-12 animate-pulse">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center max-w-[1200px] w-full mx-auto">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="flex gap-2 items-center">
            <div className="h-6 bg-gray-300 rounded w-8"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
        <div className="w-[270px]">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-300 rounded w-[50px]"></div>
            <div className="h-8 bg-gray-300 rounded w-[170px]"></div>
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-[270px,1fr] lg:grid-cols-[250px,1fr] custom:grid-cols-1 md:grid-cols-1 gap-8 max-w-[1200px] mx-auto w-full">
        <div className="hidden lg:block">
          <div className="flex flex-col gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
            <div className="h-6 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
        <div className="flex flex-col gap-[34px] items-end">
          {[...Array(6)].map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="flex-1">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-[200px] mx-auto"></div>
        <div className="flex gap-2 flex-1 justify-end">
          <div className="h-6 bg-gray-300 rounded w-8"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductItemSkeleton = () => {
  return (
    <div className="border border-basicGray rounded-lg grid grid-cols-[1fr,1fr,1fr] customSm:grid-cols-[240px,2fr,1fr] gap-[26px]">
      <div className="w-full flex items-center justify-center">
        <div className="h-[250px] bg-gray-300 rounded-lg w-full"></div>
      </div>
      <div className="flex flex-col justify-between py-6">
        <div className="flex flex-col items-start gap-2">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="grid grid-[1fr,1fr] gap-x-16 gap-y-1 w-full text-sm">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="grid grid-cols-[1fr,2fr] gap-8">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-6 flex flex-col justify-between items-start pr-6 gap-3">
        <div className="w-full flex flex-col gap-3">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-[164px]"></div>
      </div>
    </div>
  );
};
