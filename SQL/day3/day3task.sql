


USE company_db;



CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age INT,
    department VARCHAR(50),
    salary DECIMAL(10,2),
    city VARCHAR(50)
);


INSERT INTO employees (name, age, department, salary, city)
VALUES
('Arun', 25, 'IT', 45000, 'Chennai'),
('Ravi', 27, 'CSE', 50000, 'Madurai'),
('Vijay', 29, 'IT', 55000, 'Chennai'),
('Priya', 24, 'HR', 35000, 'Salem'),
('Karthik', 31, 'Finance', 60000, 'Coimbatore'),
('David', 26, 'IT', 42000, 'Madurai'),
('Anitha', 28, 'HR', 40000, 'Chennai'),
('Vivek', 30, 'CSE', 48000, NULL),
('Suresh', 23, 'Sales', 32000, 'Salem'),
('Meena', 27, 'IT', 52000, 'Chennai');




SELECT * FROM employees;


-- Task 2
-- Display name, salary, and city
SELECT name, salary, city
FROM employees;


-- Task 3
-- Employees whose city is Chennai
SELECT *
FROM employees
WHERE city = 'Chennai';


SELECT *
FROM employees
WHERE salary > 45000;


SELECT *
FROM employees
WHERE age < 28;


SELECT *
FROM employees
WHERE salary >= 40000;


SELECT *
FROM employees
WHERE department != 'HR';



SELECT *
FROM employees
WHERE department = 'IT'
AND city = 'Chennai';



SELECT *
FROM employees
WHERE city = 'Chennai'
OR city = 'Madurai';



SELECT *
FROM employees
WHERE salary > 40000
AND age < 30;



SELECT *
FROM employees
WHERE city IN ('Chennai', 'Madurai', 'Salem');


SELECT *
FROM employees
WHERE department NOT IN ('IT', 'HR');



SELECT *
FROM employees
WHERE city IS NULL;




SELECT *
FROM employees
WHERE city IS NOT NULL;



SELECT *
FROM employees
WHERE salary BETWEEN 35000 AND 50000;


SELECT *
FROM employees
WHERE age BETWEEN 25 AND 30
AND city = 'Chennai';



SELECT *
FROM employees
WHERE name LIKE 'A%';


SELECT *
FROM employees
WHERE name LIKE '%vi%';



SELECT DISTINCT department
FROM employees;


SELECT
    name AS employee_name,
    department AS department_name,
    salary AS monthly_salary
FROM employees;