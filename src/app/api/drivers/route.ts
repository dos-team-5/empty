// This file should be placed at: /app/api/drivers/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { count } from 'drizzle-orm';
import { drivers } from '@/schema/drivers';
import { db } from '@/config/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/utils/authOptions';
export async function GET(req: NextRequest) {
  try {
    // --- Authorization Check ---
    // Get the server-side session using your authOptions
    const session = await getServerSession(authOptions);
    // Check if a session exists and if the user's role is 'super_admin'
    // Note: The role is available on `session.user.role` based on your session callback
    if (!session || session.user?.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Access is denied.' },
        { status: 403 }
      );
    }
    // --- End Authorization Check ---

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const limit = parseInt(searchParams.get('limit') ?? '10', 10);

    // Ensure page and limit are positive numbers
    const pageNumber = page > 0 ? page : 1;
    const limitNumber = limit > 0 ? limit : 10;
    const offset = (pageNumber - 1) * limitNumber;

    // We need two parallel queries: one for the total count and one for the records
    const [totalRecordsResult, driverRecords] = await Promise.all([
      // Query 1: Get the total number of driver records
      db.select({ totalCount: count() }).from(drivers),

      // Query 2: Get the paginated driver records
      db.query.drivers.findMany({
        limit: limitNumber,
        offset: offset,
        // You can add ordering here if you like
        orderBy: (drivers, { desc }) => [desc(drivers.createdAt)],
      }),
    ]);

    const totalCount = totalRecordsResult[0].totalCount;
    const totalPages = Math.ceil(totalCount / limitNumber);

    // Construct the final response object
    const response = {
      records: driverRecords,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNumber,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch drivers due to a server error.',
      },
      { status: 500 }
    );
  }
}
