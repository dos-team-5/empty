/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/config/db';
import { drivers, NewDriver } from '@/schema/drivers';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const requestId = randomUUID();
  console.log(`[${requestId}] - Received POST request to /api/drivers/create`);

  try {
    const applicationData: any = await req.json(); // Use `any` for robust initial parsing

    // First, check if the parent object templateData exists and is an object
    if (
      !applicationData.templateData ||
      typeof applicationData.templateData !== 'object'
    ) {
      console.error(
        `[${requestId}] - CRITICAL: The templateData object is missing or not an object.`
      );
      console.error(
        `[${requestId}] - Received Body:`,
        JSON.stringify(applicationData, null, 2)
      );
      return NextResponse.json(
        { message: 'Invalid payload: templateData is missing.' },
        { status: 400 }
      );
    }

    const { driverInfo, kyc, bankInfo } = applicationData.templateData;

    // --- ENHANCED VALIDATION ---
    // Check for driverInfo and its essential properties for a more reliable validation.
    if (
      !driverInfo ||
      !driverInfo.email ||
      !driverInfo.phone ||
      !driverInfo.fullName
    ) {
      // Log the entire object for detailed debugging to spot casing or structure issues.
      console.error(
        `[${requestId}] - Validation Failed: driverInfo or its essential properties are missing.`,
        `[${requestId}] - Received templateData:`,
        JSON.stringify(applicationData.templateData, null, 2) // Pretty-prints the received JSON
      );
      return NextResponse.json(
        {
          message:
            'Invalid data: driverInfo or required fields (email, phone, fullName) are missing.',
        },
        { status: 400 }
      );
    }
    console.log(
      `[${requestId}] - Validation passed for driver: ${driverInfo.email}`
    );

    // Check if a driver with this email or phone already exists
    const existingDriver = await db.query.drivers.findFirst({
      where: (driver, { eq, or }) =>
        or(
          eq(driver.email, driverInfo.email),
          eq(driver.phone, driverInfo.phone)
        ),
    });

    if (existingDriver) {
      // Logic to return specific conflict messages
      if (existingDriver.email === driverInfo.email) {
        return NextResponse.json(
          {
            success: false,
            message: 'A driver with this email already exists.',
          },
          { status: 409 }
        );
      } else {
        // This implies the phone number matched
        return NextResponse.json(
          {
            success: false,
            message: 'A driver with this phone number already exists.',
          },
          { status: 409 }
        );
      }
    }

    // Map the incoming application data to the NewDriver type for insertion
    const newDriverData: NewDriver = {
      fullName: driverInfo.fullName,
      email: driverInfo.email,
      phone: driverInfo.phone,
      cityProvince: driverInfo.cityProvince,
      shippingAddress: driverInfo.shippingAddress,
      vehicleMake: driverInfo.vehicleMake,
      vehicleModel: driverInfo.vehicleModel,
      vehicleYear: parseInt(driverInfo.vehicleYear, 10) || null,
      vehiclePhotos: driverInfo.vehiclePhotos,
      rideSharePlatforms: driverInfo.rideSharePlatforms,
      weeklyDrivingSchedule: driverInfo.weeklyDrivingSchedule,
      driversLicense: kyc.driversLicense,
      driverProfile: kyc.driverProfile,
      tripHistory: kyc.tripHistory,
      voidCheque: bankInfo.voidCheque,
    };

    console.log(
      `[${requestId}] - Proceeding to database insertion for driver: ${driverInfo.email}`
    );
    // Insert the new driver record into the database
    const [insertedDriver] = await db
      .insert(drivers)
      .values(newDriverData)
      .returning();

    console.log(
      `[${requestId}] - Successfully inserted driver with ID: ${insertedDriver.id}`
    );
    return NextResponse.json(
      {
        success: true,
        message: 'Driver application stored successfully.',
        driver: insertedDriver,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(`[${requestId}] - Error saving driver application:`, error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to store driver application due to a server error.',
      },
      { status: 500 }
    );
  }
}
