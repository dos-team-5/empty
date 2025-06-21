import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/config/db';
import { spinnerParticipants } from '@/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/utils/authOptions';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Access is denied.' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const campaignId = parseInt(id, 10);
    if (isNaN(campaignId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid campaign ID provided.' },
        { status: 400 }
      );
    }

    // Fetch all participants for this campaign, ordered by lastAttemptAt DESC
    const participants = await db.query.spinnerParticipants.findMany({
      where: eq(spinnerParticipants.campaignId, campaignId),
      orderBy: (participants, { desc }) => [desc(participants.lastAttemptAt)],
    });

    const totalCount = participants.length;

    return NextResponse.json(
      {
        success: true,
        records: participants,
        totalCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching all campaign participants:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch participants due to a server error.',
      },
      { status: 500 }
    );
  }
}
