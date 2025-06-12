export type DriverApplication = {
  from: string;
  to: string;
  subject: string;
  templateName: string;
  templateData: {
    driverInfo: {
      fullName: string;
      email: string;
      phone: string;
      cityProvince: string;
      shippingAddress: string;
      vehicleMake: string;
      vehicleModel: string;
      vehicleYear: string;
      vehiclePhotos: FileAttachment[];
      rideSharePlatforms: string[];
      weeklyDrivingSchedule: string;
    };
    kyc: {
      driversLicense: FileAttachment;
      driverProfile: FileAttachment;
      tripHistory: FileAttachment;
    };
    bankInfo: {
      voidCheque: FileAttachment;
    };
  };
};

type FileAttachment = {
  key: string;
  url: string;
  size: number;
  type: string;
  name: string;
};

export function getDriverApplicationFromLocalStorage(): DriverApplication | null {
  try {
    const driverInfo = JSON.parse(
      localStorage.getItem('step1FormValues') ?? '{}'
    );
    const kyc = JSON.parse(localStorage.getItem('step2FormValues') ?? '{}');
    const bankInfo = JSON.parse(
      localStorage.getItem('step3FormValues') ?? '{}'
    );

    // Ensure single file for each KYC and bank field (assuming only one file per field)
    const formatSingleFile = (arr: FileAttachment[] = []) => arr[0] ?? null;

    const app: DriverApplication = {
      from: 'contact@emptyad.com',
      to: driverInfo.email ?? 'no-reply@example.com',
      subject: `New Driver Application: ${driverInfo.fullName ?? 'Unknown'}`,
      templateName: 'driver-application',
      templateData: {
        driverInfo: {
          fullName: driverInfo.fullName,
          email: driverInfo.email,
          phone: driverInfo.phone,
          cityProvince: driverInfo.cityProvince,
          shippingAddress: driverInfo.shippingAddress,
          vehicleMake: driverInfo.vehicleMake,
          vehicleModel: driverInfo.vehicleModel,
          vehicleYear: driverInfo.vehicleYear,
          vehiclePhotos: driverInfo.vehiclePhotos ?? [],
          rideSharePlatforms: driverInfo.rideSharePlatforms ?? [],
          weeklyDrivingSchedule: driverInfo.weeklyDrivingSchedule,
        },
        kyc: {
          driversLicense: formatSingleFile(kyc.driversLicense),
          driverProfile: formatSingleFile(kyc.driverProfile),
          tripHistory: formatSingleFile(kyc.tripHistory),
        },
        bankInfo: {
          voidCheque: formatSingleFile(bankInfo.voidCheque),
        },
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

export async function sendDriverApplicationEmail(
  applicationData: DriverApplication
): Promise<{ success: boolean; message: string }> {
  console.log('Sending driver application email with data:', applicationData);
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });

    console.log('Response status:', response);

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error ?? 'Unknown server error',
      };
    }

    return {
      success: true,
      message: result.message ?? 'Email sent successfully',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message ?? 'Network error' };
  }
}
