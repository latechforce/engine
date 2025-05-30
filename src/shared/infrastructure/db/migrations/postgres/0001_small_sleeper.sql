ALTER TABLE "field" RENAME TO "table_field";--> statement-breakpoint
ALTER TABLE "table_field" DROP CONSTRAINT "field_table_id_table_id_fk";
--> statement-breakpoint
ALTER TABLE "record_field" DROP CONSTRAINT "record_field_field_id_field_id_fk";
--> statement-breakpoint
ALTER TABLE "table_field" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "table_field" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "table_field" ADD CONSTRAINT "table_field_table_id_table_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "record_field" ADD CONSTRAINT "record_field_field_id_table_field_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."table_field"("id") ON DELETE cascade ON UPDATE no action;