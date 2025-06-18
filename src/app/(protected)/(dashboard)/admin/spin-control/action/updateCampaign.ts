'use server';

import { db } from '@/config/db';
import {
  AttemptConfiguration,
  FileAttachment,
  spinnerCampaigns,
  SpinnerOption,
} from '@/schema';
import { eq } from 'drizzle-orm';

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

export async function updateCampaign({
  id,
  data,
}: UpdateCampaignPayload): Promise<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { success: true; message: string; campaign: any }
  | { success: false; message: string }
> {
  try {
    if (isNaN(id)) {
      return { success: false, message: 'Invalid campaign ID provided.' };
    }

    const updateData = {
      ...data,
      deadline: data.deadline ? new Date(data.deadline) : new Date(),
      companyLogo: data.companyLogo, // Convert string to FileAttachment object
    };

    const [updatedCampaign] = await db
      .update(spinnerCampaigns)
      .set(updateData)
      .where(eq(spinnerCampaigns.id, id))
      .returning();

    if (!updatedCampaign) {
      return {
        success: false,
        message: 'Campaign not found or no changes made.',
      };
    }

    return {
      success: true,
      message: 'Campaign updated successfully.',
      campaign: updatedCampaign,
    };
  } catch (error) {
    console.error('Error in updateCampaign action:', error);
    return {
      success: false,
      message: 'Failed to update campaign due to a server error.',
    };
  }
}
