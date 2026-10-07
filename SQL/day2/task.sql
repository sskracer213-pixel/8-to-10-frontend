CREATE TABLE Student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age INT,
    department VARCHAR(50),
    city VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Student (name, age, department, city)
VALUES
('Arun', 23, 'IT', 'Madurai'),
('Ravi', 22, 'CSE', 'Chennai'),
('Bala', 21, 'ECE', 'Chennai'),
('Priya', 24, 'CSE', 'Coimbatore');

UPDATE Student
SET city = 'Bangalore'
WHERE id = 2;

UPDATE Student
SET city = 'Bangalore'
WHERE id = 2;

UPDATE Student
SET age = 24,
    department = 'IT',
    city = 'Chennai'
WHERE id = 1;

UPDATE Student
SET city = 'Madurai'
WHERE department = 'CSE';

DELETE FROM Student
WHERE id = 4;

DELETE FROM Student
WHERE city = 'Salem';

SELECT id, name, city, updated_at
FROM Student
WHERE id = 2;

UPDATE Student
SET city = 'Chennai'
WHERE id = 2;

SELECT id, name, city, updated_at
FROM Student
WHERE id = 2;

INSERT INTO Student (name, age, department, city)
VALUES
('Suresh', 23, 'IT', 'Madurai'),
('Kumar', 22, 'CSE', 'Chennai'),
('Meena', 21, 'ECE', 'Coimbatore');

UPDATE Student
SET city = 'Bangalore'
WHERE name = 'Kumar';

UPDATE Student
SET age = 25,
    department = 'CSE'
WHERE name = 'Suresh';

UPDATE Student
SET age = 25,
    department = 'CSE'
WHERE name = 'Suresh';
