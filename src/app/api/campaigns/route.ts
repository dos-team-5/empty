// Path: /app/api/campaigns/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { NewSpinnerCampaign, spinnerCampaigns } from '@/schema/campaigns';
import { db } from '@/config/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/utils/authOptions';
import { count } from 'drizzle-orm';

// --- GET Function (Add this to your existing route.ts file) ---

export async function GET(req: NextRequest) {
  try {
    // --- Authorization Check ---
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Access is denied.' },
        { status: 403 }
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
    const [totalRecordsResult, campaignRecords] = await Promise.all([
      // Query 1: Get the total count of all campaigns
      db.select({ totalCount: count() }).from(spinnerCampaigns),

      // Query 2: Get the paginated campaign records
      db.query.spinnerCampaigns.findMany({
        limit: limitNumber,
        offset: offset,
        orderBy: (campaigns, { desc }) => [desc(campaigns.createdAt)],
      }),
    ]);

    const totalCount = totalRecordsResult[0].totalCount;
    const totalPages = Math.ceil(totalCount / limitNumber);

    // --- Response Formatting ---
    const response = {
      records: campaignRecords,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNumber,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch campaigns due to a server error.',
      },
      { status: 500 }
    );
  }
}

// Define a type for the request body for validation purposes
type CreateCampaignPayload = Omit<NewSpinnerCampaign, 'id' | 'createdAt'>;

export async function POST(req: NextRequest) {
  try {
    // --- Authorization Check ---
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Access is denied.' },
        { status: 403 }
      );
    }

    // --- Input Validation ---
    const body: CreateCampaignPayload = await req.json();
    const { title, companyName, deadline, options, attemptConfiguration } =
      body;

    if (
      !title ||
      !companyName ||
      !deadline ||
      !options ||
      !attemptConfiguration
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing required campaign fields.' },
        { status: 400 }
      );
    }

    // --- Database Insertion ---
    const [newCampaign] = await db
      .insert(spinnerCampaigns)
      .values({
        ...body,
        // Ensure deadline is a Date object if it's passed as a string
        deadline: new Date(deadline),
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: 'Campaign created successfully.',
        campaign: newCampaign,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating campaign:', error);
    // Check for specific database errors if needed
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create campaign due to a server error.',
      },
      { status: 500 }
    );
  }
}
