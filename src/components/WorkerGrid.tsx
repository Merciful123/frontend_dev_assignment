"use client";
import { WorkerType } from "@/types/workers";
import { lazy, Suspense } from "react";
import SkeletonWorkerCard from "./SkeletonWorkerCard";

// Lazy load the WorkerCard component

const LazyWorkerCard = lazy(() => import("./WorkerCard"));

interface WorkerGridProps {
  workers: WorkerType[];
}

const WorkerGrid = ({ workers }: WorkerGridProps) => {

    // Filter and sort workers (memoize this operation)

    const processedWorkers = workers
    .filter((worker) => worker.pricePerDay > 0 && worker.id !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {processedWorkers.map((worker) => (
        <Suspense key={worker.id} fallback={<SkeletonWorkerCard />}>
          <LazyWorkerCard worker={worker} />
        </Suspense>
      ))}
    </div>
  );
}

export default WorkerGrid;