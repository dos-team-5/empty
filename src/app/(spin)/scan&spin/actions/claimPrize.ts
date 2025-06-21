/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

export interface ClaimPrizePayload {
  email: string;
  prizeId: string;
}

export async function claimPrize({
  id,
  payload,
}: {
  id: number;
  payload: ClaimPrizePayload;
}): Promise<{
  success: boolean;
  message: string;
  coupon?: string;
}> {
  // Step 1: Fetch the paginated campaign data from the API
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${id}/claim-prize`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch check winnig:', result.message);
      return {
        success: false,
        message: result.message ?? 'Failed to fetch check winnig from server.',
      };
    }

    return {
      success: true,
      message: 'check winnig fetched successfully.',
      coupon: result.coupon as string,
    };
  } catch (error: any) {
    console.error('Network error while fetching check winnig:', error);
    return {
      success: false,
      message: 'A network error occurred while fetching campaign data.',
    };
  }
}
