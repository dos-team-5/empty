import { API_ENDPOINT } from "@/constants";

export type DriverApplicationPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  // bankInfo?: FileAttachment;
};

export type API_RESPONSE<T = unknown> =
  | {
      success: true;
      message?: string;
      data: T;
    }
  | {
      success: false;
      message?: string;
      error: string;
    };




export async function driverSignUp(
  applicationData: DriverApplicationPayload
): Promise<API_RESPONSE<DriverApplicationPayload> | undefined> {
  try {
    console.log('signUpDriver called with data:', applicationData);
    console.log('API endpoint:', `${API_ENDPOINT}/auth/driver-signup`);

    // Step 1: Save the application
    const saveResponse = await fetch(`${API_ENDPOINT}/auth/driver-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });

    console.log('Response status:', saveResponse.status);
    console.log('Response ok:', saveResponse.ok);

    const saveResult = await saveResponse.json();
    console.log('Response data:', saveResult);

    if (!saveResponse.ok) {
      console.error('Failed to save application data:', saveResult.message);
      return {
        success: false,
        message: saveResult.message ?? 'Could not save the application.',
        error: saveResult.message ?? 'Could not save the application.',
      };
    } else {
      return {
        success: true,
        message: 'Application saved successfully.',
        data: saveResult,
      };
    }

    // Step 3: Send greeting email
  } catch (error) {
    console.error('Unexpected error during application process:', error);
    return {
      success: false,
      message: 'An unexpected error occurred during the application process.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}