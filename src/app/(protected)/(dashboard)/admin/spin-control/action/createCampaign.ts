'use server';

import { CreateCampaignPayload } from '@/app/api/campaigns/route';
import { db } from '@/config/db';
import { spinnerCampaigns } from '@/schema';

export async function createCampaign(body: CreateCampaignPayload) {
  try {
    const { title, companyName, deadline, options, attemptConfiguration } =
      body;

    if (
      !title ||
      !companyName ||
      !deadline ||
      !options ||
      !attemptConfiguration
    ) {
      return {
        success: false,
        message: 'Missing required campaign fields.',
      };
    }

    const [newCampaign] = await db
      .insert(spinnerCampaigns)
      .values({
        ...body,
        deadline: new Date(deadline),
      })
      .returning();

    return {
      success: true,
      message: 'Campaign created successfully.',
      campaign: newCampaign,
    };
  } catch (error) {
    console.error('Error creating campaign:', error);
    return {
      success: false,
      message: 'Failed to create campaign due to a server error.',
    };
  }
}
