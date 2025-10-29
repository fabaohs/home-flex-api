CREATE TYPE "public"."profile_enum" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile" "profile_enum" DEFAULT 'USER' NOT NULL;