ALTER TABLE `table_field` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `table_field_slug_unique` ON `table_field` (`slug`);--> statement-breakpoint
ALTER TABLE `table` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `table_slug_unique` ON `table` (`slug`);