export const ProductDetailPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-16 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-10">
        <ImageGallerySkeleton />
        <div className="flex flex-col gap-12 items-start">
          <div className="flex flex-col gap-4 w-full">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="flex items-center gap-4">
              <div className="h-6 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
          <div className="h-20 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="p-4 border border-gray-300 rounded-2xl flex sm:flex-row md:flex-col lg:flex-row md:items-start md:gap-4 justify-between lg:w-full sm:w-full md:w-full">
            <div>
              <div className="h-8 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mt-2"></div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-[170px]">
                <div className="flex items-center">
                  <div className="h-10 bg-gray-300 rounded w-[35px]"></div>
                  <div className="h-8 bg-gray-300 rounded w-[85px] ml-4"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-300 rounded w-[120px]"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-[200px]"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
      <div className="h-64 bg-gray-300 rounded w-full"></div>
    </div>
  );
};

export const ImageGallerySkeleton = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col gap-2">
        <div className="h-80 bg-gray-300 rounded-xl"></div>
        <div className="flex justify-between mt-4">
          {[...Array(3)].map((_, index) => (
            <div
              className="h-32 sm:w-[160px] bg-gray-300 rounded-xl w-1/5"
              key={index}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
