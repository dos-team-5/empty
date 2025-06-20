/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

interface ParticipationPayload {
  name: string;
  phone: string;
  email: string;
  agreeToEmails: boolean | undefined;
}

export async function makeParticipation({
  id,
  formData,
}: {
  id: number;
  formData: ParticipationPayload;
}): Promise<{
  success: boolean;
  message: string;
}> {
  // Step 1: Fetch the paginated campaign data from the API
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/${id}/participate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch make participation:', result.message);
      return {
        success: false,
        message:
          result.message ?? 'Failed to fetch make participation from server.',
      };
    }

    return {
      success: true,
      message: 'Participation made successfully.',
    };
  } catch (error: any) {
    console.error('Network error while fetching make participation:', error);
    return {
      success: false,
      message: 'A network error occurred while fetching campaign data.',
    };
  }
}
