CREATE TYPE "public"."driver_status" AS ENUM('pending', 'approved', 'rejected', 'needs_review');--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"status" "driver_status" DEFAULT 'pending' NOT NULL,
	"city_province" varchar(255),
	"shipping_address" text,
	"vehicle_make" varchar(100),
	"vehicle_model" varchar(100),
	"vehicle_year" integer,
	"vehicle_photos" jsonb,
	"ride_share_platforms" text[],
	"weekly_driving_schedule" text,
	"drivers_license" jsonb,
	"driver_profile" jsonb,
	"trip_history" jsonb,
	"void_cheque" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "drivers_email_unique" UNIQUE("email"),
	CONSTRAINT "drivers_phone_unique" UNIQUE("phone")
);
