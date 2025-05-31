PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_record_field` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text NOT NULL,
	`table_field_id` integer NOT NULL,
	`value` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `record`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`table_field_id`) REFERENCES `table_field`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_record_field`("id", "record_id", "table_field_id", "value", "created_at", "updated_at") SELECT "id", "record_id", "table_field_id", "value", "created_at", "updated_at" FROM `record_field`;--> statement-breakpoint
DROP TABLE `record_field`;--> statement-breakpoint
ALTER TABLE `__new_record_field` RENAME TO `record_field`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `table_field` ADD `required` integer NOT NULL;