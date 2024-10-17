CREATE TABLE `tasks` (
	`id` int NOT NULL,
	`task` varchar(255) NOT NULL,
	`completed` boolean DEFAULT false,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
