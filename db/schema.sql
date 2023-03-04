-- DROPS employee_tracker_db --
DROP DATABASE IF EXISTS employee_tracker_db;

-- Create two new databases --
CREATE DATABASE employee_tracker_db;

-- employee_tracker_db --
USE employee_tracker_db

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY 
    name VARCHAR(30),
    PRIMARY KEY (id),
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    departments_id INT,
    FOREIGN KEY (departments_id),
    REFERENCES departent(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roles_id INT,
    FOREIGN KEY (roles_id),
    REFERENCES role(id)
)

-- CREATE TABLE Persons (
--     Personid int NOT NULL AUTO_INCREMENT,
--     LastName varchar(255) NOT NULL,
--     FirstName varchar(255),
--     Age int,
--     PRIMARY KEY (Personid)
-- );