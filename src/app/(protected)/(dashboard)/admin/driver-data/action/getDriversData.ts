/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { Driver } from '@/schema';
import { authOptions } from '@/app/api/auth/[...nextauth]/utils/authOptions';

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
    // Get NextAuth session server-side
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        success: false,
        message: 'Unauthorized: No active session',
      };
    }

    // Grab cookies from Next.js headers
    const cookieStore = cookies();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/drivers?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          // Forward cookies so API can verify session, or
          // alternatively pass Authorization header if using JWT or Bearer token
          Cookie: cookieStore.toString(),
        },
        cache: 'no-store',
      }
    );

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
