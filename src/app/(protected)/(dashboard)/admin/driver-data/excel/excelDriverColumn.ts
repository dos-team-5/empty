import { Driver } from '@/schema';

export const flattenDriverData = (driver: Driver | Driver[]) => {
  const drivers = Array.isArray(driver) ? driver : [driver];

  return drivers.map((d, index) => ({
    serial: index + 1,
    fullName: d.fullName,
    email: d.email,
    phone: d.phone,
    status: d.status,
    cityProvince: d.cityProvince,
    shippingAddress: d.shippingAddress,
    vehicleMake: d.vehicleMake,
    vehicleModel: d.vehicleModel,
    vehicleYear: d.vehicleYear,
    vehiclePhotos:
      d.vehiclePhotos?.map((p) => `[${p.name}](${p.url})`).join(', ') ?? '',
    rideSharePlatforms: d.rideSharePlatforms?.join(', ') ?? '',
    weeklyDrivingSchedule: d.weeklyDrivingSchedule,
    driversLicense: d.driversLicense
      ? `[${d.driversLicense.name}](${d.driversLicense.url})`
      : '',
    driverProfile: d.driverProfile
      ? `[${d.driverProfile.name}](${d.driverProfile.url})`
      : '',
    tripHistory: d.tripHistory
      ? `[${d.tripHistory.name}](${d.tripHistory.url})`
      : '',
    voidCheque: d.voidCheque
      ? `[${d.voidCheque.name}](${d.voidCheque.url})`
      : '',
    createdAt: new Date(d.createdAt).toLocaleDateString(),
  }));
};

export const driverColumns = [
  { header: 'S/N', key: 'serial', width: 10 },
  { header: 'Full Name', key: 'fullName', width: 30 },
  { header: 'Email', key: 'email', width: 30 },
  { header: 'Phone', key: 'phone', width: 20 },
  { header: 'Status', key: 'status', width: 15 },
  { header: 'City/Province', key: 'cityProvince', width: 25 },
  { header: 'Shipping Address', key: 'shippingAddress', width: 30 },
  { header: 'Vehicle Make', key: 'vehicleMake', width: 25 },
  { header: 'Vehicle Model', key: 'vehicleModel', width: 25 },
  { header: 'Vehicle Year', key: 'vehicleYear', width: 15 },
  { header: 'Ride Share Platforms', key: 'rideSharePlatforms', width: 30 },
  {
    header: 'Weekly Driving Schedule',
    key: 'weeklyDrivingSchedule',
    width: 30,
  },
  { header: "Driver's License File", key: 'driversLicense', width: 30 },
  { header: 'Driver Profile Photo', key: 'driverProfile', width: 30 },
  { header: 'Trip History File', key: 'tripHistory', width: 30 },
  { header: 'Void Cheque', key: 'voidCheque', width: 30 },
  { header: 'Created At', key: 'createdAt', width: 20 },
] as const;
