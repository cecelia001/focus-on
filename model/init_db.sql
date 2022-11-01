SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `days`;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS pomodoro;

SET foreign_key_checks = 1;


CREATE TABLE `days` (
	`date` varchar(20) NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);


CREATE TABLE `tasks` (
	`title` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	`day_id` INT NOT NULL,
	`completed` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);



CREATE TABLE `pomodoro` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`day_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk0` FOREIGN KEY (`day_id`) REFERENCES `days`(`id`);

ALTER TABLE `pomodoro` ADD CONSTRAINT `pomodoro_fk0` FOREIGN KEY (`day_id`) REFERENCES `days`(`id`);


-- SAMPLE DATA

INSERT INTO days (date)
    VALUES ("27.10.2022"), ("28.10.2022"), ("29.10.2022"), ("30.10.2022"), ("31.10.2022");

INSERT INTO tasks (title, description, completed, day_id)
    VALUES ("Learn React", "Go through slides and try to write simple application", true, 1), ("Do challenge on Codewars", "Solve Kata", false, 2), 
	("Start to read JS for Beginners", "Try to understand chapter 1 and 2", false, 1), ("Do something else", "Just do it...", true, 3), ("Do another thing", "Do this thing", true, 4),
	("Do another thing", "Do this thing", true, 5), ("Do another thing", "Do this thing", false, 5), ("Do another thing", "Do this thing", false, 5) ;

INSERT INTO pomodoro (day_id)
	VALUES (1), (1), (2), (3), (3), (3), (4), (5), (5), (5), (5);

