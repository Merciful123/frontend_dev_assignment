"use client";
import { WorkerType } from "@/types/workers";
import { lazy, Suspense, memo } from "react";
import SkeletonWorkerCard from "./SkeletonWorkerCard";

// Lazy load the WorkerCard component

const LazyWorkerCard = lazy(() => import("./WorkerCard"));

interface WorkerGridProps {
  workers: WorkerType[];
}

const WorkerGrid = memo(function WorkerGrid({ workers }: WorkerGridProps) {
  if (workers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No workers match your current filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {workers.map((worker) => (
        <Suspense key={worker.id} fallback={<SkeletonWorkerCard />}>
          <LazyWorkerCard worker={worker} />
        </Suspense>
      ))}
    </div>
  );
});

WorkerGrid.displayName = 'WorkerGrid';
export default WorkerGrid;