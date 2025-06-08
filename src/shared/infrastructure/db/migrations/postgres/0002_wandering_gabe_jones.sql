ALTER TABLE "token" RENAME COLUMN "expires_in" TO "access_token_expires_in";--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "refresh_token_expires_in" integer;--> statement-breakpoint
ALTER TABLE "token" DROP COLUMN "id_token";