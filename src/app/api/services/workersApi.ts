import { WorkerType } from '@/types/workers';

export interface ApiResponse {
  success: boolean;
  data: WorkerType[];
  timestamp?: string;
  error?: string;
}

export async function fetchWorkers(): Promise<WorkerType[]> {
  const response = await fetch('/api/workers', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workers: ${response.status}`);
  }

  const result: ApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Unknown error occurred');
  }

  return result.data;
}