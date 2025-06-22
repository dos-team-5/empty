/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { Driver } from '@/schema';
import { cookies } from 'next/headers'; // 1. Import the cookies function from next/headers

export async function getDriversAll(
  page: number = 1,
  limit: number = 10
): Promise<{
  success: boolean;
  message: string;
  data?: Driver[];
}> {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/drivers/all-data`
    );
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', limit.toString());

    // 2. Get the cookie store from the incoming request
    const cookieStore = await cookies();

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        // 3. Pass the cookies in the 'Cookie' header of the fetch request
        Cookie: cookieStore.toString(),
      },
      // It's often good practice to disable caching for authenticated requests
      cache: 'no-store',
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
      data: result.drivers,
    };
  } catch (error: any) {
    console.error('Network error while fetching drivers:', error);
    return {
      success: false,
      message: 'A network error occurred while fetching drivers.',
    };
  }
}
