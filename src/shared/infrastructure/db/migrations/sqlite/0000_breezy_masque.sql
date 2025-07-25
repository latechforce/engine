CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	`impersonated_by` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`role` text,
	`banned` integer,
	`ban_reason` text,
	`ban_expires` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `connection_status` (
	`id` integer PRIMARY KEY NOT NULL,
	`connected` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `token` (
	`id` integer PRIMARY KEY NOT NULL,
	`token_type` text NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text,
	`expires_in` integer,
	`scope` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `run` (
	`id` text PRIMARY KEY NOT NULL,
	`automation_id` integer NOT NULL,
	`form_id` integer,
	`status` text NOT NULL,
	`steps` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `table_field` (
	`id` integer NOT NULL,
	`table_id` integer NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`type` text NOT NULL,
	`required` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`id`, `table_id`),
	FOREIGN KEY (`table_id`) REFERENCES `table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `table_field_name_unique` ON `table_field` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `table_field_slug_unique` ON `table_field` (`slug`);--> statement-breakpoint
CREATE TABLE `record` (
	`id` text PRIMARY KEY NOT NULL,
	`table_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`archived_at` integer,
	FOREIGN KEY (`table_id`) REFERENCES `table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `record_field` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text NOT NULL,
	`table_id` integer NOT NULL,
	`table_field_id` integer NOT NULL,
	`value` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`archived_at` integer,
	FOREIGN KEY (`record_id`) REFERENCES `record`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`table_field_id`,`table_id`) REFERENCES `table_field`(`id`,`table_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `table` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `table_name_unique` ON `table` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `table_slug_unique` ON `table` (`slug`);--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE `automation_status` (
	`id` integer PRIMARY KEY NOT NULL,
	`active` integer NOT NULL,
	`schema` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
