/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

export async function winCheck({
  id,
  prizeId,
}: {
  id: number;
  prizeId: string;
}): Promise<{
  success: boolean;
  message: string;
  isWinner: boolean;
}> {
  // Step 1: Fetch the paginated campaign data from the API
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${id}/win-check`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prizeId }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch check winnig:', result.message);
      return {
        success: false,
        message: result.message ?? 'Failed to fetch check winnig from server.',
        isWinner: false,
      };
    }

    return {
      success: true,
      message: 'check winnig fetched successfully.',
      isWinner: result.isWinner as boolean,
    };
  } catch (error: any) {
    console.error('Network error while fetching check winnig:', error);
    return {
      success: false,
      message: 'A network error occurred while fetching campaign data.',
      isWinner: false,
    };
  }
}
