"use client";
import { FilterOptions } from '@/types/workers';
import { memo } from 'react';

interface WorkersFilterProps {
  filters: FilterOptions;
  availableServices: string[];
  totalCount: number;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
}

const WorkersFilter = memo(function WorkersFilter({ 
  filters, 
  availableServices, 
  onFiltersChange 
}: WorkersFilterProps) {
  const priceRange = [0, 1000, 2000, 3000, 4000, 5000];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
       
        {/* Service Filter */}
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            value={filters.service}
            onChange={(e) => onFiltersChange({ service: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
          >
            {availableServices.map(service => (
              <option key={service} value={service}>
                {service === 'all' ? 'All Services' : service}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price Filter */}
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price (₹/day)
          </label>
          <select
            value={filters.minPrice}
            onChange={(e) => onFiltersChange({ minPrice: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
          >
            {priceRange.map(price => (
              <option key={`min-${price}`} value={price}>
                ₹{price}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price Filter */}
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price (₹/day)
          </label>
          <select
            value={filters.maxPrice}
            onChange={(e) => onFiltersChange({ maxPrice: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
          >
            {priceRange.map(price => (
              <option key={`max-${price}`} value={price}>
                ₹{price}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options - FIXED: Use exact type matching */}
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="flex gap-2">
            <select
              value={filters.sortBy}
              onChange={(e) => {
       
                // Ensure the value matches the exact type
       
                const sortByValue = e.target.value as 'name' | 'pricePerDay' | 'service';
                onFiltersChange({ sortBy: sortByValue });
              }}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
            >
              <option value="name">Name</option>
              <option value="pricePerDay">Price</option> {/* Must be pricePerDay */}
              <option value="service">Service</option>
            </select>
            <button
              onClick={() => onFiltersChange({ 
                sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
              })}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              title={filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
});

export default WorkersFilter;