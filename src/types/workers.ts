export interface WorkerType {
  id: number;
  name: string;
  service: string;
  pricePerDay: number;
  image: string;
}

export interface ApiResponse {
  success: boolean;
  data: WorkerType[];
  timestamp?: string;
  error?: string;
}

export interface FilterOptions {
  service: string;
  minPrice: number;
  maxPrice: number;
  sortBy: "name" | "pricePerDay" | "service";
  sortOrder: "asc" | "desc";
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
