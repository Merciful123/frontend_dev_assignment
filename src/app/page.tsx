"use client";
import Navbar from "@/components/Navbar";
import { memo } from "react";
import { useWorkers } from "@/hooks/useWorkers";
import WorkerGrid from "@/components/WorkerGrid";
import SkeletonWorkerCard from "@/components/SkeletonWorkerCard";
import WorkersFilter from "@/components/WorkersFilter";
import Pagination from "@/components/Pagination";
import { useWorkersFilter } from "@/hooks/useWorkersFilter";

// Memoized skeleton grid component

const SkeletonGrid = memo(function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <SkeletonWorkerCard key={index} />
      ))}
    </div>
  );
});

// Error component

const ErrorMessage = memo(function ErrorMessage({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="text-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-red-600 mb-3">
          <svg
            className="w-12 h-12 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-lg font-semibold mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
});

// Empty state component

// More explicit EmptyState component definition

const EmptyState: React.FC<{ onClearFilters: () => void }> = memo(
  ({ onClearFilters }) => {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No workers found
        </h3>
        <p className="text-gray-500 mb-4">
          Try adjusting your filters to see more results.
        </p>
        <button
          onClick={onClearFilters}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";


export default function WorkersPage() {
  //  Old commented code!!!

  // const [workersData, setWorkersData] = useState<WorkerType[]>([]);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const response = await import("../../workers.json");
  //       setWorkersData(response.default);
  //     } catch (error) {
  //       console.error("Failed to load workers:", error);
  //     }
  //   };
  //   loadData();
  //   loadData();
  // }, []);

  // Use React Query for data fetching with built-in caching

  const { workers, isLoading, error, refresh, isFetching } = useWorkers();

  // Use our new filtering and pagination hook

  const {
    filters,
    paginationInfo,
    paginatedWorkers,
    availableServices,
    updateFilters,
    goToPage,
    totalFilteredCount,
  } = useWorkersFilter(workers);

  const handleClearFilters = () => {
    updateFilters({
      service: "all",
      minPrice: 0,
      maxPrice: 5000,
    });
  };

  // Filter and process workers data

  // const processedWorkers = useMemo(() => {
  //   if (!workers) return [];

  //   return workers
  //     .filter((worker) => worker.pricePerDay > 0)
  //     .filter((worker) => worker.id !== null)
  //     .sort((a, b) => a.name.localeCompare(b.name));
  // }, [workers]);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 bg-violet-50 mt-16 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Our Workers</h1>

          {/* Refresh button with loading state */}

          {!isLoading && !error && (
            <button
              onClick={() => refresh()}
              disabled={isFetching}
              className=" cursor-pointer bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              {isFetching ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </>
              )}
            </button>
          )}
        </div>

        {/* Background fetching indicator */}

        {isFetching && !isLoading && (
          <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-600 text-center">
            Updating workers data...
          </div>
        )}

        {/* Loading State */}

        {isLoading && <SkeletonGrid />}

        {/* Error State */}
        
        {error && <ErrorMessage error={error} onRetry={refresh} />}

        {/* Success State */}
        
        {!isLoading && !error && workers.length > 0 && (
          <>
            {/* Filters */}
        
            <WorkersFilter
              filters={filters}
              availableServices={availableServices}
              totalCount={totalFilteredCount}
              onFiltersChange={updateFilters}
            />

            {/* Results */}
        
            {totalFilteredCount === 0 ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : (
              <>
                <WorkerGrid workers={paginatedWorkers} />
                <Pagination
                  paginationInfo={paginationInfo}
                  onPageChange={goToPage}
                />
              </>
            )}
          </>
        )}

        
        {/* Empty State when no workers at all */}
        
        {!isLoading && !error && workers.length === 0 && (
          <EmptyState onClearFilters={handleClearFilters} />
        )}
      </main>
    </>
  );
}
