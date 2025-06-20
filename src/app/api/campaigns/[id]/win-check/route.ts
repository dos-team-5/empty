// Path: /app/api/campaigns/[id]/win-check/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db'; // Adjust path to your db connection
import { spinnerCampaigns } from '@/schema'; // Adjust path to your schema file
import { eq } from 'drizzle-orm';

// Define the expected shape of the request body
interface WinCheckPayload {
  prizeId: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id: campaignId } = await params;
    if (isNaN(campaignId)) {
      return NextResponse.json(
        { message: 'Invalid campaign ID.' },
        { status: 400 }
      );
    }

    const body: WinCheckPayload = await req.json();
    const { prizeId } = body;

    if (!prizeId) {
      return NextResponse.json(
        { message: 'Prize ID is required.' },
        { status: 400 }
      );
    }

    // Fetch the full campaign data to get the original options with coupons
    const campaign = await db.query.spinnerCampaigns.findFirst({
      where: eq(spinnerCampaigns.id, campaignId),
    });

    if (!campaign) {
      return NextResponse.json(
        { message: 'Campaign not found.' },
        { status: 404 }
      );
    }

    // Find the specific prize option the user landed on
    const winningOption = campaign.options.find(
      (option) => option.id === prizeId
    );

    if (!winningOption) {
      return NextResponse.json(
        { message: 'Invalid prize ID for this campaign.' },
        { status: 400 }
      );
    }

    // A user "wins" if the coupon exists and is not a placeholder like 'TRY-AGAIN'
    const isAWinningPrize = !!(
      winningOption.coupon && winningOption.coupon.toUpperCase() !== 'TRY-AGAIN'
    );

    // --- Construct and Send the Final Response ---
    // This endpoint now only validates if the prize is a winner.
    // It does not handle participant data.
    return NextResponse.json(
      {
        success: true,
        isWinner: isAWinningPrize,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during win check:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
