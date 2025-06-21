/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { NewSpinnerCampaign } from '@/schema';
import { cookies } from 'next/headers';

export async function getAllCampaigns(
  page = 1,
  limit = 10
): Promise<{
  success: boolean;
  message: string;
  data?: {
    records: NewSpinnerCampaign[];
    pagination: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
    };
  };
}> {
  // Step 1: Fetch the paginated campaign data from the API
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns?page=${page}&limit=${limit}`
    );
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', limit.toString());

    // 2. Get the cookie store from the incoming request
    const cookieStore = await cookies();

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        // 3. Pass the cookies in the 'Cookie' header of the fetch request
        Cookie: cookieStore.toString(),
      },
      // It's often good practice to disable caching for authenticated requests
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch campaigns:', result.message);
      return {
        success: false,
        message: result.message ?? 'Failed to fetch campaigns from server.',
      };
    }

    return {
      success: true,
      message: 'Campaigns fetched successfully.',
      data: {
        records: result.records,
        pagination: result.pagination,
      },
    };
  } catch (error: any) {
    console.error('Network error while fetching campaigns:', error);
    return {
      success: false,
      message: 'A network error occurred while fetching campaign data.',
    };
  }
}
