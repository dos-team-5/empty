import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/utils/authOptions';
import { db } from '@/config/db';

export async function GET() {
  try {
    // --- Authorization Check ---
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Access is denied.' },
        { status: 403 }
      );
    }
    // --- End Authorization Check ---

    // Fetch all driver records ordered by creation date descending
    const driverRecords = await db.query.drivers.findMany({
      orderBy: (drivers, { desc }) => [desc(drivers.createdAt)],
    });

    // Construct the final response object
    const response = {
      records: driverRecords,
      totalCount: driverRecords.length,
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
