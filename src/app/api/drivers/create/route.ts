// This file should be placed at: /app/api/drivers/create/route.ts
import { DriverApplication } from '@/app/(main)/drive/action/driverApplication';
import { db } from '@/config/db';
import { drivers, NewDriver } from '@/schema/drivers';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const applicationData: DriverApplication = await req.json();
    const { driverInfo, kyc, bankInfo } = applicationData.templateData;

    // Optional: Check if a driver with this email already exists to prevent duplicates
    const existingDriver = await db.query.drivers.findFirst({
      where: (driver, { eq }) => eq(driver.email, driverInfo.email),
    });

    if (existingDriver) {
      return NextResponse.json(
        { success: false, message: 'A driver with this email already exists.' },
        { status: 409 } // 409 Conflict
      );
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
      vehicleYear: parseInt(driverInfo.vehicleYear, 10) || null, // Ensure year is a number or null
      vehiclePhotos: driverInfo.vehiclePhotos,
      rideSharePlatforms: driverInfo.rideSharePlatforms,
      weeklyDrivingSchedule: driverInfo.weeklyDrivingSchedule,
      driversLicense: kyc.driversLicense,
      driverProfile: kyc.driverProfile,
      tripHistory: kyc.tripHistory,
      voidCheque: bankInfo.voidCheque,
      // The 'status' field will default to 'pending' as defined in your schema
    };

    // Insert the new driver record into the database
    const [insertedDriver] = await db
      .insert(drivers)
      .values(newDriverData)
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: 'Driver application stored successfully.',
        driver: insertedDriver,
      },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    console.error('Error saving driver application:', error);
    // In a real app, you might want more specific error handling here
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to store driver application due to a server error.',
      },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
