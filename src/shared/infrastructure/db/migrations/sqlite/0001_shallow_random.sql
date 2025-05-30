ALTER TABLE `field` RENAME TO `table_field`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_table_field` (
	`id` integer PRIMARY KEY NOT NULL,
	`table_id` integer NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`table_id`) REFERENCES `table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_table_field`("id", "table_id", "name", "type", "created_at", "updated_at") SELECT "id", "table_id", "name", "type", "created_at", "updated_at" FROM `table_field`;--> statement-breakpoint
DROP TABLE `table_field`;--> statement-breakpoint
ALTER TABLE `__new_table_field` RENAME TO `table_field`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_record_field` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text NOT NULL,
	`field_id` integer NOT NULL,
	`value` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `record`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`field_id`) REFERENCES `table_field`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_record_field`("id", "record_id", "field_id", "value", "created_at", "updated_at") SELECT "id", "record_id", "field_id", "value", "created_at", "updated_at" FROM `record_field`;--> statement-breakpoint
DROP TABLE `record_field`;--> statement-breakpoint
ALTER TABLE `__new_record_field` RENAME TO `record_field`;