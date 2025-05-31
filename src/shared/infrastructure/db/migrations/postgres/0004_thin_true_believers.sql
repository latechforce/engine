ALTER TABLE "record_field" ALTER COLUMN "value" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "table_field" ADD COLUMN "required" boolean NOT NULL;