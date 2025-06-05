CREATE TABLE "automation_status" (
	"id" integer PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"schema" json NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
