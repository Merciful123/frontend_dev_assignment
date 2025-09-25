import { useQuery } from '@tanstack/react-query';

import { fetchWorkers } from '@/app/api/services/workersApi';

export function useWorkers() {
  const {
    data: workers = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['workers'],
    queryFn: fetchWorkers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  return {
    workers,
    isLoading,
    isFetching,
    error: error instanceof Error ? error.message : null,
    refresh: refetch,
  };
}