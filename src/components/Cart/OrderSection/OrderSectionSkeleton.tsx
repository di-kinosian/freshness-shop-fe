export const OrderSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border border-basicGray rounded-lg w-full h-fit animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      {[...Array(3)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full pb-4 border-b border-separator grid grid-cols-[1fr,2fr,1fr] gap-2 animate-pulse">
      <div className="w-full flex justify-center">
        <div className="bg-gray-300 rounded-md max-h-[100px] w-full h-[100px]"></div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-3 w-full rounded"></div>
        <div className="bg-gray-300 h-5 w-1/2 rounded"></div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
        <div className="bg-gray-300 h-8 w-16 rounded"></div>
      </div>
    </div>
  );
};