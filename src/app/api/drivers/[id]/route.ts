// This file should be placed at: /app/api/drivers/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/config/db';
import { drivers } from '@/schema/drivers';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/utils/authOptions';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check for user session and role
    // const session = await getServerSession(authOptions);

    // if (!session || session.user.role !== 'super_admin') {
    //   return NextResponse.json(
    //     { success: false, message: 'Forbidden: Access is denied.' },
    //     { status: 403 }
    //   );
    // }

    const driverId = parseInt(params.id, 10);
    if (isNaN(driverId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid driver ID provided.' },
        { status: 400 }
      );
    }

    // Query the database for a single driver with the matching ID
    const driver = await db.query.drivers.findFirst({
      where: eq(drivers.id, driverId),
    });

    if (!driver) {
      return NextResponse.json(
        { success: false, message: 'Driver not found.' },
        { status: 404 }
      );
    }

    // Return the found driver
    return NextResponse.json({ success: true, driver }, { status: 200 });
  } catch (error) {
    console.error('Error fetching single driver:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch driver due to a server error.',
      },
      { status: 500 }
    );
  }
}
