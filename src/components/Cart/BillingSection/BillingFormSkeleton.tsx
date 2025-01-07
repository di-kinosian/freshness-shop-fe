export const BillingFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-16 max-w-[500px] animate-pulse">
      <div className="flex flex-col gap-4">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
        </div>
        <div className="h-24 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
        </div>
        <div className="flex flex-col gap-2">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-10 bg-gray-300 rounded w-[200px]"></div>
      </div>
    </div>
  );
};
