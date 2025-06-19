/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { NewSpinnerCampaign } from '@/schema';

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns?page=${page}&limit=${limit}`,
      {
        method: 'GET',
      }
    );

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
