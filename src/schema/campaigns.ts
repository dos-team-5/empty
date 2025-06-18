import {
  pgTable,
  serial,
  varchar,
  jsonb,
  timestamp,
  integer,
  primaryKey,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { FileAttachment } from './drivers';

/**
 * Defines the structure for a single prize option on the spinner wheel.
 */
export type SpinnerOption = {
  label: string; // The text displayed for the prize (e.g., "10% Off")
  coupon: string; // The coupon code or prize identifier
};

/**
 * Defines the time period for attempt limits.
 */
export const attemptPeriodEnum = pgEnum('attempt_period', [
  'day',
  'week',
  'month',
]);

/**
 * Defines the structure for the complex attempt rules.
 * This allows for rules like "1 spin per day, up to a total of 5 spins."
 */
export type AttemptConfiguration = {
  totalAttempts: number; // The absolute maximum attempts a user ever gets.
  timePeriod: 'day' | 'week' | 'month' | null; // The reset period for attempts. Can be null for no time-based limit.
  attemptsPerPeriod: number; // How many attempts are allowed within the defined timePeriod.
};

/**
 * The main table for storing all spinner campaign data.
 */
export const spinnerCampaigns = pgTable('spinner_campaigns', {
  // A unique ID for each campaign, automatically generated.
  id: serial('id').primaryKey(),

  // Campaign and Company Information
  title: varchar('title', { length: 255 }).notNull(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  companyLogo: jsonb('company_logo').$type<FileAttachment>(), // Storing the full FileAttachment object

  // The date and time when the campaign is no longer valid.
  deadline: timestamp('deadline', { withTimezone: true }).notNull(),

  // Stores the array of prize options.
  options: jsonb('options').$type<SpinnerOption[]>().notNull(),

  // User Limit and Attempt Configuration
  userLimit: integer('user_limit'), // Max number of unique participants

  // Advanced attempt configuration object.
  attemptConfiguration: jsonb('attempt_configuration')
    .$type<AttemptConfiguration>()
    .notNull(),

  // Timestamp for when the campaign was created.
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * A separate table to track each user who participates in a campaign.
 */
export const spinnerParticipants = pgTable(
  'spinner_participants',
  {
    userId: varchar('user_id', { length: 255 }).notNull(), // Can be a session ID, IP address, or user account ID
    campaignId: integer('campaign_id')
      .notNull()
      .references(() => spinnerCampaigns.id),
    totalAttempts: integer('total_attempts').default(0).notNull(), // Total attempts this user has made for this campaign
    periodAttempts: integer('period_attempts').default(0).notNull(), // Attempts within the current time period (e.g., today)
    periodStart: timestamp('period_start', { withTimezone: true }), // The timestamp when the current attempt period began
    wonPrizes: jsonb('won_prizes').$type<SpinnerOption[]>(), // Stores all prizes the user has won
    lastAttemptAt: timestamp('last_attempt_at', { withTimezone: true }),
  },
  (table) => {
    // A composite primary key ensures a user can only be listed once per campaign.
    return {
      pk: primaryKey({ columns: [table.userId, table.campaignId] }),
    };
  }
);

// Drizzle Relations: Defines the relationship between campaigns and participants.
export const spinnerCampaignRelations = relations(
  spinnerCampaigns,
  ({ many }) => ({
    participants: many(spinnerParticipants),
  })
);

export const spinnerParticipantRelations = relations(
  spinnerParticipants,
  ({ one }) => ({
    campaign: one(spinnerCampaigns, {
      fields: [spinnerParticipants.campaignId],
      references: [spinnerCampaigns.id],
    }),
  })
);

// Drizzle type exports for easy use in your application
export type SpinnerCampaign = typeof spinnerCampaigns.$inferSelect;
export type NewSpinnerCampaign = typeof spinnerCampaigns.$inferInsert;
export type SpinnerParticipant = typeof spinnerParticipants.$inferSelect;
export type NewSpinnerParticipant = typeof spinnerParticipants.$inferInsert;
