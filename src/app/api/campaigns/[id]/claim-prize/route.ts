// Path: /app/api/campaigns/[id]/claim-prize/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { spinnerCampaigns, spinnerParticipants } from '@/schema';
import { eq, and } from 'drizzle-orm';

interface ClaimPrizePayload {
  email: string;
  prizeId: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaignId = parseInt(params.id, 10);
    if (isNaN(campaignId)) {
      return NextResponse.json(
        { message: 'Invalid campaign ID.' },
        { status: 400 }
      );
    }

    const body: ClaimPrizePayload = await req.json();
    const { email, prizeId } = body;

    if (!email || !prizeId) {
      return NextResponse.json(
        { message: 'Email and Prize ID are required.' },
        { status: 400 }
      );
    }

    // --- Fetch Campaign and Participant in parallel ---
    const [campaign, participant] = await Promise.all([
      db.query.spinnerCampaigns.findFirst({
        where: eq(spinnerCampaigns.id, campaignId),
      }),
      db.query.spinnerParticipants.findFirst({
        where: and(
          eq(spinnerParticipants.campaignId, campaignId),
          eq(spinnerParticipants.email, email)
        ),
      }),
    ]);

    if (!campaign) {
      return NextResponse.json(
        { message: 'Campaign not found.' },
        { status: 404 }
      );
    }
    if (!participant) {
      return NextResponse.json(
        { message: 'You must participate before claiming a prize.' },
        { status: 403 }
      );
    }

    // --- Find the specific prize option from the campaign rules ---
    const prizeOption = campaign.options.find(
      (option) => option.id === prizeId
    );

    if (!prizeOption) {
      return NextResponse.json(
        { message: 'Invalid prize ID for this campaign.' },
        { status: 400 }
      );
    }

    // --- Update the participant's record with the won prize ---
    const updatedPrizes = [...(participant.wonPrizes || []), prizeOption];

    await db
      .update(spinnerParticipants)
      .set({ wonPrizes: updatedPrizes })
      .where(
        and(
          eq(spinnerParticipants.campaignId, campaignId),
          eq(spinnerParticipants.email, email)
        )
      );

    // --- Success Response ---
    // Return the actual coupon code.
    return NextResponse.json(
      {
        success: true,
        message: 'Prize claimed successfully!',
        coupon: prizeOption.coupon,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error claiming prize:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred while claiming the prize.' },
      { status: 500 }
    );
  }
}
