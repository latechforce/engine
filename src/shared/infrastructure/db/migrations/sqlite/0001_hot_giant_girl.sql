CREATE TABLE `bucket` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bucket_name_unique` ON `bucket` (`name`);--> statement-breakpoint
CREATE TABLE `object` (
	`id` text PRIMARY KEY NOT NULL,
	`bucket_id` integer NOT NULL,
	`key` text NOT NULL,
	`size` integer,
	`content_type` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`data` blob NOT NULL,
	FOREIGN KEY (`bucket_id`) REFERENCES `bucket`(`id`) ON UPDATE no action ON DELETE cascade
);
