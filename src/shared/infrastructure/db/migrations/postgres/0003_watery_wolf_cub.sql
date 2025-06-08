ALTER TABLE "token" RENAME COLUMN "access_token_expires_in" TO "expires_in";--> statement-breakpoint
ALTER TABLE "token" DROP COLUMN "refresh_token_expires_in";