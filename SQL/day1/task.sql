CREATE DATABASE company_db;

USE company_db;

CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    age INT,
    gender VARCHAR(10),
    salary DECIMAL(10,2),
    department VARCHAR(50)
);

INSERT INTO Employee VALUES
(1, 'Arun', 25, 'Male', 30000, 'IT'),
(2, 'Priya', 28, 'Female', 35000, 'HR'),
(3, 'Karthik', 30, 'Male', 40000, 'Finance'),
(4, 'Divya', 26, 'Female', 32000, 'IT'),
(5, 'Rahul', 35, 'Male', 50000, 'Management');

CREATE TABLE Government_Office (
    office_id INT PRIMARY KEY,
    office_name VARCHAR(100),
    office_type VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    phone VARCHAR(15)
);

INSERT INTO Government_Office VALUES
(1, 'Chennai Corporation Office', 'Municipal Office', 'Chennai', 'Tamil Nadu', '0441234567'),
(2, 'RTO Chennai', 'Transport Office', 'Chennai', 'Tamil Nadu', '0442345678'),
(3, 'Taluk Office', 'Revenue Office', 'Madurai', 'Tamil Nadu', '0452234567'),
(4, 'District Collector Office', 'District Office', 'Coimbatore', 'Tamil Nadu', '0422234567'),
(5, 'Post Office', 'Central Government Office', 'Salem', 'Tamil Nadu', '0427234567');


CREATE TABLE Product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10,2),
    quantity INT
);


INSERT INTO Product VALUES
(1, 'Laptop', 'Electronics', 55000.00, 10),
(2, 'Mobile Phone', 'Electronics', 25000.00, 20),
(3, 'Keyboard', 'Computer Accessories', 1500.00, 30),
(4, 'Mouse', 'Computer Accessories', 800.00, 40),
(5, 'Headphones', 'Accessories', 2000.00, 15);

SELECT * FROM Product;