const SkeletonWorkerCard = () => {
  return (
    <div className="border border-violet-200 rounded-lg overflow-hidden shadow bg-white animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
}

export default SkeletonWorkerCard;