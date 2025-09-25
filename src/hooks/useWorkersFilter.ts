import { useMemo, useState } from 'react';
import { WorkerType, FilterOptions, PaginationInfo } from '@/types/workers';

export function useWorkersFilter(workers: WorkerType[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    service: 'all',
    minPrice: 0,
    maxPrice: 5000,
    sortBy: 'pricePerDay', // Now matches WorkerType properties
    sortOrder: 'asc',
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 12,
  });

  // Get unique services for filter dropdown

  const availableServices = useMemo(() => {
    const services = Array.from(new Set(workers.map(worker => worker.service)));
    return ['all', ...services].sort();
  }, [workers]);

  // Filter and sort workers - FIXED VERSION
  
  const filteredAndSortedWorkers = useMemo(() => {
    let filtered = workers.filter(worker => 
      worker.pricePerDay > 0 && 
      worker.id !== null
    );

    // Apply service filter
  
    if (filters.service !== 'all') {
      filtered = filtered.filter(worker => worker.service === filters.service);
    }

    // Apply price filter
  
    filtered = filtered.filter(worker => 
      worker.pricePerDay >= filters.minPrice && 
      worker.pricePerDay <= filters.maxPrice
    );

    // Apply sorting - FIXED: Use actual WorkerType properties
  
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      // Handle different sort types
  
      switch (filters.sortBy) {
        case 'pricePerDay':
          aValue = a.pricePerDay;
          bValue = b.pricePerDay;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'service':
          aValue = a.service;
          bValue = b.service;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      // Handle string vs number comparison
  
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
  
        // For numbers
  
        const aNum = aValue as number;
        const bNum = bValue as number;
        return filters.sortOrder === 'asc' 
          ? aNum - bNum
          : bNum - aNum;
      }
    });

    return filtered;
  }, [workers, filters]);

  const paginatedWorkers = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredAndSortedWorkers.slice(startIndex, endIndex);
  }, [filteredAndSortedWorkers, pagination]);

  const paginationInfo: PaginationInfo = useMemo(() => {
    const totalPages = Math.ceil(filteredAndSortedWorkers.length / pagination.itemsPerPage);
    return {
      currentPage: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
      totalItems: filteredAndSortedWorkers.length,
      totalPages,
      hasNextPage: pagination.currentPage < totalPages,
      hasPrevPage: pagination.currentPage > 1,
    };
  }, [filteredAndSortedWorkers, pagination]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const goToPage = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const nextPage = () => {
    if (paginationInfo.hasNextPage) {
      goToPage(paginationInfo.currentPage + 1);
    }
  };

  const prevPage = () => {
    if (paginationInfo.hasPrevPage) {
      goToPage(paginationInfo.currentPage - 1);
    }
  };

  return {
    filters,
    paginationInfo,
    paginatedWorkers,
    availableServices,
    updateFilters,
    goToPage,
    nextPage,
    prevPage,
    totalFilteredCount: filteredAndSortedWorkers.length,
  };
}