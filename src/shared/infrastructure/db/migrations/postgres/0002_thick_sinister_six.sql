CREATE TABLE "bucket" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "bucket_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "object" (
	"id" text PRIMARY KEY NOT NULL,
	"bucket_id" integer NOT NULL,
	"key" text NOT NULL,
	"size" integer,
	"content_type" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"data" "bytea" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "object" ADD CONSTRAINT "object_bucket_id_bucket_id_fk" FOREIGN KEY ("bucket_id") REFERENCES "public"."bucket"("id") ON DELETE cascade ON UPDATE no action;