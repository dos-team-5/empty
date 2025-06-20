import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  jsonb,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

// An Enum is highly recommended for managing the state of a driver's application.
export const driverStatusEnum = pgEnum('driver_status', [
  'pending',
  'approved',
  'rejected',
  'needs_review',
]);

// This type can be shared to ensure type safety when working with file attachments.
export type FileAttachment = {
  key: string;
  url: string;
  size: number;
  type: string;
  name: string;
};

export const drivers = pgTable('drivers', {
  // Core Fields
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }).notNull().unique(),

  // Application Status
  status: driverStatusEnum('status').notNull().default('pending'),

  // Driver Info
  cityProvince: varchar('city_province', { length: 255 }),
  shippingAddress: text('shipping_address'),

  // Vehicle Info
  vehicleMake: varchar('vehicle_make', { length: 100 }),
  vehicleModel: varchar('vehicle_model', { length: 100 }),
  vehicleYear: integer('vehicle_year'),

  // Storing an array of file attachment objects using jsonb.
  vehiclePhotos: jsonb('vehicle_photos').$type<FileAttachment[]>(),

  // Storing an array of strings for platform names.
  rideSharePlatforms: text('ride_share_platforms').array(),

  // Storing the schedule as a simple string.
  weeklyDrivingSchedule: text('weekly_driving_schedule'),

  // KYC (Know Your Customer) - Storing the full FileAttachment object as jsonb.
  driversLicense: jsonb('drivers_license').$type<FileAttachment>(),
  driverProfile: jsonb('driver_profile').$type<FileAttachment>(),
  tripHistory: jsonb('trip_history').$type<FileAttachment>(),

  // Bank Info - Storing the full FileAttachment object as jsonb.
  voidCheque: jsonb('void_cheque').$type<FileAttachment>(),

  // Timestamps for tracking record creation and updates
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});

// Drizzle type exports for type-safe queries
export type Driver = typeof drivers.$inferSelect; // type for returning drivers
export type NewDriver = typeof drivers.$inferInsert; // type for inserting drivers
export type DriverStatus = typeof driverStatusEnum;
