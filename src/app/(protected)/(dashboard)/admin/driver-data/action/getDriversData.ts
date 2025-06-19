'use server';

import { getServerSession } from 'next-auth';
import { count } from 'drizzle-orm';
import { authOptions } from '@/app/api/auth/[...nextauth]/utils/authOptions';
import { db } from '@/config/db';
import { drivers } from '@/schema';

type GetDriversOptions = {
  page?: number;
  limit?: number;
};

export async function getDrivers({ page = 1, limit = 10 }: GetDriversOptions) {
  try {
    // --- Auth check ---
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'super_admin') {
      return {
        success: false,
        message: 'Forbidden: Access is denied.',
        records: [],
        pagination: null,
      };
    }

    // --- Pagination logic ---
    const pageNumber = page > 0 ? page : 1;
    const limitNumber = limit > 0 ? limit : 10;
    const offset = (pageNumber - 1) * limitNumber;

    // --- DB Queries ---
    const [totalRecordsResult, driverRecords] = await Promise.all([
      db.select({ totalCount: count() }).from(drivers),
      db.query.drivers.findMany({
        limit: limitNumber,
        offset: offset,
        orderBy: (drivers, { desc }) => [desc(drivers.createdAt)],
      }),
    ]);

    const totalCount = totalRecordsResult[0]?.totalCount ?? 0;
    const totalPages = Math.ceil(totalCount / limitNumber);

    return {
      success: true,
      records: driverRecords,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNumber,
      },
    };
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return {
      success: false,
      message: 'Failed to fetch drivers due to a server error.',
      records: [],
      pagination: null,
    };
  }
}
