CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	taskName VARCHAR(100) UNIQUE NOT NULL);

ALTER TABLE tasks
ADD completionStatus VARCHAR(50);


SELECT *
FROM tasks;

INSERT INTO tasks (taskname, completionstatus)
VALUES ('do the thing', 'done');
