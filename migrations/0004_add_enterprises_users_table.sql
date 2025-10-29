CREATE TYPE "public"."profile_enum" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
CREATE TABLE "users_enterprises" (
	"user_id" integer NOT NULL,
	"enterprise_id" integer NOT NULL,
	"profile_id" "profile_enum" NOT NULL
);
