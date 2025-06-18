// Path: /app/api/campaigns/[id]/participate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {
  spinnerCampaigns,
  spinnerParticipants,
  NewSpinnerParticipant,
} from '@/schema'; // Adjust path to your schema file
import { eq, and, count } from 'drizzle-orm';
import { db } from '@/config/db';

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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // --- Authorization Check ---
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'super_admin') {
    //   return NextResponse.json(
    //     { success: false, message: 'Forbidden: Access is denied.' },
    //     { status: 403 }
    //   );
    // }

    // --- ID Validation ---
    const campaignId = parseInt(params.id, 10);
    if (isNaN(campaignId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid campaign ID provided.' },
        { status: 400 }
      );
    }

    // --- Pagination Logic ---
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const limit = parseInt(searchParams.get('limit') ?? '10', 10);

    const pageNumber = page > 0 ? page : 1;
    const limitNumber = limit > 0 ? limit : 10;
    const offset = (pageNumber - 1) * limitNumber;

    // --- Database Queries ---
    const [totalRecordsResult, participantRecords] = await Promise.all([
      // Query 1: Get the total count of participants for this specific campaign
      db
        .select({ totalCount: count() })
        .from(spinnerParticipants)
        .where(eq(spinnerParticipants.campaignId, campaignId)),

      // Query 2: Get the paginated list of participants for this campaign
      db.query.spinnerParticipants.findMany({
        where: eq(spinnerParticipants.campaignId, campaignId),
        limit: limitNumber,
        offset: offset,
        orderBy: (participants, { desc }) => [desc(participants.lastAttemptAt)],
      }),
    ]);

    const totalCount = totalRecordsResult[0]?.totalCount ?? 0;
    const totalPages = Math.ceil(totalCount / limitNumber);

    // --- Response Formatting ---
    const response = {
      records: participantRecords,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNumber,
      },
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

    const body: { name: string; email: string; phone?: string } =
      await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json(
        { message: 'Name and email are required.' },
        { status: 400 }
      );
    }

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
    let participant = await db.query.spinnerParticipants.findFirst({
      where: and(
        eq(spinnerParticipants.campaignId, campaignId),
        eq(spinnerParticipants.email, body.email)
      ),
    });

    const config = campaign.attemptConfiguration;

    // New Participant
    if (!participant) {
      const totalParticipants = await db
        .select({ count: eq(spinnerParticipants.campaignId, campaignId) })
        .from(spinnerParticipants);
      if (
        campaign.userLimit &&
        totalParticipants.length >= campaign.userLimit
      ) {
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
        // If the period has reset, update the participant's period stats
        if (hasPeriodReset(participant.periodStart, config.timePeriod)) {
          participant.periodAttempts = 0;
          participant.periodStart = new Date();
        }
        // If still within the period, check attempts
        else if (participant.periodAttempts >= config.attemptsPerPeriod) {
          return NextResponse.json(
            {
              message: `You have reached the attempt limit for this ${config.timePeriod}. Please try again later.`,
            },
            { status: 403 }
          );
        }
      }
    }

    // --- Spin the Wheel ---
    const winningOption =
      campaign.options[Math.floor(Math.random() * campaign.options.length)];

    // --- Upsert Participant Data ---
    const now = new Date();
    const participantDataToUpsert: NewSpinnerParticipant = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      campaignId: campaignId,
      totalAttempts: (participant?.totalAttempts || 0) + 1,
      periodAttempts: (participant?.periodAttempts || 0) + 1,
      periodStart: participant?.periodStart || now,
      wonPrizes: [...(participant?.wonPrizes || []), winningOption],
      lastAttemptAt: now,
    };

    const [savedParticipant] = await db
      .insert(spinnerParticipants)
      .values(participantDataToUpsert)
      .onConflictDoUpdate({
        target: [spinnerParticipants.email, spinnerParticipants.campaignId],
        set: {
          totalAttempts: participantDataToUpsert.totalAttempts,
          periodAttempts: participantDataToUpsert.periodAttempts,
          periodStart: participantDataToUpsert.periodStart,
          wonPrizes: participantDataToUpsert.wonPrizes,
          lastAttemptAt: participantDataToUpsert.lastAttemptAt,
        },
      })
      .returning();

    // --- Success Response ---
    return NextResponse.json(
      {
        success: true,
        message: 'Congratulations!',
        prize: winningOption,
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
