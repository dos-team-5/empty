import { API_ENDPOINT } from '@/constants';

type FileAttachment = {
  key: string;
  url: string;
  size: number;
  type: string;
  name: string;
};

export type DriverApplicationPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  streetAddress1: string;
  streetAddress2: string;
  postalCode: string;
  city: string;
  province: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePhotos: FileAttachment[];
  rideSharePlatforms: string[];
  weeklyDrivingHours: string;
  driversLicense: FileAttachment;
  driverProfile: FileAttachment;
  tripHistory: FileAttachment;
  // bankInfo?: FileAttachment;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export type DriverApplication = {
  from: string;
  to: string;
  subject: string;
  templateName: string;
  templateData: DriverApplicationPayload;
};

export function getDriverApplicationFromLocalStorage(): DriverApplication | null {
  try {
    const driverInfo = JSON.parse(
      localStorage.getItem('step1FormValues') ?? '{}'
    );
    const kyc = JSON.parse(localStorage.getItem('step2FormValues') ?? '{}');

    const formatSingleFile = (arr: FileAttachment[] = []) => arr[0] ?? null;

    const app: DriverApplication = {
      from: driverInfo.email ?? 'no-reply@example.com',
      to: 'contact@emptyad.com',
      subject: `New Driver Application: ${driverInfo.fullName ?? 'Unknown'}`,
      templateName: 'driver-application',
      templateData: {
        name: driverInfo.name,
        email: driverInfo.email,
        phone: driverInfo.phone,
        password: driverInfo.password,
        streetAddress1: driverInfo.streetAddress1,
        streetAddress2: driverInfo.streetAddress2 || '',
        postalCode: driverInfo.postalCode,
        city: driverInfo.city,
        province: driverInfo.city,
        vehicleMake: driverInfo.vehicleMake,
        vehicleModel: driverInfo.vehicleModel,
        vehicleYear: driverInfo.vehicleYear,
        vehiclePhotos: driverInfo.vehiclePhotos ?? [],
        rideSharePlatforms: driverInfo.rideSharePlatforms ?? [],
        weeklyDrivingHours: driverInfo.weeklyDrivingHours ?? '',
        driversLicense: formatSingleFile(kyc.driversLicense),
        driverProfile: formatSingleFile(kyc.driverProfile),
        tripHistory: formatSingleFile(kyc.tripHistory),
        // bankInfo: dummyBankInfo,
      },
    };

    return app;
  } catch (error) {
    console.error(
      'Failed to build driver application from localStorage',
      error
    );
    return null;
  }
}

export function greetDrivers() {
  try {
    const driverInfo = JSON.parse(
      localStorage.getItem('step1FormValues') ?? '{}'
    );
    const app = {
      from: 'contact@emptyad.com',
      to: driverInfo.email,
      subject: `Thanks For Signing Up: ${driverInfo.fullName}`,
      templateName: 'greetings',
      templateData: {
        driverName: driverInfo.fullName,
        driverEmail: driverInfo.email,
      },
    };
    return app;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function sendDriverApplicationEmail(
  applicationData: DriverApplication
): Promise<{ success: boolean; message: string }> {
  console.log('applicationData ====>', API_ENDPOINT);
  try {
    // Step 1: Save the application
    const saveResponse = await fetch(`${API_ENDPOINT}/auth/driver-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData.templateData),
    });

    const saveResult = await saveResponse.json();

    console.log('save result ====>', saveResult);

    if (!saveResponse.ok) {
      console.error('Failed to save application data:', saveResult.message);
      return {
        success: false,
        message: saveResult.message ?? 'Could not save the application.',
      };
    }

    // Step 2: Send application confirmation email
    const emailResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      return {
        success: false,
        message: `Application saved, but confirmation email failed. Reason: ${emailResult.error ?? 'Unknown error'}`,
      };
    }

    // Step 3: Send greeting email
    const greetingEmailInfo = greetDrivers();
    if (!greetingEmailInfo) {
      return {
        success: false,
        message: 'Application saved, but could not send greeting email.',
      };
    }

    const greetingResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(greetingEmailInfo),
    });

    const greetingResult = await greetingResponse.json();

    if (!greetingResponse.ok) {
      return {
        success: false,
        message: `Application saved, but greeting email failed. Reason: ${greetingResult.error ?? 'Unknown error'}`,
      };
    }

    return {
      success: true,
      message: 'Application saved and all emails sent successfully.',
    };
  } catch (error: any) {
    console.error('Unexpected error during application process:', error);
    return {
      success: false,
      message: 'An unexpected error occurred during the application process.',
    };
  }
}
