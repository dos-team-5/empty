/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { SpinnerParticipant } from '@/schema';

export async function getParticipants(
  id: number,
  page: number = 1,
  limit: number = 10
): Promise<{
  success: boolean;
  message: string;
  data?: {
    records: SpinnerParticipant[]; // Replace `any` with Participant type if available
    pagination: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
    };
  };
}> {
  // --- ID Validation ---
  if (!id || isNaN(id)) {
    return {
      success: false,
      message: 'Invalid campaign ID.',
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${id}/participate?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    const result = await res.json();

    if (!res.ok) {
      console.error('Failed to fetch participants:', result.message);
      return {
        success: false,
        message: result.message ?? 'Failed to fetch participants.',
      };
    }
    console.log(result);
    return {
      success: true,
      message: 'Participants fetched successfully.',
      data: {
        records: result.records,
        pagination: result.pagination,
      },
    };
  } catch (error: any) {
    console.error('Network error fetching participants:', error);
    return {
      success: false,
      message: 'A network error occurred while fetching participants.',
    };
  }
}

export async function getParticipantsAll(id: number): Promise<{
  success: boolean;
  message: string;
  data?: SpinnerParticipant[];
}> {
  // --- ID Validation ---
  if (!id || isNaN(id)) {
    return {
      success: false,
      message: 'Invalid campaign ID.',
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${id}/participate/all-data`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    const result = await res.json();

    if (!res.ok) {
      console.error('Failed to fetch participants:', result.message);
      return {
        success: false,
        message: result.message ?? 'Failed to fetch participants.',
      };
    }
    console.log(result);
    return {
      success: true,
      message: 'Participants fetched successfully.',
      data: result.records,
    };
  } catch (error: any) {
    console.error('Network error fetching participants:', error);
    return {
      success: false,
      message: 'A network error occurred while fetching participants.',
    };
  }
}
