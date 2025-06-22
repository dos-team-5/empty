/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import {
  AttemptConfiguration,
  FileAttachment,
  SpinnerCampaign,
  SpinnerOption,
} from '@/schema';
import { cookies } from 'next/headers';

type UpdateCampaignPayload = {
  id: number;
  data: Partial<{
    title: string;
    companyName: string;
    companyLogo: FileAttachment;
    deadline: Date;
    options: SpinnerOption[];
    userLimit: number;
    attemptConfiguration: AttemptConfiguration;
  }>;
};

type UpdateCampaignInput = {
  id: number;
  data: Record<string, UpdateCampaignPayload>; // ideally replace with a stricter type
};

export async function updateCampaign({
  id,
  data,
}: UpdateCampaignInput): Promise<{
  success: boolean;
  message: string;
  campaign?: SpinnerCampaign; // replace `any` with your Campaign type if available
}> {
  // Step 1: Validate ID
  if (!id || isNaN(id)) {
    return {
      success: false,
      message: 'Invalid campaign ID.',
    };
  }

  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${id}`
    );

    // 2. Get the cookie store from the incoming request
    const cookieStore = await cookies();

    const response = await fetch(url.toString(), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data), // 👈 sending the actual data payload
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Failed to update campaign:', result.message);
      return {
        success: false,
        message: result.message ?? 'Failed to update campaign.',
      };
    }

    return {
      success: true,
      message: 'Campaign updated successfully.',
      campaign: result.campaign,
    };
  } catch (error: any) {
    console.error('Network error updating campaign:', error);
    return {
      success: false,
      message: 'A network error occurred while updating the campaign.',
    };
  }
}
