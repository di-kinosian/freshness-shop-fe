export const WishListSkeleton = () => (
  <div className="min-w-[600px] pb-4 border-b border-separator grid grid-cols-[1fr,2fr,1fr] gap-2 animate-pulse">
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
    </div>
  </div>
);
