ALTER TABLE "table_field" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "table" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "table_field" ADD CONSTRAINT "table_field_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "table" ADD CONSTRAINT "table_slug_unique" UNIQUE("slug");