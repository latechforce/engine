ALTER TABLE "record_field" RENAME COLUMN "field_id" TO "table_field_id";--> statement-breakpoint
ALTER TABLE "record_field" DROP CONSTRAINT "record_field_field_id_table_field_id_fk";
--> statement-breakpoint
ALTER TABLE "record_field" ADD CONSTRAINT "record_field_table_field_id_table_field_id_fk" FOREIGN KEY ("table_field_id") REFERENCES "public"."table_field"("id") ON DELETE cascade ON UPDATE no action;