CREATE TABLE "tables" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
