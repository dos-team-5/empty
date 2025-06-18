import { db } from '@/config/db';
import { spinnerCampaigns } from '@/schema';
import { count } from 'drizzle-orm';

export async function getCampaigns(page = 1, limit = 10) {
  try {
    const pageNumber = page > 0 ? page : 1;
    const limitNumber = limit > 0 ? limit : 10;
    const offset = (pageNumber - 1) * limitNumber;

    const [totalRecordsResult, campaignRecords] = await Promise.all([
      db.select({ totalCount: count() }).from(spinnerCampaigns),
      db.query.spinnerCampaigns.findMany({
        limit: limitNumber,
        offset,
        orderBy: (campaigns, { desc }) => [desc(campaigns.createdAt)],
      }),
    ]);

    const totalCount = totalRecordsResult[0].totalCount;
    const totalPages = Math.ceil(totalCount / limitNumber);

    return {
      success: true,
      records: campaignRecords,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNumber,
      },
    };
  } catch (error) {
    console.error('Error in getCampaigns:', error);
    return {
      success: false,
      message: 'Failed to fetch campaigns due to a server error.',
    };
  }
}
