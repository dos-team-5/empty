/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';

export async function updateDriverStatus(driverId: number, status: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/drivers/${driverId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
          // optionally include auth headers or cookies here
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? 'Failed to update status');
    }

    return data; // { success: true, message: 'Driver status updated successfully.' }
  } catch (error: any) {
    console.error('Error in updateDriverStatus:', error);
    return { success: false, message: error.message };
  }
}
