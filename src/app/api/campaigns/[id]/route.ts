// Path: /app/api/campaigns/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/config/db';
import { spinnerCampaigns } from '@/schema';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // --- Authorization Check ---
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'super_admin') {
    //   return NextResponse.json(
    //     { success: false, message: 'Forbidden: Access is denied.' },
    //     { status: 403 }
    //   );
    // }

    // --- ID Validation ---
    const campaignId = parseInt(id, 10);
    if (isNaN(campaignId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid campaign ID provided.' },
        { status: 400 } // Bad Request
      );
    }

    // --- Database Query ---
    const campaign = await db.query.spinnerCampaigns.findFirst({
      where: eq(spinnerCampaigns.id, campaignId),
    });

    if (!campaign) {
      return NextResponse.json(
        { success: false, message: 'Campaign not found.' },
        { status: 404 } // Not Found
      );
    }
    // --- Data Sanitization ---
    // Remove the 'coupon' field from each option before sending the response.
    const sanitizedOptions = campaign.options.map((option) => {
      const { coupon, ...rest } = option; // Destructure to exclude coupon
      return rest; // Returns an object with { id, label, ratio }
    });

    const publicCampaignData = {
      ...campaign,
      options: sanitizedOptions,
    };

    // --- Success Response ---
    return NextResponse.json(
      { success: true, campaign: publicCampaignData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching single campaign:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch campaign due to a server error.',
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

    // --- Input Processing ---
    const body = await req.json();

    // --- Database Update ---
    const [updatedCampaign] = await db
      .update(spinnerCampaigns)
      .set({
        ...body,
        // If the deadline is being updated, ensure it's a valid Date
        ...(body.deadline && { deadline: new Date(body.deadline) }),
      })
      .where(eq(spinnerCampaigns.id, campaignId))
      .returning();

    if (!updatedCampaign) {
      return NextResponse.json(
        { success: false, message: 'Campaign not found or no changes made.' },
        { status: 404 }
      );
    }

    // --- Success Response ---
    return NextResponse.json(
      {
        success: true,
        message: 'Campaign updated successfully.',
        campaign: updatedCampaign,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating campaign:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update campaign due to a server error.',
      },
      { status: 500 }
    );
  }
}

// Exporting the DELETE function to handle campaign deletion
export async function DELETE(
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

    // --- Database Deletion ---
    const deletedCampaign = await db
      .delete(spinnerCampaigns)
      .where(eq(spinnerCampaigns.id, campaignId))
      .returning();

    if (deletedCampaign.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Campaign not found.' },
        { status: 404 }
      );
    }

    // --- Success Response ---
    return NextResponse.json(
      { success: true, message: 'Campaign deleted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete campaign due to a server error.',
      },
      { status: 500 }
    );
  }
}
