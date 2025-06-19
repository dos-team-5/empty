/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { Driver } from '@/schema';

export async function getDrivers(
  page: number = 1,
  limit: number = 10
): Promise<{
  success: boolean;
  message: string;
  data?: {
    records: Driver[];
    pagination: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
    };
  };
}> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/drivers`, {
      method: 'GET',
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('Failed to fetch drivers:', result.message);
      return {
        success: false,
        message: result.message ?? 'Failed to fetch driver records.',
      };
    }

    return {
      success: true,
      message: 'Drivers fetched successfully.',
      data: {
        records: result.records,
        pagination: result.pagination,
      },
    };
  } catch (error: any) {
    console.error('Network error while fetching drivers:', error);
    return {
      success: false,
      message: 'A network error occurred while fetching drivers.',
    };
  }
}
