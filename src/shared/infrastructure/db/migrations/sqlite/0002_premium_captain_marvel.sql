CREATE TABLE `automation_status` (
	`id` integer PRIMARY KEY NOT NULL,
	`active` integer NOT NULL,
	`schema` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
