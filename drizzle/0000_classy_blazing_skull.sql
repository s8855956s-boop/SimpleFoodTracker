CREATE TABLE `food_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`grams_per_serving` integer NOT NULL,
	`calories` integer NOT NULL,
	`total_fat` integer NOT NULL,
	`total_carb` integer NOT NULL,
	`protein` integer NOT NULL,
	`category` text
);
--> statement-breakpoint
CREATE TABLE `food_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`title` text NOT NULL,
	`total_calories` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `food_log_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`food_log_id` integer NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`amount` integer NOT NULL,
	`calories` integer NOT NULL,
	`total_fat` integer NOT NULL,
	`total_carb` integer NOT NULL,
	`protein` integer NOT NULL,
	FOREIGN KEY (`food_log_id`) REFERENCES `food_log`(`id`) ON UPDATE no action ON DELETE cascade
);
