CREATE TYPE "public"."user_role" AS ENUM('general_user', 'regular_admin', 'super_admin');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"name" varchar(100) NOT NULL,
	"role" "user_role" DEFAULT 'general_user' NOT NULL,
	"phone" varchar(20),
	"refresh_token" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
