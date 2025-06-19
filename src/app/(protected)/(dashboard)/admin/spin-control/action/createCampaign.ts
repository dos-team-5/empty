/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import type { CreateCampaignPayload } from '@/app/api/campaigns/route';
import { SpinnerCampaign } from '@/schema';

export async function createCampaign(data: CreateCampaignPayload): Promise<{
  success: boolean;
  message: string;
  campaign?: SpinnerCampaign; // Replace with Campaign type if available
}> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        cache: 'no-store',
      }
    );

    const result = await res.json();

    if (!res.ok) {
      console.error('Failed to create campaign:', result.message);
      return {
        success: false,
        message: result.message ?? 'Failed to create campaign.',
      };
    }

    return {
      success: true,
      message: 'Campaign created successfully.',
      campaign: result.campaign,
    };
  } catch (error: any) {
    console.error('Network error creating campaign:', error);
    return {
      success: false,
      message: 'A network error occurred while creating the campaign.',
    };
  }
}
