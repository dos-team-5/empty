// This file should be placed at: /app/api/drivers/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/config/db';
import { drivers } from '@/schema/drivers';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/utils/authOptions';

const VALID_STATUSES = [
  'pending',
  'approved',
  'rejected',
  'needs_review',
] as const;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Access is denied.' },
        { status: 403 }
      );
    }

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Access is denied.' },
        { status: 403 }
      );
    }

    const driverId = parseInt(params.id, 10);
    if (isNaN(driverId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid driver ID provided.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status } = body;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value.' },
        { status: 400 }
      );
    }

    const result = await db
      .update(drivers)
      .set({ status })
      .where(eq(drivers.id, driverId));

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Driver not found or status not updated.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Driver status updated successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating driver status:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update driver status due to a server error.',
      },
      { status: 500 }
    );
  }
}
