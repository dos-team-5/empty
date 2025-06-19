/* eslint-disable @typescript-eslint/no-explicit-any */
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
      from: driverInfo.email ?? 'no-reply@example.com',
      to: 'contact@emptyad.com',
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
  // Step 1: Save the application to the database
  try {
    const saveResponse = await fetch('/api/drivers/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });

    const saveResult = await saveResponse.json();

    if (!saveResponse.ok) {
      console.error('Failed to save application data:', saveResult.message);
      return {
        success: false,
        message: saveResult.message ?? 'Could not save the application.',
      };
    }

    // Step 2: Send the email notification
    try {
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const emailResult = await emailResponse.json();

      if (!emailResponse.ok) {
        return {
          success: false,
          message: `Your application was saved, but the confirmation email failed to send. Reason: ${emailResult.error ?? 'Unknown server error'}`,
        };
      }

      // Step 3: Greet the driver
      const greetingEmailInfo = greetDrivers();
      if (!greetingEmailInfo) {
        return {
          success: false,
          message:
            'Your application was saved, could not send greeting email due to missing driver info.',
        };
      }
      const greetingResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(greetingEmailInfo),
      });

      const greetingResult = await greetingResponse.json();
      if (!greetingResponse.ok) {
        return {
          success: false,
          message: `Your application was saved, but the greeting email failed to send. Reason: ${greetingResult.error ?? 'Unknown server error'}`,
        };
      }
      return {
        success: true,
        message:
          'Your application was saved and a confirmation email has been sent.',
      };
    } catch (error: any) {
      console.error('Network error sending email:', error);
      return {
        success: false,
        message: `Your application was saved, but the confirmation email failed with a network error: ${error.message}`,
      };
    }
  } catch (error: any) {
    console.error('Network error while saving driver data:', error);
    return {
      success: false,
      message: 'A network error occurred while saving your application.',
    };
  }
}
