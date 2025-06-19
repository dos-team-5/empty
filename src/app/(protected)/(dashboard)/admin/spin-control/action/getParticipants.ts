'use server';

import { db } from '@/config/db';
import { spinnerParticipants } from '@/schema';
import { eq, count } from 'drizzle-orm';

type GetParticipantsParams = {
  campaignId: number;
  page?: number;
  limit?: number;
};

export async function getCampaignParticipants({
  campaignId,
  page = 1,
  limit = 10,
}: GetParticipantsParams) {
  try {
    // --- ID Validation ---
    if (isNaN(campaignId)) {
      return {
        success: false,
        message: 'Invalid campaign ID provided.',
        records: [],
        pagination: null,
      };
    }

    // --- Pagination ---
    const pageNumber = page > 0 ? page : 1;
    const limitNumber = limit > 0 ? limit : 10;
    const offset = (pageNumber - 1) * limitNumber;

    // --- Database Queries ---
    const [totalRecordsResult, participantRecords] = await Promise.all([
      db
        .select({ totalCount: count() })
        .from(spinnerParticipants)
        .where(eq(spinnerParticipants.campaignId, campaignId)),

      db.query.spinnerParticipants.findMany({
        where: eq(spinnerParticipants.campaignId, campaignId),
        limit: limitNumber,
        offset: offset,
        orderBy: (participants, { desc }) => [desc(participants.lastAttemptAt)],
      }),
    ]);

    const totalCount = totalRecordsResult[0]?.totalCount ?? 0;
    const totalPages = Math.ceil(totalCount / limitNumber);

    return {
      success: true,
      records: participantRecords,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNumber,
      },
    };
  } catch (error) {
    console.error('Error fetching campaign participants:', error);
    return {
      success: false,
      message: 'Failed to fetch participants due to a server error.',
      records: [],
      pagination: null,
    };
  }
}
