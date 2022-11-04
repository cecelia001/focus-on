SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `days`;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS pomodoro;
DROP TABLE IF EXISTS users;

SET foreign_key_checks = 1;


CREATE TABLE `days` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`date` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tasks` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`day_id` INT NOT NULL,
	`completed` BOOLEAN NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `pomodoro` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`day_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

-- CF added
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL
);


ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk0` FOREIGN KEY (`day_id`) REFERENCES `days`(`id`);
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `pomodoro` ADD CONSTRAINT `pomodoro_fk0` FOREIGN KEY (`day_id`) REFERENCES `days`(`id`);
ALTER TABLE `pomodoro` ADD CONSTRAINT `pomodoro_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);


INSERT INTO `users` (username, password, email)
VALUES 
    ('user1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','user1@acme.com'),  -- pass1
    ('user2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','user2@acme.com'),  -- pass2
    ('user3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','user3@acme.com');  -- pass3


-- SAMPLE DATA (Lea)

INSERT INTO days (date)
    VALUES ("27.10.2022"), ("28.10.2022"), ("29.10.2022"), ("30.10.2022"), ("31.10.2022");

INSERT INTO tasks (title, description, completed, day_id, user_id)
    VALUES ("Learn React", "Go through slides and try to write simple application", true, 1, 1), ("Do challenge on Codewars", "Solve Kata", false, 2, 1), 
	("Start to read JS for Beginners", "Try to understand chapter 1 and 2", false, 1, 1), ("Do something else", "Just do it...", true, 3, 2), ("Do another thing", "Do this thing", true, 4, 2),
	("Do another thing", "Do this thing", true, 5, 2), ("Do another thing", "Do this thing", false, 5, 2), ("Do another thing", "Do this thing", false, 5, 2) ;

INSERT INTO pomodoro (day_id, user_id)
	VALUES (1,1 ), (1, 2), (2, 1), (3, 1), (3, 1), (3, 2), (4, 2), (5, 1), (5, 1), (5, 1), (5, 2);

