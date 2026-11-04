CREATE TABLE `usergames` (
	`id` text PRIMARY KEY,
	`userid` text NOT NULL,
	`gameid` text NOT NULL,
	CONSTRAINT `fk_usergames_userid_users_id_fk` FOREIGN KEY (`userid`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
ALTER TABLE `games` ADD `age_ratings` integer;--> statement-breakpoint
ALTER TABLE `games` ADD `storyline` text;--> statement-breakpoint
ALTER TABLE `games` ADD `websites` text;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_games` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`cover` text,
	`platforms` text,
	`genres` text,
	`rating` integer,
	`releaseDate` integer NOT NULL,
	`summary` text NOT NULL,
	`age_ratings` integer,
	`storyline` text,
	`websites` text
);
--> statement-breakpoint
INSERT INTO `__new_games`(`id`, `name`, `cover`, `platforms`, `genres`, `rating`, `releaseDate`, `summary`) SELECT `id`, `name`, `cover`, `platforms`, `genres`, `rating`, `releaseDate`, `summary` FROM `games`;--> statement-breakpoint
DROP TABLE `games`;--> statement-breakpoint
ALTER TABLE `__new_games` RENAME TO `games`;--> statement-breakpoint
PRAGMA foreign_keys=ON;