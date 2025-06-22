// Path: /app/api/campaigns/[id]/participate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {
  spinnerCampaigns,
  spinnerParticipants,
  NewSpinnerParticipant,
} from '@/schema'; // Adjust path to your schema file
import { eq, and, count } from 'drizzle-orm';
import { db } from '@/config/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/utils/authOptions';

// Helper function to check if the attempt period needs to be reset
const hasPeriodReset = (
  periodStart: Date,
  timePeriod: 'day' | 'week' | 'month'
): boolean => {
  const now = new Date();
  const start = new Date(periodStart);

  if (timePeriod === 'day') {
    start.setDate(start.getDate() + 1);
    return now > start;
  }
  if (timePeriod === 'week') {
    start.setDate(start.getDate() + 7);
    return now > start;
  }
  if (timePeriod === 'month') {
    start.setMonth(start.getMonth() + 1);
    return now > start;
  }
  return false;
};

// This GET function is for fetching the participant list (as provided before)
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
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const limit = parseInt(searchParams.get('limit') ?? '10', 10);
    const pageNumber = page > 0 ? page : 1;
    const limitNumber = limit > 0 ? limit : 10;
    const offset = (pageNumber - 1) * limitNumber;
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
    const response = {
      records: participantRecords,
      pagination: { totalCount, totalPages, currentPage: pageNumber },
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching campaign participants:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch participants due to a server error.',
      },
      { status: 500 }
    );
  }
}

// --- UPDATED POST FUNCTION for pre-spin registration ---
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // --- ID and Input Validation ---
    const campaignId = parseInt(params.id, 10);
    if (isNaN(campaignId)) {
      return NextResponse.json(
        { message: 'Invalid campaign ID.' },
        { status: 400 }
      );
    }

    const body: {
      name: string;
      email: string;
      phone?: string;
      ipaddress?: string;
    } = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json(
        { message: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const { name, email, phone, ipAddress } = body;

    // --- Fetch the Campaign ---
    const campaign = await db.query.spinnerCampaigns.findFirst({
      where: eq(spinnerCampaigns.id, campaignId),
    });

    if (!campaign) {
      return NextResponse.json(
        { message: 'Campaign not found.' },
        { status: 404 }
      );
    }

    // --- Rule Checks ---
    if (new Date() > new Date(campaign.deadline)) {
      return NextResponse.json(
        { message: 'This campaign has expired.' },
        { status: 403 }
      );
    }

    // --- Participant & Attempt Logic ---
    const participant = await db.query.spinnerParticipants.findFirst({
      where: and(
        eq(spinnerParticipants.campaignId, campaignId),
        eq(spinnerParticipants.email, email)
      ),
    });

    const config = campaign.attemptConfiguration;

    // New Participant
    if (!participant) {
      const totalParticipantsResult = await db
        .select({ value: count() })
        .from(spinnerParticipants)
        .where(eq(spinnerParticipants.campaignId, campaignId));
      const totalParticipants = totalParticipantsResult[0].value;
      if (campaign.userLimit && totalParticipants >= campaign.userLimit) {
        return NextResponse.json(
          { message: 'This campaign has reached its participant limit.' },
          { status: 403 }
        );
      }
    }
    // Existing Participant
    else {
      // Check total attempts
      if (participant.totalAttempts >= config.totalAttempts) {
        return NextResponse.json(
          {
            message:
              'You have reached the maximum number of attempts for this campaign.',
          },
          { status: 403 }
        );
      }

      // Check time-based attempts
      if (config.timePeriod && participant.periodStart) {
        if (hasPeriodReset(participant.periodStart, config.timePeriod)) {
          participant.periodAttempts = 0;
          participant.periodStart = new Date();
        } else if (participant.periodAttempts >= config.attemptsPerPeriod) {
          return NextResponse.json(
            {
              message: `You have reached the attempt limit for this ${config.timePeriod}. Please try again later.`,
            },
            { status: 403 }
          );
        }
      }
    }

    // --- Upsert Participant Data (without prize) ---
    const now = new Date();
    const participantDataToUpsert: NewSpinnerParticipant = {
      name: name,
      email: email,
      phone: phone,
      campaignId: campaignId,
      ipAddress: ipAddress,
      totalAttempts: (participant?.totalAttempts || 0) + 1,
      periodAttempts: (participant?.periodAttempts || 0) + 1,
      periodStart: participant?.periodStart || now,
      wonPrizes: participant?.wonPrizes || [], // Do not add a prize yet
      lastAttemptAt: now,
    };

    await db
      .insert(spinnerParticipants)
      .values(participantDataToUpsert)
      .onConflictDoUpdate({
        target: [spinnerParticipants.email, spinnerParticipants.campaignId],
        set: {
          name: participantDataToUpsert.name,
          phone: participantDataToUpsert.phone,
          ipAddress: participantDataToUpsert.ipAddress,
          totalAttempts: participantDataToUpsert.totalAttempts,
          periodAttempts: participantDataToUpsert.periodAttempts,
          periodStart: participantDataToUpsert.periodStart,
          lastAttemptAt: participantDataToUpsert.lastAttemptAt,
        },
      });

    // --- Success Response ---
    // Return a success message indicating the user is now eligible to spin.
    return NextResponse.json(
      {
        success: true,
        message: 'Participation recorded. You can now spin the wheel!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during participation:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
