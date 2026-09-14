CREATE TABLE IF NOT EXISTS `uvc实验记录表` (
	`created_date` DATETIME NOT NULL,
	`updated_date` DATETIME NOT NULL,
	`record_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
	`batch_id` CHAR(20) NOT NULL,
	`serial_no` CHAR(20) NOT NULL,
	`operator_id` CHAR(20) NOT NULL,
	`operator_name` CHAR(20) NOT NULL,
	PRIMARY KEY(`record_id`)
);


