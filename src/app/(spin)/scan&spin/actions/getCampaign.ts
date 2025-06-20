/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { SpinnerCampaign } from '@/schema';

export async function getCampaign(id: number): Promise<{
  success: boolean;
  message: string;
  data?: SpinnerCampaign;
}> {
  // Step 1: Fetch the paginated campaign data from the API
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${id}`,
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
      data: result.campaign as SpinnerCampaign,
    };
  } catch (error: any) {
    console.error('Network error while fetching campaigns:', error);
    return {
      success: false,
      message: 'A network error occurred while fetching campaign data.',
    };
  }
}
