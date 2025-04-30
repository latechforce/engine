CREATE TABLE `tables` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
